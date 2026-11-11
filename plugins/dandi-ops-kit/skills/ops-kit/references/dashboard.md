# ④ 관리자 대시보드 — 앱 서버의 `/admin` 페이지 + JSON API

운영자가 "오늘 몇 명이 왔고, 돌아왔고, 결제했나"를 보려고 DB 콘솔에서 SQL을 치지 않게 한다. 앱 서버가 직접 띄우므로 별도 호스팅·SaaS가 필요 없다. 대신 **열린 채 배포되는 사고**가 가장 큰 위험이라 아래 계약이 그것을 구조로 막는다.

## 진단 신호

| 판정 | 조건 |
| --- | --- |
| 필요 | 상시 실행 서버(또는 Worker)와 영속 DB가 **모두** 있고, 사용자·이벤트·결제 중 하나 이상이 DB에 쌓인다 |
| 판단 보류 | 서버·DB는 있는데 이벤트가 쌓이지 않는다 → "최소 이벤트 세트(세션 시작·핵심 행동·결제)부터" 제안. 이벤트 없이 만든 대시보드는 사용자 수 말고 보여 줄 것이 없다 |
| 불필요 | 상시 서버가 없다(정적 사이트·로컬 CLI) 또는 영속 DB가 없다 |

## 만들 것

### 계약 (스택과 무관하게 지킨다 — 이유가 붙은 것은 이유가 사고 사례다)

1. **경로**: `GET /admin`(셸 HTML — 데이터 없음) · `GET /admin/api/stats`(JSON). 국가·지역 차단, 사용자 인증 미들웨어 **바깥**에 붙인다 — 운영자가 차단 지역에 있거나 일반 사용자 인증을 통과하지 못하면 자기 대시보드를 못 연다.
2. **인증**: `Authorization: Bearer <토큰>` 하나. 토큰은 시크릿(예: `ADMIN_TOKEN`).
   - 시크릿이 없거나 **32자 미만이면 503** `{"error":"admin_not_configured"}`. 빈 값·실수로 넣은 짧은 값으로 열린 채 배포되는 것을 막는다.
   - 토큰이 다르면 401 `{"error":"unauthorized"}`. 비교는 **상수 시간**(첫 불일치에서 멈추지 않는다).
   - 셸 HTML은 데이터가 없으므로 인증 없이 내주고, 페이지가 입력받은 토큰으로 API를 부른다. 토큰은 페이지 메모리에만 둔다(쿼리스트링·localStorage 금지 — 로그·기록에 남는다). `sessionStorage`는 사용자가 원할 때만.
3. **헤더**: 모든 응답 `Cache-Control: no-store`. 페이지에 `X-Robots-Tag: noindex`와 CSP
   `default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`.
4. **본인 제외**: 개발자·테스트 계정 ID를 시크릿 목록(예: `STATS_EXCLUDE_USER_IDS`, 쉼표 구분, 상한 10개)으로 받아 **집계에서만** 뺀다. 원본 데이터는 지우지 않는다. 형식이 맞지 않는 항목은 버린다. 응답에 제외 개수를 넣는다(빠졌는지 확인할 수 있게). ID를 해시로 저장하는 앱이면 같은 해시 함수로 바꿔 비교한다.
5. **날짜와 비용 상한**: 날짜 경계는 **UTC**. 읽는 기간을 상수로 고정한다(예: 표 14일 + D7 코호트 30일 → 38일). 요청 파라미터로 기간을 늘릴 수 없게 한다 — 무료 DB 읽기 한도를 대시보드 새로고침이 다 쓰지 않게.
6. **구조**: 집계는 **공용 모듈 하나**(`collectStats(db, opts)`), 앱마다 붙이는 것은 **라우터 파일 하나**. 앱이 여럿인 모노레포면 모듈을 공용 패키지에 두고 라우터만 복사한다.

### 지표 정의

| 지표 | 정의(UTC 일 단위) |
| --- | --- |
| DAU | 그날 이벤트가 하나라도 있는 고유 사용자 수 |
| 신규 | 첫 이벤트(또는 가입일)가 그날인 사용자 수 |
| D1 / D7 재방문 | 코호트(최근 30일에 처음 온 사용자) 중 첫날 +1일 / +7일에 활동한 비율 — 분모가 0이면 "—" |
| 결제 | 일별 건수·금액, 누적 결제자 수, 환불 건수(환불분은 합계에서 뺀다) |
| 국가 | 최근 14일 고유 사용자 기준 상위 10개 국가(국가 정보가 없으면 `??`) |
| 한도 대비 사용량 | ⑦에서 사용량을 API로 읽을 수 있을 때만 — 80% 이상이면 경고색 |

### 최소 이벤트 세트 (이벤트가 없을 때 제안)

`session_start`(앱 열기) · `<핵심 행동>`(그 앱의 가치가 일어나는 순간 하나 — 사용자에게 묻는다) · `payment`(결제 완료). 테이블 예: `analytics_events(user_ref, event, received_at, country)` — `user_ref`는 원 ID 대신 솔트 해시를 권한다(대시보드는 개인을 특정할 필요가 없다). 국가는 호스팅이 주는 요청 메타데이터에서 얻는다(예: Workers `request.cf.country`). 이벤트 쓰기 경로 추가는 앱 코드 변경이므로 진단 표 승인과 별도로 한 번 더 확인한다.

## 형식·템플릿

### 계약 테스트 (프로젝트에 테스트 러너가 있으면 함께 만든다)

| # | 조건 | 기대 |
| --- | --- | --- |
| 1 | 토큰 시크릿 없음 | 503 · `admin_not_configured` · `no-store` |
| 2 | 시크릿 31자 | 503 |
| 3 | 시크릿 32자 이상, 헤더 없음 / 틀린 토큰 / `Bearer` 접두 없음 | 401 |
| 4 | 맞는 토큰 | 200 · JSON에 `daily`·`retention`·`excludedCount` |
| 5 | `GET /admin` | 200 HTML · `no-store` · `X-Robots-Tag: noindex` · CSP에 `frame-ancestors 'none'` |
| 6 | 제외 목록에 든 사용자 이벤트 | 집계에서 빠지고 원본 행은 남는다 |
| 7 | 차단 지역 요청 | `/admin`은 차단 미들웨어를 거치지 않는다(라우팅 순서 테스트 또는 코드 위치로 확인) |

테스트 러너가 없으면 위 표를 운영 런북의 "배포 후 확인" 단계(curl 명령 + 기대 상태 코드)로 옮긴다.

### 예시 — Cloudflare Workers + Hono + D1 (다른 스택은 같은 계약으로 옮긴다)

```ts
// src/admin/token.ts — 인증 경로를 앱 사용자 인증과 섞지 않는다
export const MIN_ADMIN_TOKEN_LEN = 32;
export const isAdminConfigured = (s?: string): s is string => typeof s === "string" && s.length >= MIN_ADMIN_TOKEN_LEN;
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
export function checkAdminToken(header: string | null, secret: string): boolean {
  if (!isAdminConfigured(secret) || !header?.startsWith("Bearer ")) return false;
  return timingSafeEqual(header.slice(7), secret);
}
export function parseExcludeIds(raw?: string, max = 10): string[] {
  const out: string[] = [];
  for (const p of (raw ?? "").split(",")) {
    const s = p.trim();
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(s) || out.includes(s)) continue;
    out.push(s);
    if (out.length === max) break;
  }
  return out;
}
```

```ts
// src/routes/admin.ts — 앱마다 이 파일 하나만 둔다
import { Hono } from "hono";
import { checkAdminToken, isAdminConfigured, parseExcludeIds } from "../admin/token";
import { collectStats } from "../admin/stats";   // 공용 집계 모듈(아래 요점)
import { renderAdminPage } from "../admin/page"; // 셸 HTML — 토큰 입력칸 + fetch

type Env = { DB: D1Database; ADMIN_TOKEN?: string; STATS_EXCLUDE_USER_IDS?: string };
export const adminRoutes = new Hono<{ Bindings: Env }>();
const NO_STORE = { "Cache-Control": "no-store" };
const PAGE_HEADERS = {
  ...NO_STORE,
  "X-Robots-Tag": "noindex",
  "Content-Security-Policy":
    "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};

adminRoutes.get("/", (c) => c.html(renderAdminPage({ appName: "<앱 이름>" }), 200, PAGE_HEADERS));
adminRoutes.get("/api/stats", async (c) => {
  if (!isAdminConfigured(c.env.ADMIN_TOKEN)) return c.json({ error: "admin_not_configured" }, 503, NO_STORE);
  if (!checkAdminToken(c.req.header("Authorization") ?? null, c.env.ADMIN_TOKEN)) return c.json({ error: "unauthorized" }, 401, NO_STORE);
  const exclude = parseExcludeIds(c.env.STATS_EXCLUDE_USER_IDS);
  return c.json(await collectStats(c.env.DB, { now: Date.now(), exclude }), 200, NO_STORE);
});
```

```ts
// src/index.ts — 순서가 계약이다: /admin을 차단·인증 미들웨어보다 먼저 붙인다
app.route("/admin", adminRoutes);
app.use("/api/*", geoBlock, userAuth);
```

**`collectStats` 요점**: `today = floor(now / 86400000) * 86400000`(UTC 자정), `since = today - (WINDOW_DAYS - 1) * DAY`. 이벤트는 `received_at >= since` 한 번만 읽고(제외 목록은 `NOT IN (?,…)` 바인딩) 메모리에서 일별 DAU·신규·세션·국가를 센다. 첫 방문은 `MIN(received_at) GROUP BY user ... HAVING first >= since`로 창 안의 사용자만. 결제는 환불 행을 합계에서 빼고 환불 건수로만 센다. 쿼리는 모두 바인딩 파라미터로 쓴다(문자열 이어 붙이기 금지).

**셸 페이지 요점**: 토큰 입력칸(`type="password"`, `autocomplete="off"`) → `fetch("/admin/api/stats", { headers: { Authorization: "Bearer " + t } })` → 503이면 "토큰 시크릿 미설정 — 운영 런북의 시크릿 단계", 401이면 "토큰이 다르다"를 보여 준다. 표는 `textContent`로 채운다(`innerHTML`에 응답을 넣지 않는다). 외부 스크립트·차트 라이브러리를 쓰지 않는다(CSP가 막는다) — 막대는 CSS 폭으로 그린다.

## 검증

- 계약 테스트를 돌려 출력을 보고에 붙인다. 러너가 없으면 로컬 개발 서버에 curl로 1·3·4·5를 확인한다(시크릿은 로컬 개발용 임시 값 — 운영 값을 쓰지 않는다).
- `grep -n "admin" <라우터 진입 파일>`로 `/admin` 등록이 차단·인증 미들웨어보다 앞인지 본다.
- 운영 런북에 `ADMIN_TOKEN`(32자 이상)·제외 목록 시크릿 등록 단계(SKILL.md §4 형식)와 "배포 후 `/admin` 열어 503이 아닌지 확인" 단계를 넣는다.
- 상태 파일 표에 ④ 행을 추가·갱신한다.
