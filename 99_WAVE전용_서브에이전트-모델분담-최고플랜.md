# 서브에이전트 모델 자동 분담 — 최고 플랜 (WAVE PHP→Java)

> **문서 버전: v1.1** · 최종 갱신: **2026-07-03** · 기준: Claude Code v2.1.x (Opus 4.8 · Sonnet 5 · Haiku)
>
> | 버전 | 날짜 | 변경 내용 |
> | --- | --- | --- |
> | v1.0 | 2026-07-03 | 초판: 사용자 5단계 초안에 triage=Opus 승격 + 검증 스테이지(reviewer/parity) 보강 |
> | v1.1 | 2026-07-03 | 공식 문서 재검증: 高구현에 `/advisor` 대안 병기, `opus[1m]`(camp_edit.php 등 초대형 파일), `/effort` 단계별 배정, availableModels 예외, surveyor↔내장 Explore 역할 구분 |
>
> ※ 갱신 시: 이 표에 한 줄 추가 + 범용 플레이북(01)과 버전 정합성 확인.

> 목적: 레거시 WAVE(PHP/CI 2.1.4)를 Java 21+Spring Boot 4로 전환할 때, **비싼 모델(Opus)은 어려운 추론에, 싼 모델(Sonnet/Haiku)은 잘 정의된 실행에** 자동 분담하는 실전 플랜.
> 근거: 실제 레거시→신규 전환 사례 + 멀티모델 라우팅 관행 + Claude Code 서브에이전트 공식 문서 (하단 §근거).

---

## 0. 한 눈에 (단계 → 에이전트 → 모델 → 산출물)

| 단계 | 에이전트 | 모델 | 산출물(문서) |
| --- | --- | --- | --- |
| 1. 구조 survey(목록화) | `surveyor` | **sonnet** | `docs/survey/<area>.md` |
| 2. 난이도 분류(트리아지) | `triage` | **opus** ⭐ | `docs/난이도-매트릭스.md` |
| 3. 상세 분석·설계 (低) | `analyst-light` | **sonnet** | `docs/spec/<module>.md` |
| 3. 상세 분석·설계 (高) | `analyst-hard` | **opus** | `docs/spec/<module>.md` |
| 4. 구현 (低) | `implementer` | **sonnet** | Java 코드 |
| 4. 구현 (高) | (메인세션) | **opusplan** (또는 sonnet+**/advisor**) | Java 코드 |
| 5. 리뷰(diff 검증) | `reviewer` | **opus** ⭐ | 리뷰 코멘트 |
| 5. 파리티 테스트 | `parity-tester` | **haiku** | 테스트 결과 |

> ⭐ = 사용자 초안 대비 **핵심 보강**: 트리아지를 Opus로 올리고, 검증 스테이지(리뷰+파리티)를 추가.

---

## 1. 왜 이 구조인가 (조사 3대 교훈)

1. **검증기가 모델보다 중요.** ServiceTitan은 "validator가 정확치 않으면 slop이 나온다"며 초반 10~30개 태스크를 검증기 튜닝에 쏟았다. 그래서 **`reviewer`(Opus diff 검증) + `parity-tester`(레거시 vs 신규 출력 대조)** 를 1급 시민으로 둔다. → 사용자 5단계 초안의 최대 공백.
2. **핸드오프 컨텍스트 손실이 최대 실패.** Opus가 한도에 닿아 Sonnet으로 조용히 폴백하면 "이전 지시 무시·엉뚱한 부분 작업" 사례 보고. 서브에이전트는 **격리 컨텍스트**라 요약만 넘어간다. → **분석·계획을 파일로 고정**하고 다음 에이전트가 `@파일`로 읽게 한다(대화 요약 금지).
3. **자동화 천장 ~70~85%.** Google 74%·ServiceTitan 85%가 상한이고, 일회성 전체 자동 전환은 실패(C++→Rust 실험). → **사람이 계획·비기능요구(성능/보안/구조)·최종 리뷰를 소유**, AI는 결정 루프 안에서만.

---

## 2. 핵심 원칙 5

1. **문서 고정 핸드오프**: 각 단계 산출물을 `docs/`에 파일로 남기고, 다음 단계는 `@파일` 경로로 읽는다. 성공기준·샘플 입출력을 spec에 포함(실행 검증 가능하게).
2. **트리아지는 Opus로**(최고 레버리지). 여기서 오분류하면 하류 전체가 오염. Sonnet 초안 + Opus 확정도 가능.
3. **검증 스테이지 필수**: Opus diff 리뷰(타입/널/PHP truthiness/프레임워크 관용구/NFR) + replay 파리티(레거시 입력 재생·출력 대조).
4. **스트랭글러 무화과(Strangler Fig)** + **바운디드 컨텍스트 단위 슬라이스**. 순서: **마스터데이터 → 핵심 도메인 → 리포팅**. 첫 슬라이스는 저위험·읽기중심(standard_code·company·media).
5. **자동화 천장 인정**: ~75%가 현실. 숨은 비즈로직(설정/긴급패치)·아키텍처 결정·보안 엣지케이스는 사람이 판단.

---

## 3. 난이도 기준(rubric) — WAVE 기준 못박기

트리아지가 싼값에도 안전하려면 기준을 먼저 고정한다.

- **難(→ Opus)**: 암호화(AES-CTR/Rijndael)·세션쿠키 인증·`MY_Loader` 동적로딩·복잡 상태머신(camp/contract 상태 전이)·외부 연동 규약(NAB/NAS Home API)·뷰 강결합(3,000줄+ `camp_edit.php`)·집계/pivot 로직.
- **易(→ Sonnet)**: 마스터 CRUD·`standard_code` 조회·단순 목록/검색·정적 리포트·타입별 상품 단순 매핑.

---

## 4. 에이전트 정의 (복붙 — `.claude/agents/`)

> 배치: **신규 Java repo 생성 후 그 repo `.claude/agents/`**(팀 공유) 권장. 지금 실험은 사용자 스코프 `~/.claude/agents/` 가능.
> 모델 값: 별칭 `opus`·`sonnet`·`haiku` 또는 전체 ID(`claude-opus-4-8`). 별칭은 최신 모델을 자동 추적(2026-07 기준 sonnet=Sonnet 5(v2.1.197+), opus=Opus 4.8(v2.1.154+)).
> 중복 주의: Claude Code는 단순 코드 탐색에 이미 내장 Explore 서브에이전트(Haiku)를 자동 사용한다. `surveyor`는 **docs/survey/*.md 산출물이 필요한 조사**에만 쓰고, 일회성 "이 함수 어딨지" 탐색은 내장에 맡긴다.

**surveyor.md**
```markdown
---
name: surveyor
description: 레거시 구조 survey 전문. 컨트롤러·모델·테이블·의존성을 목록화한다. 넓은 조사가 필요하면 적극적으로 사용. 파일은 고치지 않는다.
tools: Read, Grep, Glob, Bash
model: sonnet
---
너는 구조 조사원이다. 넓고 기계적으로 훑어 목록/의존성을 만든다.
- 결과를 docs/survey/<area>.md 로 저장(표·목록 위주).
- 판단·설계는 하지 않는다(다음 단계 담당).
```

**triage.md** ⭐
```markdown
---
name: triage
description: 마이그레이션 난이도 분류 전문. survey 결과와 난이도 rubric으로 모듈별 난이도(高/低)와 근거를 매긴다. 분류/우선순위가 필요하면 적극적으로 사용.
tools: Read, Grep, Glob
model: opus
---
너는 난이도 판정관이다. rubric(암호화·인증·동적로딩·상태머신·연동규약·뷰강결합=高)에 따라 판정한다.
- 입력: @docs/survey/*.md
- 출력: docs/난이도-매트릭스.md (모듈 | 난이도 | 근거 | 권장 모델 | 슬라이스 순서).
- 애매하면 高로 올리고 이유를 남긴다(하류 오염 방지).
```

**analyst-hard.md / analyst-light.md** (같은 형식, 모델만 다름)
```markdown
---
name: analyst-hard
description: 高난이도 모듈 상세 분석·Java 설계 전문. 비즈로직·상태·연동을 파고 구현 spec을 만든다. 난이도 높은 모듈이면 적극적으로 사용.
tools: Read, Grep, Glob
model: opus
---
너는 시니어 분석·설계자다.
- 입력: @docs/난이도-매트릭스.md 의 해당 모듈 + 관련 레거시 코드.
- 출력: docs/spec/<module>.md — 목적/도메인규칙/DB매핑(FK없음·soft delete 주의)/ACL/**성공기준**/**샘플 입출력**/위험.
- 레거시 버그를 보존할지 여부는 "사람 확인 필요"로 표시한다.
```
```markdown
---
name: analyst-light
description: 低난이도 모듈 상세 분석·정리 전문(마스터/CRUD/조회). 범위가 명확한 모듈이면 적극적으로 사용.
tools: Read, Grep, Glob
model: sonnet
---
(analyst-hard와 동일한 spec 형식으로 docs/spec/<module>.md 작성. 간결하게.)
```

**implementer.md**
```markdown
---
name: implementer
description: spec 기반 Java 구현 전문(잘 정의된 모듈). spec 문서가 준비되면 적극적으로 사용.
tools: Read, Write, Edit, Bash
model: sonnet
---
너는 구현 담당이다.
- 입력: @docs/spec/<module>.md (대화 요약이 아니라 이 파일을 근거로).
- spec의 성공기준·샘플 입출력을 만족하게 구현. 범위 밖 손대지 않음.
- ddl-auto=validate 전제(스키마 변경은 Flyway). 무엇을 만들었는지 요약 보고.
```

**reviewer.md** ⭐
```markdown
---
name: reviewer
description: Java 변환 코드 diff 검증 전문. 타입/널/PHP truthiness/프레임워크 관용구/NFR(성능·보안) 관점으로 본다. 구현 직후 적극적으로 사용. 읽기 전용.
tools: Read, Grep, Glob, Bash
model: opus
---
너는 깐깐한 리뷰어다. spec과 diff를 대조해 의미 오역을 잡는다.
- 중점: PHP 동적→Java 정적 갭, null 처리, 상태전이 누락, 연동 규약 위반, 보안/성능.
- 코드를 고치지 않고 "무엇이/왜/어떻게" 지적만 남긴다.
```

**parity-tester.md**
```markdown
---
name: parity-tester
description: 레거시 vs 신규 출력 파리티 테스트 실행. 테스트/재생 검증이 필요하면 사용. 빠르고 저렴하게.
tools: Bash, Read
model: haiku
---
너는 테스트 러너다. 레거시 입력을 신규에 재생(replay)하고 출력 diff를 보고한다.
- 통과/실패와 차이만 간결히 보고. 원인 분석은 상위 단계로 넘긴다.
```

---

## 5. 오케스트레이션 (메인 세션 실행 흐름)

```text
1. surveyor 로 wave 구조 훑어 docs/survey/*.md 작성
2. triage 로 @docs/survey/*.md + rubric → docs/난이도-매트릭스.md
3. (모듈별) analyst-light|analyst-hard 로 @난이도-매트릭스 → docs/spec/<module>.md
4. 구현:
   - 低: implementer 로 @docs/spec/<module>.md → Java
   - 高: 메인 세션에서  /model opusplan  → Plan(Opus)로 상세 계획 → 실행(Sonnet)
5. reviewer 로 diff 검증 → 지적 반영
6. parity-tester 로 레거시 대조 → 통과 시 다음 슬라이스
```

> **opusplan 주의**: `opusplan`은 **메인 세션 모드 별칭**(Plan Mode=Opus, 실행=Sonnet)이다. 서브에이전트 frontmatter엔 `opus`/`sonnet`을 직접 핀한다. 高난이도 구현은 서브에이전트 대신 **메인 세션 `/model opusplan`**으로 진행하면 계획-구현 분담이 자연스럽다. (단 `availableModels` 정책으로 Opus가 제외된 환경이면 opusplan은 plan 모드에서도 Sonnet에 머문다.)
> **대안 — `/advisor`**: opusplan이 plan 경계에서만 Opus를 쓰는 것과 달리, advisor는 **실행 중 Sonnet이 막힐 때 Opus에 온디맨드 자문**한다(Anthropic 측정: 비용 −11.9%·정확도 +2.7%). WAVE 기준: spec이 탄탄한 정형 전환(마스터데이터·CRUD)은 opusplan, 실행 중 난관이 예상되는 高모듈(camp 상태머신·`camp_edit.php` 해체)은 advisor가 유리할 수 있다.
> **초대형 파일 대응**: `camp_edit.php`(3,000줄+) 같은 강결합 파일 분석엔 `opus[1m]`(1M 컨텍스트), 전체 survey엔 `sonnet[1m]` 고려. `opusplan[1m]`은 plan 단계에도 1M 적용.
> **비용 제2축 — effort**: 이 플랜의 에이전트 7종은 **`model:` 핀(opus/sonnet/haiku)** 으로 이미 강도를 나눠 갖는다. effort는 그 위에 얹는 2차 조정이며, **현재는 기본값으로 충분**하다. 강도 차등이 정말 필요해지면(예: triage·reviewer만 더 깊게, parity-tester는 얕게) **에이전트 frontmatter**에 지정한다 — `model:`과 같은 자리.
> ❌ **프로젝트 `.claude/settings.json`의 `effortLevel`로는 안 된다.** 그건 세션 전체에 하나만 적용되는 값이라 에이전트별로 갈라지지 않는다. 올려봐야 서브에이전트엔 영향 없이 메인 세션만 무거워진다.
> ⚠️ 실제로 wave-project에 `"effortLevel": "xhigh"`가 이 오해로 박혀 있었고(2026-07-20 발견), 서브에이전트엔 무효인 채 메인 세션만 매번 xhigh로 시작시키고 있었다. 제거함. 세션이 계속 xhigh로 시작하면 모델 기본값이 아니라 이 키를 의심할 것(Project > User, 경고 없음).
> **핸드오프 철칙**: 다음 단계는 항상 앞 단계가 남긴 **파일(@경로)** 을 읽는다. "분석하고 고쳐줘" 식 요약 전달은 컨텍스트 손실의 주원인.

---

## 6. 사용자 초안 대비 무엇이 바뀌었나

| 항목 | 사용자 초안 | 보강안 | 이유 |
| --- | --- | --- | --- |
| 1~2 구조 파악·분석 | Sonnet | Sonnet(유지) | survey는 기계적, 싼 모델로 충분 |
| 3 난이도 분류 | Sonnet | **Opus** | 최고 레버리지, 오분류가 하류 오염 |
| 4 상세분석 | 低S/高O | 低S/高O(유지) | 타당 |
| 5 개발 | Opus+Sonnet(opusplan) | 유지 + **문서 spec 근거** | 핸드오프 손실 방지 |
| — 검증 | (없음) | **reviewer(O)+parity(H) 추가** | "validator>model" 최대 교훈 |

---

## 7. 현실 체크 (기대치 관리)

- **완전 자동 아님**: 자동화 상한 ~75%. 숨은 비즈로직·아키텍처·보안 엣지는 사람이 소유.
- **"almost right" 함정**: 어려운 모듈을 싼 모델로 밀면 재작업이 한 번의 Opus 통과보다 비쌀 수 있다 → rubric으로 걸러 高는 Opus.
- **NFR 누락 주의**: AI는 기능 동등엔 도달해도 성능·구조·보안은 자주 놓친다 → reviewer가 NFR 명시 점검.
- **벤더 수치 불신**: "99% 로직 보존" 류는 마케팅. 파리티 테스트로 직접 검증.
- **스키마 재사용 함정**: FK 없음(앱 강제)·soft delete(`use_yn/del_yn`)·`ddl-auto=validate`+Flyway.

---

## 근거 (출처)
- **레거시 현대화 실전**: Google [arxiv 2504.09691] 74% 자동화, ServiceTitan/InfoQ(validator>model), Aviator(Java→TS 타입/널 갭), VirtusLab(C++→Rust 일회성 실패·decompose 패턴), Abto.
- **멀티모델 라우팅**: Claude Code Model config(`opusplan`·`/advisor`·`[1m]`·effort — code.claude.com/docs/en/model-config), RouteLLM(~95% 품질/15~25% 강모델), "plan을 파일로"(Addy Osmani spec, Tweag), context 손실 폴백(claude-code issue #3434).
- **Claude Code 서브에이전트**: code.claude.com/docs/en/sub-agents (모델 핀·격리 컨텍스트·`@agent-`·description "use proactively"·파일 핸드오프).
- **마이그레이션 방법론**: Strangler Fig(Fowler/MS/AWS/Thoughtworks), 바운디드 컨텍스트 슬라이스, shadow traffic·data parity(Datafold), 세션→Spring Security.

---

**문서 정보** — WAVE 전용 플랜 **v1.1** · 최종 갱신: 2026-07-03 (변경 이력은 문서 최상단 버전 표 참조). 참조: Claude Code v2.1.x, Opus 4.8 · Sonnet 5 · Haiku.
