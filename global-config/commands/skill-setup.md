**역할:** 너는 현재 작업 디렉터리(이 저장소)에서 실행 중인 Claude Code다. 아래 *후보 스킬 카탈로그*
중에서 **이 프로젝트에 실제로 도움이 되는 것만** 선별해, **각 스킬에 맞는 올바른 방식**으로 설치하고,
기존 Claude 설정과 충돌 없이 구성한 뒤, 사용법을 `CLAUDE.md`에 기록하는 것이 목표다.

**반드시 지킬 원칙**

1. 모르면 추측하지 말고 멈춰서 물어본다. 단순하게 유지하고, 요청 범위를 벗어나지 않는다.
   (이 원칙 자체가 karpathy-guidelines다.)
2. **변경(설치 / 파일 수정 / 플러그인 추가 / 서버 실행)을 하기 전에 먼저 "계획"을 표로 보여주고
   한 번 승인받는다.** 승인 전에는 어떤 변경도 하지 않는다.
3. 멱등성: 이미 설치된 것은 건너뛴다. 기존 파일은 덮어쓰기 전에 백업하고, 무관한 파일은 절대
   건드리지 않는다. 같은 프롬프트를 다시 실행해도 안전해야 한다.
4. 비밀값(API 키, 토큰 등)을 `CLAUDE.md`나 커밋에 절대 넣지 않는다.
5. 스킬 폴더는 **`SKILL.md`가 직접 들어 있는 폴더**를 복사한다. 한 단계 더 들어간 중첩은 #1 설치
   오류다. (올바름: `~/.claude/skills/<이름>/SKILL.md` / 틀림: `.../<이름>/<또다른폴더>/SKILL.md`)
6. 너는 너 자신을 재시작할 수 없다. 재시작이나 `/reload-plugins`가 필요하면 사용자에게 명확히
   안내한다.
7. 모든 보고는 한국어로 한다.
8. (조건부 — 0단계에서 "기존 사용자 구성 있음"으로 판정된 경우에만 적용. 없으면 무시.)
   기존 구성을 존중하기 위해:
    - 기본 설치 스코프는 사용자(`~/.claude/skills/`). 프로젝트(`.claude/skills/`) 설치는
      "팀에 커밋·공유됨"을 명시하고 별도 승인받는다.
    - 기존 hooks·메모리 체계와 겹칠 수 있는 플러그인형(특히 superpowers, agentmemory)은
      자동 설치하지 말고, 발견된 실제 충돌 지점(SessionStart/PreCompact 등 훅 중복, MCP 서버,
      토큰 비용, 세션 캡처와 시크릿 정책의 긴장)을 먼저 보고한 뒤 사용자 승인 시에만 설치한다.
    - 기존 `settings.json`·hooks·권한 규칙은 수정하지 않는다(필요하면 제안만).

---

**0단계 — 환경·프로젝트·기존 설정 파악 (읽기만, 변경 없음)**

- **환경 점검:** OS, 그리고 `git` · `node`/`npx` · `curl` 사용 가능 여부, Claude Code 버전
  (플러그인 `/plugin` 지원 여부)을 확인한다.
- **프로젝트 정체성 파악:** 루트의 의존성·설정 파일을 읽어 주 언어·프레임워크·종류(앱/라이브러리/
  CLI/스크립트)·**프론트엔드(UI) 유무**·테스트 구성·팀/개인 작업 여부를 판단한다.
  (살펴볼 예: `package.json`, `pyproject.toml`, `requirements.txt`, `Cargo.toml`, `go.mod`,
  `composer.json`, `Gemfile`, `README*`, 디렉터리 구조, 그리고 코드에 영상/미디어 처리 흔적이
  있는지)
- **기존 Claude 설정 인벤토리:**
    - 프로젝트: `./CLAUDE.md`, `./.claude/`(`settings.json`, `settings.local.json`, `skills/`,
      `commands/`, `agents/`, 훅, `.mcp.json`), `./AGENTS.md`
    - 사용자: `~/.claude/CLAUDE.md`, `~/.claude/settings.json`, `~/.claude/skills/`,
      `~/.claude/commands/`, `~/.claude/plugins/`
    - **이미 설치/내장된 스킬을 목록화**해 중복 설치를 막는다. 특히 `frontend-design`은 Claude Code
      기본 제공일 수 있으니 확인 후 이미 있으면 설치하지 않는다.
- 위 인벤토리로 "기존 사용자 구성"의 유무를 판정한다. (`settings.json`의 hooks/permissions,
  `/resume`·`/wrap` 등 커스텀 스킬, `autoMemoryEnabled`, docs의 PROGRESS/DECISIONS·merge=union 중
  하나라도 있으면 '있음'.) 있으면 **위 원칙 8번** 충돌 회피 규칙을 적용하고, 없으면 **원칙 8번**은
  건너뛴다. 어느 쪽이든 무엇을 발견했는지(또는 "기존 구성 없음")를 2단계 계획에 명시한다.

**1단계 — 후보 스킬 분석 및 적합도 판정**

아래 카탈로그의 각 항목에 대해:

- 저장소를 임시 디렉터리에 얕은 클론(`git clone --depth 1 …`)하거나 README/`SKILL.md`를 확인해
  **실제 정체와 패키징 방식**을 파악한다 → 다음 중 무엇인가?
  (a) 단순 스킬 폴더, (b) 플러그인(마켓플레이스), (c) 서버+MCP+훅 형, (d) 일반 라이브러리.
- 이 프로젝트에 대한 **적합도를 상/중/하/제외**로 매기고, 각 줄에 한 줄 근거를 단다.
- **설치 범위**를 정한다: 팀과 공유할 프로젝트 규칙·안전 장치 → `.claude/skills/`(커밋되어 공유) /
  개인 스타일·메모리류 → `~/.claude/skills/`(모든 프로젝트에서 개인용). 선택 근거를 함께 제시.
- **절대 카탈로그 전부를 다 설치하지 마라.** 이 프로젝트에 실제 이득이 되는 것만 추린다.

**후보 스킬 카탈로그** *(필요하면 항목을 추가/삭제해 재사용하세요. 괄호 안은 참고용 힌트일 뿐,
정체는 반드시 실행 시점에 직접 확인할 것)*

1. **karpathy-guidelines** — 안전한 코드 수정 원칙(모르면 질문·단순성·범위 준수·수정 전후 확인).
   `https://github.com/multica-ai/andrej-karpathy-skills/tree/main/skills/karpathy-guidelines`
   *(대개 표준 스킬 폴더. 거의 모든 코딩 프로젝트에 유용.)*
2. **superpowers** — 체계적 코딩 프로세스 강제(요구사항→계획→테스트→구현→리뷰).
   `https://github.com/obra/superpowers`
   *(⚠️ 단순 폴더가 아니라 **플러그인**. 마켓플레이스로 설치 후 **재시작** 필요. 워크플로를 강하게
   강제하는 무거운 프레임워크라, 팀/사용자가 그 방식을 원할 때만 권장.)*
3. **frontend-design** — 뻔한 AI 디자인(흰 배경·보라 그라데이션·단조 레이아웃) 금지.
   `https://github.com/anthropics/skills/tree/main/skills/frontend-design`
   *(표준 스킬 폴더. **단, Claude Code에 이미 내장**되어 있을 수 있음 → 중복이면 제외. UI/프론트엔드가
   있는 프로젝트에만 적합.)*
4. **understand** — 복잡한 코드/타인 프로젝트의 파일·함수 의존성 관계를 구조적으로 파악.
   `https://github.com/Egonex-AI/Understand-Anything`
   *(정체는 런타임에 확인. 크거나 낯선 코드베이스 분석에 적합.)*
5. **agentmemory** — 세션 간 주요 결정·규칙·사용자 선호를 기억해 연속성 유지.
   `https://github.com/rohitg00/agentmemory`
   *(⚠️ 가장 무거움: 스킬 + 플러그인 + **MCP 서버**(별도 터미널에서 `npx @agentmemory/agentmemory`
   상시 실행) + 훅. 토큰 비용 주의. 장기·다세션 프로젝트에만. **가벼운 대안**: 스킬만 설치
   `npx skills add rohitg00/agentmemory -y`.)*
6. **claude-video** — 영상 분석 시 시각적 맥락·구조적 흐름을 종합 판단.
   `https://github.com/bradautomates/claude-video`
   *(정체/요구사항은 런타임에 확인. 영상을 다루는 프로젝트에만 적합. ffmpeg 등 외부 도구나 API 키가
   필요할 수 있음 → 필요하면 사용자에게 안내만 하고 직접 키를 넣지 말 것.)*
7. **humanizer** — AI 특유의 작위적 문체 배제 + 사용자의 글쓰기 습관(리듬·단어 선택) 반영 교정.
   `https://github.com/DaleSeo/korean-skills/blob/main/skills/humanizer/SKILL.md`
   *(표준 스킬 폴더(단일 `SKILL.md`). 한국어 사용자 대상 글/문서/카피 작성이 있으면 유용.)*

**2단계 — 계획 제시 후 승인 (게이트)**

아래를 **표로 요약**해 보여주고 "이대로 진행할까요?"라고 묻는다. 사용자가 승인("진행"/"go" 등)하기
전에는 어떤 변경도 하지 않는다. 사용자가 특정 항목 제외/추가를 원하면 반영한다.

- 설치할 스킬 / 범위(프로젝트·사용자) / 설치 방식 / 근거
- 제외할 스킬 / 이유
- 사전 준비물(예: superpowers 재시작 필요, agentmemory 서버·MCP, claude-video의 ffmpeg)
- `CLAUDE.md`에 추가될 내용 요약

**3단계 — 설치 (각 종류에 맞는 방식으로)**

- **표준 스킬 폴더형:** 임시로 얕은 클론 → `SKILL.md`가 직접 든 폴더를 찾음 → 그 폴더를 올바른
  이름으로 선택한 스킬 디렉터리에 복사(**중첩 금지**) → `SKILL.md`의 frontmatter(`name`,
  `description`) 유효성 확인 → 임시 파일 정리. 한 저장소에 스킬이 여러 개면 각각 처리.
- **플러그인/마켓플레이스형(superpowers 등):** 문서화된 슬래시 커맨드를 실행한다. 예:
  `/plugin marketplace add obra/superpowers-marketplace` 후
  `/plugin install superpowers@superpowers-marketplace`. 적용에 **재시작/`/reload-plugins`**가
  필요하면 그 절차를 사용자에게 안내한다.
- **서버+MCP형(agentmemory 풀 모드):** 별도 터미널에서 `npx @agentmemory/agentmemory` 실행 +
  `/plugin marketplace add rohitg00/agentmemory` + `/plugin install agentmemory`를 안내하고,
  **토큰 비용 주의**를 명시한다. 더 가벼운 모드로 **스킬만 설치**(`npx skills add rohitg00/agentmemory -y`)
  하는 선택지도 함께 제시한다.
- **공통:** 이미 설치돼 있으면 건너뛰고, 덮어쓸 땐 백업하며, 무관한 파일은 건드리지 않는다. 클론한
  임시 폴더는 정리한다. `git`/`node`/`curl`이 없으면 보고하고 수동 설치 방법을 알려준다. 저장소가
  사실 스킬이 아니라 일반 라이브러리면, 억지로 스킬로 만들지 말고 정체를 보고한 뒤 제외하거나 올바른
  사용법을 안내한다.

**4단계 — 기존 Claude 설정과 통합 (중요)**

- 프로젝트 `CLAUDE.md`가 **없으면** 만들지 물어보고, **있으면 덮어쓰지 말고 보강**한다.
- 다시 실행해도 해당 부분만 갱신되도록 **관리 블록 마커**로 감싼다:
  `<!-- claude-skill-setup:start -->` … `<!-- claude-skill-setup:end -->`
  이 블록 안에 **설치된 스킬 · 범위 · 호출법(슬래시 커맨드) · 이 프로젝트에서의 사용 규칙**을 적는다.
  예시 규칙: "모든 코드 수정은 karpathy-guidelines 원칙(모르면 질문·단순성·범위 준수)을 따른다",
  "사용자에게 노출되는 문구는 humanizer로 다듬는다", "UI 작업에는 frontend-design을 적용한다".
- **우선순위 존중:** 프로젝트 `CLAUDE.md`의 규칙이 일반 스킬 지침보다 우선함을 명시·유지한다. 기존
  사용자 `~/.claude/CLAUDE.md`·`settings.json`은 **읽기만** 하고, 꼭 추가가 필요하면 같은 마커 블록
  으로만 덧붙인다.
- 자체 설정 파일이 있는 스킬(agentmemory의 `.env`, superpowers의 config 등)은 **위치와 최소 설정만**
  안내하고, 비밀값은 적지 않는다.

**5단계 — 검증 및 최종 보고**

- 스킬 로드 확인(`/skills`), 플러그인 목록 확인(`/plugin`). 세션이 새 스킬을 인식하려면 재시작이
  필요한 경우 그 사실을 안내한다.
- 최종 요약을 출력한다: **설치됨**(범위·호출법) / **건너뜀**(이유) / **다음 할 일**(재시작, 서버
  실행, 키 설정 등) / **`CLAUDE.md` 변경 요약**.