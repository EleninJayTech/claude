> **원문 보존본** — kr-ui-guide가 사례·근거 조회용으로 싣는 리서치 보고서다(사용자 조사, 2025~2026 국내 디지털 디자인 트렌드). 내보내기 흔적(이스케이프·HTML 공백 엔티티·내장 이미지)만 걷어냈고 내용은 고치지 않았다 — 이미지로 된 수치는 글자로 되살렸다. 단어·단위 뒤에 붙은 숫자(예: `정의된다1.`·`20px3`)는 아래 참고 자료 번호(각주)다 — 수치로 읽지 않는다. 규칙으로 쓸 것은 `style-rules.md`(서술어만 명령형)·`tokens.json`·`licenses.md`·`checklist.md`가 갖고, 확인 안 된 것은 `open-questions.md`에 있다 — 여기 문장을 그대로 규칙으로 인용하지 않는다. 라이선스 표기 중 확인과 어긋난 것(Remix Icon·Toss Face·당근 SEED)은 `licenses.md`가 정정한다.

# 한국 디지털 디자인 최신 트렌드 조사 (2025~2026)

## 1. UI 비주얼 트렌드

### 1. 핵심 요약

2025~2026년 국내 디지털 프로덕트 비주얼은 '절제된 기능주의와 부드러운 입체감의 결합'으로 정의된다1. 시각적 장식을 위한 과도한 그래픽 요소를 덜어내고 여백과 타이포그래피 중심으로 정보를 계층화하는 동시에, 라운딩 반경(Border Radius)을 16~24px 수준으로 대폭 확대하여 친근한 시각적 인상을 부여한다3. 배경과 카드의 분리는 강한 테두리 선(Border) 대신 미세한 표면 색상(Surface Color) 분할과 저채도 다계층 그림자(Soft Elevation)로 구현하며, OKLCH 색공간을 적용해 다크모드와 라이트모드 간 인지 명도 일관성을 확보하는 기술적 전환이 가속화되고 있다1.

### 2. 구체 규칙

#### 권장 (Recommended)

* **그리드 및 여백 체계:** 8pt/4pt 베이스 배수 그리드를 기본 레이아웃 엔진으로 강제한다3. 모바일 뷰포트(기준 폭 360~393px)의 좌우 여백(Gutter)은 16px 또는 20px로 고정하고, 카드 내부 패딩은 상하 16~20px, 좌우 16~20px를 적용하여 시각적 안정감을 유지한다3.  
* **컴포넌트 라운딩 반경 (Border Radius):**  
  * 버튼(Button) 및 텍스트 필드(Input): 10~14px.  
  * 카드(Card) 및 모달 다이얼로그(Dialog): 16~20px.  
  * 바텀시트(Bottom Sheet): 상단 좌우 모서리 20~24px.  
  * 칩(Chip) 및 뱃지(Badge): 6~8px 또는 완전 둥근 형태(Pill: 9999px).  
* **색상 체계 및 명도 대비 (OKLCH 기반):** 기존 sRGB/HSL의 채도 왜곡을 방지하기 위해 인지적 균일 색공간(OKLCH)을 도입하여 명도를 제어한다1. 본문 텍스트와 배경 간 명도 대비는 최소 4.5:1 이상, 대형 헤드라인과 핵심 조작 컴포넌트는 3:1 이상을 준수한다7.  
* **중립색(Neutral Color) 톤:** 순수 무채색(#000000, #808080)의 사용을 배제하고, 차가운 블루-그레이 틴트가 2~5% 가미된 슬레이트 그레이(Slate Gray, 예: #191F28, #333D4B, #8B95A1, #F2F4F6)를 10단계 이상의 스케일로 구성하여 깊이감을 형성한다1.  
* **모션 속도 및 이징 곡선:** 탭 피드백 및 상태 토글 등의 마이크로 인터랙션은 150~200ms, 바텀시트 전이 및 전체 화면 전환은 250~350ms의 지속 시간을 설정한다. 이징은 가속 구간을 짧게 가져가고 감속 구간을 길게 늘린 cubic-bezier(0.16, 1, 0.3, 1) 곡선 또는 감쇠비(Damping Ratio) 0.75~0.85 범위의 스프링 다이내믹스를 적용한다1.  
* **스켈레톤 UI (Skeleton Shimmer):** 원형 스피너 로딩을 지양하고 콘텐츠 레이아웃 형태를 사전 시각화하는 스켈레톤 카드를 배치한다. 배경 대비 4~7% 밝은 그레이 톤의 1.2~1.5초 주기 무한 루프 선형 시머(Shimmer) 애니메이션을 권장한다.

#### 지양 (Avoid)

* **과도한 스큐어모피즘 및 네오모피즘:** 양각·음각 효과로 인한 시각적 노이즈를 배제하고, 명도 대비를 저해하여 정보 전달력을 떨어뜨리는 비기능적 음영 표현을 금지한다.  
* **짙고 탁한 단일 레이어 그림자:** box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)와 같은 고대비, 짧은 확산 반경의 그림자는 계층 구조를 왜곡하므로 지양한다.  
* **3색 이상의 다색 그라데이션 배경:** 가독성을 방해하고 컴포넌트 간 위계를 모호하게 만드는 복합 선형·방사형 그라데이션을 배제한다.

#### 조건부 (Conditional)

* **다크모드 지원:** 증권 거래(WTS), OTT, 음원 스트리밍 등 시각적 몰입과 야간 사용성이 필수적인 서비스는 다크모드를 기본 제공하되, 상품 원색 왜곡이 치명적인 일반 이커머스 및 배달 플랫폼은 브랜드 의도에 따라 라이트모드 단일 화면으로 고정 운용할 수 있다1.  
* **글래스모피즘(Backdrop Blur):** 스크롤되는 콘텐츠 상단에 고정되는 헤더 내비게이션 바와 플로팅 하단 액션 영역에 한하여 backdrop-filter: blur(16px~24px)와 70~80% 알파 투명도를 조건부로 허용한다.



| 비주얼 속성 | 표준 권장 수치 | 토스/당근/KRDS 구현 관행 |
| :---- | :---- | :---- |
| 베이스 그리드 단위 | 4px, 8px 배수 체계 | 8px 단위 스페이싱 토큰 표준 채택3 |
| 좌우 여백 (Gutter) | 모바일 16~20px, 웹 24~40px | 모바일 16px / 20px3 |
| 카드 모서리 곡률 | 16px ~ 20px | 16px 기본, 강조 카드 20px3 |
| 소프트 섀도우 구조 | 0 4px 16px rgba(0, 0, 0, 0.04~0.08) | 4단계 Elevation 토큰 분리 운용3 |
| 마이크로 인터랙션 속도 | 150ms ~ 250ms | 200ms ease-out 표준1 |

### 3. 실제 사례

* **토스 (Toss):** OKLCH 색공간을 적용하여 라이트모드와 다크모드 간의 시각적 명도 불일치를 수학적으로 보정했으며, 어두운 노란색의 탁도 현상을 독자적 커브로 시각 보정했다1. 또한 미세한 슬레이트 그레이 스케일을 활용해 보더 라인 없는 계층 분리를 구현했다3.  
* **당근 (Daangn):** SEED 디자인 시스템을 통해 bg.brand [조건부 무료], fg.brand [조건부 무료] 등의 시맨틱 토큰 체계를 구축하고, 중고거래 및 동네생활 피드 카드에 16px 모서리 곡률과 8pt 배수 여백을 정밀하게 적용하고 있다2.

### 4. 근거 출처

* 토스 테크(Toss Tech) 블로그: "TDS의 컬러 시스템을 7년 만에 전면 개편하며"1  
* 당근 SEED 디자인 시스템 가이드라인 공식 문서2  
* 대한민국 정부 디자인 시스템(KRDS) 스타일 가이드5

## 2. UX 패턴

### 1. 핵심 요약

국내 모바일 UX 패턴은 엄격한 엄지손가락 조작 반경(Thumb Zone) 최적화와 초단기 태스크 완결성을 추구한다4. 하단 탭 바는 4~5개로 고정되며, 삼성 One UI의 디자인 원칙에서 확장된 상단 정보 확인 영역(Viewing Area)과 하단 조작 영역(Interaction Area)의 물리적 양분이 일상화되었다13. 카카오·네이버 간편인증 및 생체인식 기반 원클릭 결제 플로우가 완벽히 정착되었으며, 고령층 및 디지털 취약계층을 위한 '간편 홈(Easy Mode)' 제공이 주요 금융·공공 서비스의 표준 지침으로 작동하고 있다15.

### 2. 구체 규칙

#### 권장 (Recommended)

* **하단 탭 바(Bottom Navigation Bar) 구성:** 탭 항목은 반드시 4개 또는 5개로 구성한다 (3개는 정보 분산 저하, 6개 이상은 터치 오작동 유발). 바 높이는 홈 인디케이터 여백을 제외하고 56~64px을 유지한다.  
* **검색 인터페이스 배치:** 콘텐츠 탐색형 서비스(쇼핑, 배달)는 상단 헤더에 44~48px 높이의 검색 인풋 필드를 고정 노출한다. 탭 시 별도 라우트 전환 없이 즉각적인 풀스크린 검색 오버레이와 함께 최근 검색어 및 실시간 트렌드 칩을 1-Depth로 렌더링한다.  
* **소셜 및 간편 로그인 배치 위계:** 소셜 로그인 버튼 리스트는 국내 점유율을 반영하여 카카오(최상단) → 네이버 → 애플(iOS 심사 필수) → 토스 순서로 배치한다. PASS 또는 통신사 SMS 인증 시 원타임 코드 자동 완성(autocomplete="one-time-code") 속성을 필수 적용한다.  
* **원페이지 결제/주문 플로우 (One-page Checkout):** 배송지 선택, 쿠폰/적립금 적용, 결제 수단 선택을 단일 뷰포트 내에 세로 스크롤로 구성하고, 화면 최하단에 높이 52~56px의 플로팅 CTA 버튼을 고정 배치한다.  
* **바텀시트(Bottom Sheet) 중심 인터랙션:** 복잡한 2-Depth 이상의 드릴다운(Drill-down) 화면 전환을 지양하고, 옵션 선택·필터링·상세 내역 확인은 화면 하단에서 50~90% 높이로 올라오는 스와이프 닫기 지원 바텀시트로 처리한다.  
* **팝업 및 배너 피로도 관리:** 인앱 모달 팝업은 세션당 최대 1개로 제한하며, 하단에 "오늘 하루 보지 않기" (24시간 로컬 스토리지 캐싱) 체크박스를 의무 제공한다.  
* **접근성 기준 (KWCAG 2.2 준수):** 대화형 인터랙션 타깃은 최소 44×44px(모바일 네이티브 48×48dp) 이상을 물리적으로 확보하고, 인접 터치 타깃 간 최소 8px의 간격을 부여한다7.

#### 지양 (Avoid)

* **핵심 탐색 수단으로서의 햄버거 메뉴(Side Drawer) 단독 운용:** 햄버거 메뉴 뒤로 주요 비즈니스 기능을 숨길 경우 국내 사용자의 탐색 전환율이 급감하므로, 핵심 경로는 하단 탭과 메인 피드 숏컷으로 전면 노출한다.  
* **다단계 강제 슬라이드 온보딩:** 앱 설치 직후 4~5단계 이상의 강제 온보딩 튜토리얼을 노출하면 초반 이탈률이 급증하므로, 툴팁 기반의 컨텍스트 온보딩(Contextual Onboarding)으로 대체한다.  
* **초기 실행 시 시스템 권한 일괄 요청:** 앱 최초 진입 시 위치, 사진, 알림, 연락처 권한 팝업을 연달아 띄우는 행위를 금지하며, 해당 권한이 실제로 사용되는 태스크 진입 시점에 개별 요청한다.

#### 조건부 (Conditional)

* **간편 모드(Senior Easy Mode) 전환 UI:** 금융, 공공, 유틸리티 서비스는 고령층 및 저시력자를 배려하여 18px 이상의 고대비 텍스트, 2열 중심의 대형 액션 카드, 복잡한 마케팅 배너가 제거된 '간편 홈' 토글 기능을 필수 옵션으로 제공한다15.

### 3. 실제 사례

* **토스뱅크 & 카카오뱅크:** 고령 사용자 및 시각 보조가 필요한 계층을 위한 '간편 홈' 모드를 분리 운영하여 잔액 조회와 단순 이체 버튼의 면적을 대폭 확장하고 불필요한 금융 상품 노출을 배제했다15.  
* **삼성 One UI:** 대화면 스마트폰의 인체공학적 사용성을 극대화하기 위해 화면 상단 30~40%를 시각 확인용(Viewing Area)으로 구성하고, 손가락이 닿는 하단 60~70%를 조작용(Interaction Area)으로 엄격히 분리했다4.

### 4. 근거 출처

* 국가표준 한국형 웹 콘텐츠 접근성 지침 2.2 (KWCAG 2.2)7  
* 삼성 One UI 디자인 원칙 및 인터랙션 가이드4  
* 금융보안원: 고령자 친화적 모바일 금융앱 구성 지침15

## 3. 타이포그래피

### 1. 핵심 요약

국내 디지털 프로덕트의 타이포그래피는 Pretendard [자유 사용]가 사실상 업계 표준(De facto standard)으로 자리 잡았으며, 데이터 중심 서비스에서는 Spoqa Han Sans Neo [자유 사용]가 병행 채택된다22. 한글 폰트는 자모 결합형 네모틀 구조의 특성상 영문 전용 폰트 대비 1.5~1.6배의 행간(Line-height)과 미세한 음수 자간(-0.01em ~ -0.025em)이 필수적이다. 금융 및 이커머스 도메인에서는 숫자 간 오정렬을 방지하기 위해 고정폭 숫자(Tabular Figures) 선언이 필수 규칙으로 적용된다.

### 2. 구체 규칙

#### 권장 (Recommended)

* **본문 기본 규격:** 모바일 본문(Body)은 15~16px, 행간 150~160%(24~26px), 자간 -0.015em(-1.5%)을 표준으로 한다. 데스크톱 웹 본문은 16px, 행간 160%(26px), 자간 -0.01em을 권장한다.  
* **타이포그래피 계층 스케일 (Type Scale):**  
  * Display 1: 32~36px (Bold 700), 행간 130~135%, 자간 -0.025em.  
  * Title 1 (헤더): 22~24px (Bold 700), 행간 140%, 자간 -0.02em.  
  * Title 2 (섹션 헤딩): 18~20px (SemiBold 600), 행간 145%, 자간 -0.015em.  
  * Body 1 (강조 본문/인풋): 16px (Medium 500 / Regular 400), 행간 150~155%, 자간 -0.01em.  
  * Body 2 (일반 본문): 14~15px (Regular 400), 행간 150~160%, 자간 -0.005em.  
  * Caption (도움말/메타데이터): 12~13px (Regular 400), 행간 140%, 자간 0em.  
* **숫자 정렬 및 다국어 보정:** 잔액, 결제 금액, 주가 등 수치가 열 단위로 정렬되어야 하는 인터페이스에는 CSS 속성 font-variant-numeric: tabular-nums;를 반드시 선언한다.  
* **웹폰트 최적화 배포:**  
  * 현대 한글 표준 2,350자 서브셋(Subset)과 주요 특수문자를 포함한 WOFF2 단일 포맷을 우선 서빙한다.  
  * 텍스트 렌더링 지연을 방지하기 위해 CSS 선언에 font-display: swap;을 필수로 명시한다.  
* **시스템 폰트 폴백 스택 (Font Stack):**font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif;

#### 지양 (Avoid)

* **한글 본문 행간 135% 이하 설정:** 영문 타이포그래피 기준(1.2~1.3배)을 한글 본문에 적용할 경우, 초성과 받침이 위아래 줄과 시각적으로 충돌하여 판독성이 심각하게 저하된다.  
* **고딕 계열 양수 자간(Letter Spacing \> 0) 본문 적용:** 한글 단어는 글자 간격이 벌어질수록 단어 인지 응집도가 급격히 떨어지므로 제목 강조 목적을 제외하고 양수 자간을 금지한다.  
* **본문 굵기 Thin(100) / Light(300) 사용:** OLED 고해상도 디스플레이에서 획 단절과 텍스트 번짐이 발생하므로 UI 본문의 최소 굵기는 Regular(400) 또는 Medium(500) 이상으로 유지한다.

#### 조건부 (Conditional)

* **가변 폰트(Variable Font) 도입:** 네트워크 트래픽 절감과 100~900 단위의 세밀한 웨이트(Weight) 제어가 필요한 고밀도 반응형 웹 애플리케이션의 경우 PretendardVariable.woff2 [자유 사용] 단일 파일을 채택한다. 구형 인앱 브라우저 대응이 중요한 서비스는 정적 WOFF2 서브셋 패키지를 폴백으로 구성한다.



| 폰트명 | 라이선스 분류 | 웹폰트 임베딩 | 앱 번들링 | 주요 권장 용도 |
| :---- | :---- | :---- | :---- | :---- |
| **Pretendard** | [자유 사용] (SIL OFL 1.1)24 | 전면 허용 | 전면 허용 | 표준 UI, 시스템 폰트 대체, 숫자 정렬23 |
| **Spoqa Han Sans Neo** | [자유 사용] (SIL OFL 1.1) | 전면 허용 | 전면 허용 | 데이터 시각화, 핀테크, 커머스 |
| **Noto Sans KR** | [자유 사용] (SIL OFL 1.1)26 | 전면 허용 | 전면 허용 | 공공기관 웹, 다국어 글로벌 서비스 |
| **Apple SD 산돌고딕 Neo** | [상용 유료] (OS 번들) | 웹 임베딩 불가 | 타 OS 번들 불가 | Apple 플랫폼 시스템 기본 UI 렌더링 |
| **원스토어 모바일고딕** | [자유 사용] (SIL OFL 1.1) | 전면 허용 | 전면 허용 | 모바일 캐주얼 인터페이스, 타이틀 |

### 3. 실제 사례

* **토스 (Toss):** TDS의 기본 타이포그래피 파운데이션으로 Pretendard [자유 사용] 서체를 채택하여 송금, 결제, 대출 전반의 숫자와 한글 기저선(Baseline)을 일치시켰다3.  
* **원티드 (Wanted):** Wanted Design System(WDS) 전반에 걸쳐 본문 행간 150%, 자간 -0.02em의 Pretendard 기반 타이포 토큰을 정형화하여 채용 플랫폼의 텍스트 가독성을 극대화했다22.

### 4. 근거 출처

* Pretendard 깃허브 공식 저장소 및 SIL Open Font License 1.1 명세23  
* 스포카 한 산스 네오 공식 문서 및 라이선스 가이드  
* 구글 폰트 Noto Sans KR 공식 라이선스 표기26

## 4. 아이콘·일러스트·그래픽

### 1. 핵심 요약

아이콘 그래픽은 24×24px 그리드 기반의 1.75~2.0px 균일 선 두께(Rounded Line) 스타일이 주류를 형성하며, 하단 탭 및 토글 영역에서는 아웃라인(Unselected)에서 면 채움(Filled)으로 전환되는 이중 상태(Dual-state) 패턴이 기본이다. 온보딩, 축하 모달, 빈 화면(Empty State)에는 감성적 완충 역할을 수행하는 3D 클레이(Clay) 및 파스텔톤 입체 그래픽이 적극 배치된다. 배너 규격은 모바일 뷰포트 기준 2.3:1 ~ 2.7:1의 와이드 직사각형으로 표준화되어 있다.

### 2. 구체 규칙

#### 권장 (Recommended)

* **아이콘 규격 및 스타일:**  
  * 바운딩 박스: 24×24px (내부 2px 안전 마진 확보, 실질 렌더링 영역 20×20px).  
  * 스트로크 굵기: 1.75px ~ 2.0px 균일 두께 유지.  
  * 선 끝 및 결합점: stroke-linecap: round;, stroke-linejoin: round; 적용.  
* **인터랙션 상태 분기:** 비활성/기본 상태 아이콘은 중립색 라인 아웃라인(stroke: #8B95A1), 선택 및 활성 상태는 브랜드 컬러 또는 짙은 슬레이트 톤의 면 채움(fill: #191F28 또는 #3182F6)으로 시각 상태를 명확히 분기한다.  
* **3D 그래픽 활용 범위:** 기능 안내성 설명에는 2D 단색 플랫 라인 아트를 적용하고, 리워드 획득, 온보딩 성공, 404 오류 및 빈 내역(Empty State)에는 부드러운 파스텔 톤 3D 아이소메트릭 그래픽을 배치한다.  
* **배너 및 썸네일 권장 비율:**  
  * 메인 롤링 프로모션 배너: 약 2.3:1 ~ 2.7:1 비율 (375×140px ~ 375×160px).  
  * 커머스 상품 썸네일: 1:1 정방형 (500×500px 이상 대응).  
  * 피드 콘텐츠 썸네일: 4:3 또는 16:9 와이드 비율.

#### 지양 (Avoid)

* **이종 아이콘 팩의 무원칙 혼용:** 하나의 서비스 내에서 각진 모서리의 아이콘 팩과 둥근 모서리의 아이콘 팩, 두께가 상이한(예: 1.5px과 2.5px) 아이콘을 섞어서 배치하는 행위를 엄격히 금지한다.  
* **비트맵(PNG/JPG) 아이콘 렌더링:** 고해상도 모바일 디스플레이에서 경계면 번짐을 방지하기 위해 모든 인터페이스 아이콘은 인라인 SVG 벡터 형식으로만 렌더링한다.

#### 조건부 (Conditional)

* **브랜드 캐릭터(Character) 그래픽의 노출 제한:** 토스의 '별이', 당근의 '당근이', 배달의민족 '배달이'처럼 감성적 유대감을 형성하는 브랜드 캐릭터는 온보딩, 대기 화면, 프로모션 뷰에 제한적으로 활용하며, 송금·결제 승인 등 집중을 요하는 트랜잭션 화면에서는 시각 노이즈 방지를 위해 노출을 전면 차단한다.

| 아이콘/그래픽 에셋 | 라이선스 분류 | 상업적 이용 여부 | 출처 표기 의무 | 사용 시 주의사항 |
| :---- | :---- | :---- | :---- | :---- |
| **Lucide Icons** | [자유 사용] (ISC) | 전면 무료 허용 | 불필요 | 현대적 프로덕트 UI의 사실상 오픈소스 표준 |
| **Remix Icon** | [자유 사용] (Apache 2.0) | 전면 무료 허용 | 불필요 | 방대한 카테고리 지원, 시스템 UI 최적 |
| **Heroicons** | [자유 사용] (MIT) | 전면 무료 허용 | 불필요 | 간결한 아웃라인/솔리드 24px 세트 |
| **Toss Face** | [자유 사용] (SIL OFL 1.1) | 전면 무료 허용 | 불필요 (단독판매금지) | 토스 공개 이모지 폰트 라이브러리 |
| **Flaticon 무료 팩** | [출처 표기 필요] (CC BY 호환) | 조건부 무료 허용 | **웹/앱 내 명시 필수** | 저작권 소송 리스크가 높아 자동 생성 시 기본 배제 |
| **FontAwesome Pro** | [상용 유료] (Commercial) | 유료 구매 시 허용 | 라이선스 조건 준수 | 유료 구독 계정 필요 |

### 3. 실제 사례

* **토스 (Toss):** 자체 디자인한 이모지 폰트 프로젝트인 Toss Face [자유 사용]를 오픈소스로 공개하고, 금융 알림 및 소비 내역 카테고리 썸네일로 전면 통합하여 감성적 일관성을 확보했다3.  
* **우아한형제들 (배달의민족):** '배달이' 캐릭터 패밀리를 주문 대기, 배차 지연, 배달 완료 모달에 정교한 마이크로 인터랙션과 함께 결합하여 부정적 대기 경험을 완화했다.

### 4. 근거 출처

* Lucide Icons 공식 라이선스 및 디자인 가이드라인 (ISC License)  
* 토스페이스(Toss Face) 오픈소스 라이브러리 명세서  
* 우아한형제들 기술 블로그: 배달의민족 브랜딩 에셋 시스템

## 5. 디지털 영상·모션 그래픽

### 1. 핵심 요약

앱 내 영상은 '숏폼 인터페이스의 커머스화'와 'Lottie 기반 벡터 모션 경량화'로 수렴된다. 15~30초 분량의 9:16 수직 풀스크린 영상이 메인 피드와 상품 상세 페이지에 독자 컴포넌트로 내장되었으며, 영상 시청 중 탐색을 유지하는 PiP(Picture-in-Picture) 미니 플레이어가 기본 패턴으로 확립되었다. 대중교통 이용이 많은 국내 사용 환경에 맞춰 무음 자동 재생과 100% 자막화가 표준화되었으며, 복잡한 그래픽 피드백은 MP4 대신 60fps 경량 Lottie JSON 에셋으로 처리한다.

### 2. 구체 규칙

#### 권장 (Recommended)

* **앱 내 숏폼 영상 규격:**  
  * 종횡비: 9:16 수직 풀스크린 (1080×1920px).  
  * 최적 영상 길이: 15초 ~ 30초 (최대 60초 이내).  
  * 코덱 및 전송 포맷: H.264 / HEVC(H.265) MP4 포맷 기본 적용, 스트리밍 환경에서는 HLS(m3u8) 분할 전송 필수.  
* **숏폼 비디오 안전 영역 (Safe Zone):**  
  * 상단 안전 영역: 상태바 및 헤더 고려 상단 120px 여백 확보.  
  * 하단 안전 영역: 상품 구매 바텀 플로팅 바, 자막, 프로그레스 바 고려 하단 220px 여백 확보.  
  * 우측 컨트롤 영역: 좋아요, 댓글, 공유 버튼이 위치하는 우측 64px 폭 내 핵심 그래픽 배치 금지.  
* **자막 및 텍스트 모션 관행:**  
  * 모든 인앱 비디오 콘텐츠는 소리 없이도 맥락을 완전히 파악할 수 있도록 음성을 100% 자막화한다.  
  * 자막 폰트 크기는 28~36pt, 텍스트 가독성을 위해 반투명 어두운 배경 박스(rgba(0,0,0,0.6)) 또는 2px 블랙 외곽선 스트로크를 적용한다.  
* **인터페이스 모션 그래픽 (Lottie):**  
  * 체크마크 완료, 축하 폭죽, 뱃지 획득 인터랙션은 Lottie JSON 벡터 애니메이션으로 제작하며, 총 재생 시간은 800ms ~ 1,200ms로 제한한다.

#### 지양 (Avoid)

* **음소거 해제 상태의 자동 재생 (Unmuted Autoplay):** 사용자 동의 없는 사운드 재생은 강력한 이탈 원인이 되므로, 모든 인앱 비디오는 반드시 기본 음소거(muted: true) 상태로 자동 재생하고 사용자의 명시적 탭으로만 사운드를 활성화한다.  
* **고용량 GIF 애니메이션 파일의 번들링:** 렌더링 성능 저하와 모바일 기기 메모리 누수를 유발하므로, 정적 이미지는 WebP로, 모션 그래픽은 Lottie JSON 또는 압축 MP4/WebM으로 전면 대체한다.

#### 조건부 (Conditional)

* **라이브 커머스 PiP (Picture-in-Picture) 플로팅 뷰:** 라이브 방송 시청 도중 상품 목록을 둘러보거나 타 탭으로 이동할 때, 방송이 끊기지 않고 화면 우측 하단(120×213px)으로 축소되어 지속 재생되는 플로팅 플레이어를 조건부 활성화한다.

### 3. 실제 사례

* **네이버 쇼핑 라이브 & 숏클립:** 숏폼 기반 '숏클립' 전용 탭을 메인에 배치하고, 영상 재생 영역 우측 하단에 상품 구매 링크를 직결하여 시청 중 1-Depth 구매 플로우를 완성했다.  
* **무신사 (MUSINSA):** '스냅(Snap)' 탭을 통해 패션 착장 영상을 9:16 수직 무한 스크롤 형태로 제공하며, 태그된 상품의 실시간 재고 확인 및 장바구니 담기를 인비디오 오버레이로 지원한다.

### 4. 근거 출처

* 네이버 쇼핑 라이브 방송 송출 및 숏클립 제작 기술 가이드  
* LottieFiles 모바일 인터랙션 최적화 백서

## 6. 디자인 시스템·조직 관행

### 1. 핵심 요약

국내 빅테크 디자인 시스템은 Figma Variables와 Style Dictionary 파이프라인을 기반으로 코드와 완벽히 동기화된 상태로 운용된다1. 대한민국 정부의 KRDS [자유 사용]를 비롯해 토스의 TDS, 당근의 SEED는 Primitive(Base) → Semantic → Component로 이어지는 엄격한 다계층 토큰 아키텍처를 채택하고 있다1. 디자이너가 Figma 토큰을 수정하여 Git PR을 생성하면 Web, React Native, iOS, Android용 소스코드가 자동으로 트랜스파일되는 단일 소스 원칙(Single Source of Truth)이 조직 전반의 표준으로 정착했다1.

### 2. 구체 규칙

#### 권장 (Recommended)

* **디자인 토큰 3계층 아키텍처:**  
  * 1단계 - 베이스/프리미티브 토큰 (Base/Scale): 원시 물리적 수치 정의 (예: blue-500: #3182F6, space-16: 16px)1.  
  * 2단계 - 시맨틱 토큰 (Semantic): 디자인 의도와 계층 부여 (예: fg-brand, bg-surface, text-primary, border-subtle)1.  
  * 3단계 - 컴포넌트 토큰 (Component): 특정 컴포넌트 영역 전용 (예: button-primary-bg, bottom-sheet-handle-color)1.  
* **토큰 명명 규칙 (Naming Convention):** 프로그래밍 언어 및 CSS 변수와의 직관적 매핑을 위해 소문자 케밥 케이스(kebab-case) 또는 닷 노테이션(dot.notation)을 적용한다1.  
  * 명명 구조: [속성]-[타깃]-[역할]-[상태/변형] (예: color-text-neutral-weak, color-button-primary-hover).  
* **간격 스케일 (8pt Spacing Scale):**  
  * space-1: 4px (미세 인라인 보정)  
  * space-2: 8px (라벨과 인풋 간격)  
  * space-3: 12px (작은 카드 내부 패딩)  
  * space-4: 16px (표준 모바일 Gutter 및 카드 패딩)  
  * space-5: 20px (대형 카드 여백)  
  * space-6: 24px (섹션 내 모듈 간 간격)  
  * space-8: 32px (대형 섹션 간 간격)  
  * space-12: 48px (화면 최하단 여백 및 그룹 구분)  
* **반응형 브레이크포인트 (Responsive Breakpoints):**  
  * Mobile: \< 768px (그리드 칼럼 4, Gutter 16~20px)  
  * Tablet: 768px ~ 1023px (그리드 칼럼 8, Gutter 24px)  
  * Desktop: 1024px ~ 1439px (그리드 칼럼 12, Gutter 32px, Max Container 1200px)  
  * Wide Desktop: ≥ 1440px (그리드 칼럼 12, Max Container 1400px)

#### 지양 (Avoid)

* **임의의 하드코딩 수치 사용:** 디자인 핸드오프 및 코드 구현 시 margin: 17px, color: #2b3341과 같이 토큰 스케일에 없는 원시 수치를 입력하는 행위를 전면 금지하며, 모든 속성은 선언된 토큰과 매핑되어야 한다.  
* **컴포넌트 변형(Variant)의 무분별한 폭증:** 크기, 형태, 상태의 단순 조합으로 컴포넌트 변형이 수백 개로 증식하지 않도록 Figma 인스턴스 스왑 및 불리언 속성을 정밀하게 모듈화한다.

#### 조건부 (Conditional)

* **멀티 브랜드 및 파생 테마 오버라이드:** 증권(WTS), B2B 어드민 등 단일 프로덕트 내에서 전혀 다른 색상 의미론(예: 일반 금융의 Blue 긍정 vs 주식 시장의 Red 상승)이 요구되는 경우, Base 토큰은 유지한 채 Semantic 토큰 매핑 레이어만 덮어씌우는 파생 테마(Derived Theme) 아키텍처를 적용한다1.



| 디자인 시스템 | 공개 주체 | 코드 라이선스 | 시각 자산 라이선스 | 주요 아키텍처 특징 |
| :---- | :---- | :---- | :---- | :---- |
| **KRDS** | 대한민국 행정안전부 | [자유 사용] (공공누리 1유형)30 | [자유 사용] (출처 표시 조건)30 | 5단계 크기 토큰, 웹 접근성(KWCAG) 표준화11 |
| **TDS** | 비바리퍼블리카 (토스) | [조건부 무료] (공개 저장소별 상이)9 | [상용 유료] (지식재산권 보호) | OKLCH 기반 인지적 명도 균일화, 미니앱 연동1 |
| **SEED** | 당근 (Daangn) | [자유 사용] (MIT License)2 | [상용 유료] (브랜드 상표권 제외) | 2계층 토큰(Scale/Semantic), 크로스 플랫폼 독립6 |
| **Line SDS** | 라인 (LINE) | [자유 사용] (Apache 2.0) | [상용 유료] (사내 자산 제외) | 다국어 고밀도 아시안 폰트 및 모바일 최적화 |

### 3. 실제 사례

* **토스 (Toss):** 디자이너가 Figma의 Token Studio 플러그인에서 토큰을 갱신하면 GitHub Actions가 Style Dictionary를 구동하여 Web, React Native, Android, iOS 코드를 단일 빌드로 자동 배포하는 파이프라인을 구축했다1.  
* **대한민국 정부 (KRDS):** 공공 포털 서비스의 파편화를 해결하기 위해 xsmall부터 xlarge까지 5단계 크기 토큰과 컴포넌트 키트를 배포하고 국가 표준 UI 지침으로 법제화했다11.

### 4. 근거 출처

* 토스 테크: "TDS 컬러 시스템 개편과 토큰 자동화"1  
* 당근 SEED 디자인 시스템 Foundations 공식 문서2  
* 대한민국 정부 디지털 서비스 UI/UX 가이드라인 공식 포털11

## 7. 글로벌 트렌드와의 차이

### 1. 핵심 요약

한국의 디지털 인터페이스는 글로벌의 미니멀리즘과 여백 중심 구조를 무비판적으로 수용하지 않고, 고밀도 정보 환경과 신속한 가치 제공을 선호하는 로컬 사용성에 맞춰 독자적으로 진화했다. 글로벌식 대형 여백은 국내 사용자에게 '정보 부족'이나 '미완성된 화면'으로 인식된다. 따라서 벤토 그리드(Bento Grid)나 바텀시트 등의 선진 구조는 적극 수용하되, 그 내부는 실시간 랭킹, 타임 딜 뱃지, 구체적 수치가 결합된 텍스트 중심 마이크로카피로 조밀하게 구성하는 하이브리드 형태가 표준을 이룬다.

### 2. 구체 규칙

#### 권장 (Recommended)

* **벤토 그리드(Bento Grid)의 고밀도 변형:** 글로벌식 대형 카드 벤토 그리드를 수용하되, 모바일 카드 내부에 아이콘+핵심 데이터 수치+뱃지(Badge)+링크 인디케이터를 160×100px 전후의 타일 안에 압축 배치하여 화면당 정보 전달 효율을 극대화한다.  
* **사회적 증거(Social Proof) 마이크로카피 배치:** 기능 설명 중심의 카피 대신 구체적인 숫자와 행동을 증명하는 데이터를 버튼 상단 또는 카드 헤더에 결합한다 (예: "3,482명이 방금 신청했어요", "마감까지 03:15:20 남음", "최대 5.5% 혜택받기").  
* **무한 피드형(Feed-First) 홈 레이아웃:** 단순 기능 아이콘 격자(Icon Grid Launcher)만 노출하는 방식을 지양하고, 첫 화면부터 아래로 스크롤하며 맞춤 추천 상품, 혜택, 실시간 피드가 끊김 없이 전개되는 피드형 구조를 구축한다.

#### 지양 (Avoid)

* **Google Material You (Dynamic Color)의 무조건적 수용:** 사용자의 안드로이드 배경화면 색상에 따라 인터페이스 주요 색상이 자동으로 변경되는 M3 동적 테마를 상업 서비스에 적용하는 것을 지양한다. 국내 사용 환경에서는 브랜드 고유의 컬러 아이덴티티(토스 블루, 당근 오렌지, 카카오 옐로, 배민 민트) 유지가 최우선이기 때문이다.  
* **지나치게 넓은 공백(Negative Space) 방치:** 화면 상단 50% 이상을 단 한 줄의 감성 카피와 빈 공간으로 처리하는 서구권 미니멀리즘을 지양한다. 첫 화면 뷰포트(Above the fold) 내에 최소 3개 이상의 구체적 실행 액션과 정보가 노출되어야 한다.  
* **시각적 단서 없는 제스처 전용(Gesture-only) 조작 강제:** 스와이프로만 화면을 닫거나 뒤로 이동하는 인터랙션은 다양한 연령대의 사용자에게 조작 실패를 유발하므로, 반드시 명시적인 닫기(X) 및 뒤로가기 버튼을 병행 제공한다.

#### 조건부 (Conditional)

* **생성형 AI 인터페이스의 결합 방식:** 글로벌 트렌드인 '단일 채팅창 중심 인터페이스'를 화면 전체에 이식하는 대신, 하단 탭 내 독립 메뉴로 격리하거나 기존 GUI 화면 우측 하단의 플로팅 액션 버튼(FAB, 예: "AI 상담") 형태로 제공한다. 대화 진입 시에도 빈 입력창 대신 3~4개의 추천 프롬프트 칩(Prompt Chips)을 제공하여 텍스트 입력 장벽을 낮춘다.

| UI/UX 트렌드 요소 | 글로벌 표준 경향 (Material 3 / HIG) | 한국 시장 현지화 양상 (2025~2026) | 수용 / 변형 / 거부 분류 |
| :---- | :---- | :---- | :---- |
| **Material 3 Dynamic Color** | OS 배경화면 기반 동적 팔레트 추출 | 고유 브랜드 시그니처 단일 컬러 강제 | **거부 (Rejected)** |
| **정보 밀도 (Information Density)** | 넓은 공백, 단일 태스크 집중 | 고밀도 카드, 멀티 혜택 뱃지, 실시간 랭킹 | **변형 (Modified)** |
| **벤토 그리드 (Bento Grid)** | 애플 스타일 비대칭 대형 타일 | 모듈형 고밀도 대시보드 및 숏컷 타일 | **수용 (Accepted)** |
| **바텀시트 (Bottom Sheet)** | 보조 작업용 모달 다이얼로그 | 1-Depth 네비게이션 및 결제 메인 컨테이너 | **수용 (Accepted)** |
| **햄버거 드로어 메뉴** | 데스크톱/태블릿 좌측 서랍 기본화 | 하단 5개 탭 바 + 전체서비스 카테고리 뷰 | **거부 (Rejected)** |

### 3. 실제 사례

* **쿠팡 (Coupang):** 글로벌 이커머스와 대조적으로 첫 화면에 '로켓배송', '골드박스', '타임할인', 카테고리 숏컷 아이콘, 실시간 랭킹이 초고밀도로 집약되어 있으며, 할인율(적색 볼드)과 와우회원 혜택가를 다단계로 노출하여 구매 전환율을 극대화한다.  
* **네이버 (Naver):** 모바일 첫 화면에서 글로벌 포털식 단순 검색창 유지를 탈피하여, '홈', '클립(숏폼)', '쇼핑', '콘텐츠'를 횡스크롤 스와이프 탭으로 묶고, 하단 그린닷(Green Dot) 인터랙션을 통해 원터치 검색·결제·도구를 복합 제공한다.

### 4. 근거 출처

* Google Material Design 3 Guidelines (Material You Architecture)  
* Apple Human Interface Guidelines (HIG) Component Layouts  
* 동아비즈니스리뷰(DBR): "한국 소비자가 반응하는 모바일 UI: 정보 밀도와 즉각적 가치 제공"

## 8. 저작권·라이선스 및 국내 법적 유의사항

### 1. 종합 자산 라이선스 분류 체계

AI 코딩 어시스턴트가 생성하는 모든 UI 코드와 디자인 에셋은 라이선스 리스크가 사전에 검증된 안전한 자산만을 채택해야 한다.



| 구분 | 자산명 | 라이선스 태그 | 상업적 이용 요건 및 주의사항 |
| :---- | :---- | :---- | :---- |
| **폰트** | Pretendard | [자유 사용] | SIL OFL 1.1. 웹폰트 및 앱 번들링 전면 무료. 글꼴 단독 유료 판매 금지24 |
| **폰트** | Spoqa Han Sans Neo | [자유 사용] | SIL OFL 1.1. 상업적 무료. 폰트 수정 후 재배포 시 동일 라이선스 적용 |
| **폰트** | Noto Sans KR | [자유 사용] | SIL OFL 1.1. 구글 제공 오픈소스 표준26 |
| **폰트** | Apple SD 산돌고딕 Neo | [상용 유료] | Apple OS 내장 번들 폰트. 타 플랫폼(Android/Web) 추출 및 배포 절대 금지 |
| **아이콘** | Lucide Icons | [자유 사용] | ISC License. 상업적 이용 및 소스 코드 내 무상 임베딩 가능 |
| **아이콘** | Remix Icon | [자유 사용] | Apache 2.0. 상업적 이용 무료. 소스 재배포 시 라이선스 고지 포함 |
| **아이콘** | Heroicons | [자유 사용] | MIT License. 웹 및 모바일 앱 내 제약 없이 자유 사용 가능 |
| **디자인시스템** | KRDS UI Kit | [자유 사용] | 공공누리 제1유형. 출처 표시 조건 하에 상업적 이용 및 변형 가능30 |
| **디자인시스템** | Toss TDS 토큰 | [조건부 무료] | 개념·수치 모델 참고 가능. 토스 고유 로고·심볼·상표권 복제 금지9 |
| **디자인시스템** | 당근 SEED | [자유 사용] | MIT License. 컴포넌트 프레임워크 사용 가능, 당근 상표 에셋 복제 불가2 |
| **캐릭터/로고** | 토스 별이 / 배민 배달이 | [상용 유료] | 해당 기업의 등록상표 및 저작물. 벤치마킹 참조만 가능, 복제 절대 금지 |

### 2. 국내 법적 분쟁 리스크 및 판례 기준

#### 폰트 프로그램 저작권 분쟁

국내 대법원 판례에 따르면 한글 글자체(폰트 도안) 자체는 저작물로 인정되지 않으나, 디지털 폰트 파일(.ttf, .otf)은 '컴퓨터프로그램저작물'로 엄격히 보호된다. 웹사이트 외주 개발이나 앱 개발 시 라이선스가 확보되지 않은 상용 폰트 파일을 패키지에 포함하여 배포할 경우 저작권법 제136조 위반으로 민·형사상 손해배상 청구의 대상이 된다. 따라서 오픈소스 라이선스인 SIL Open Font License(OFL) 서체만을 앱 번들에 내장해야 한다23.

#### 부정경쟁방지법에 의한 UI 표절 판단

저작권법상 UI 화면 배치는 '아이디어와 표현의 이분법'에 의해 창작적 표현이 아닌 단순 아이디어로 분류되어 저작권 침해가 기각되는 경우가 많았다. 그러나 법원은 부정경쟁방지 및 영업비밀보호에 관한 법률(부정경쟁방지법) 제2조 제1호 파목(구 카목, 성과물 무단 도용 행위)을 적용하여 타인의 상당한 투자나 노력으로 만들어진 독창적인 UI 구성과 기능적 플로우를 무단으로 차용한 행위에 대해 위법성을 인정하는 판결을 내리고 있다 (특허정보검색 서비스 '윕스 vs 워트인텔리전스' UI 도용 사건 등)34. 경쟁 서비스의 고유한 화면 레이아웃, 독창적 UX 인터랙션 시퀀스, 시각적 컴포넌트 배치를 1:1로 직제작 모방해서는 안 되며 구조적·스타일적 차별화를 반드시 확보해야 한다35.

#### 생성형 AI 산출물의 국내 저작권 취급 현황

문화체육관광부와 한국저작권위원회의 '생성형 AI 저작물 저작권 등록 가이드라인'에 따르면, 사람의 창작적 개입 없이 순수 AI 프롬프트 입력만으로 생성된 이미지·그래픽은 국내 저작권법상 저작물로 인정되지 않아 저작권 등록이 불가능하다39. 또한 AI가 학습한 원저작물의 스타일이나 구도를 침해할 수 있는 잠재적 리스크가 존재한다. 따라서 상용 프로덕트의 메인 비주얼, 브랜드 캐릭터, 핵심 로고에 순수 AI 생성 이미지를 원본 그대로 사용하는 것을 지양하며, 디자이너의 실질적인 2차 수정 및 리터칭(인간의 창작적 기여) 과정을 거친 후 프로덕션에 배포해야 한다39.

## 9. 디자인 토큰 초안

AI가 코드를 생성할 때 즉시 변수(Variables)로 매핑할 수 있도록 설계된 종합 토큰 명세서이다. 기본값은 법적 리스크가 없는 [자유 사용] 자산만을 채택하였다.







JSON

{  
"token_version": "2025-2026.1",  
"foundation": {  
"color": {  
"base": {  
"blue-50": "#E8F3FF",  
"blue-500": "#3182F6",  
"blue-600": "#1B64DA",  
"slate-50": "#F9FAFB",  
"slate-100": "#F2F4F6",  
"slate-200": "#E5E8EB",  
"slate-400": "#B0B8C1",  
"slate-600": "#6B7684",  
"slate-800": "#333D4B",  
"slate-900": "#191F28",  
"white": "#FFFFFF",  
"red-500": "#F04452",  
"green-500": "#04B050"  
},  
"semantic": {  
"light": {  
"bg-canvas": "{foundation.color.base.slate-50}",  
"bg-surface": "{foundation.color.base.white}",  
"bg-surface-elevated": "{foundation.color.base.white}",  
"text-primary": "{foundation.color.base.slate-900}",  
"text-secondary": "{foundation.color.base.slate-600}",  
"text-tertiary": "{foundation.color.base.slate-400}",  
"text-brand": "{foundation.color.base.blue-500}",  
"fill-brand-primary": "{foundation.color.base.blue-500}",  
"fill-brand-secondary": "{foundation.color.base.blue-50}",  
"border-subtle": "{foundation.color.base.slate-100}",  
"border-default": "{foundation.color.base.slate-200}",  
"status-error": "{foundation.color.base.red-500}",  
"status-success": "{foundation.color.base.green-500}"  
},  
"dark": {  
"bg-canvas": "#0F1317",  
"bg-surface": "#191F28",  
"bg-surface-elevated": "#232B36",  
"text-primary": "#FFFFFF",  
"text-secondary": "#B0B8C1",  
"text-tertiary": "#6B7684",  
"text-brand": "#4593FC",  
"fill-brand-primary": "#3182F6",  
"fill-brand-secondary": "rgba(49, 130, 246, 0.16)",  
"border-subtle": "#252C37",  
"border-default": "#333D4B",  
"status-error": "#F45D6A",  
"status-success": "#1FC668"  
}  
}  
},  
"typography": {  
"font-family": {  
"sans": "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Noto Sans KR', sans-serif"  
},  
"scale": {  
"display-1": {  
"size": "32px",  
"line-height": "1.35",  
"letter-spacing": "-0.025em",  
"weight": "700"  
},  
"title-1": {  
"size": "24px",  
"line-height": "1.4",  
"letter-spacing": "-0.02em",  
"weight": "700"  
},  
"title-2": {  
"size": "20px",  
"line-height": "1.45",  
"letter-spacing": "-0.015em",  
"weight": "600"  
},  
"headline": {  
"size": "17px",  
"line-height": "1.5",  
"letter-spacing": "-0.01em",  
"weight": "600"  
},  
"body-1": {  
"size": "16px",  
"line-height": "1.55",  
"letter-spacing": "-0.01em",  
"weight": "400"  
},  
"body-2": {  
"size": "14px",  
"line-height": "1.5",  
"letter-spacing": "-0.005em",  
"weight": "400"  
},  
"caption": {  
"size": "12px",  
"line-height": "1.4",  
"letter-spacing": "0em",  
"weight": "400"  
}  
}  
},  
"spacing": {  
"space-0": "0px",  
"space-1": "4px",  
"space-2": "8px",  
"space-3": "12px",  
"space-4": "16px",  
"space-5": "20px",  
"space-6": "24px",  
"space-8": "32px",  
"space-10": "40px",  
"space-12": "48px",  
"space-16": "64px"  
},  
"radius": {  
"radius-xs": "4px",  
"radius-sm": "8px",  
"radius-md": "12px",  
"radius-lg": "16px",  
"radius-xl": "20px",  
"radius-2xl": "24px",  
"radius-full": "9999px"  
},  
"shadow": {  
"elevation-1": "0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)",  
"elevation-2": "0 4px 16px rgba(0, 0, 0, 0.06)",  
"elevation-3": "0 8px 24px rgba(0, 0, 0, 0.08)",  
"elevation-modal": "0 16px 40px rgba(0, 0, 0, 0.12)"  
},  
"motion": {  
"duration-fast": "150ms",  
"duration-normal": "250ms",  
"duration-slow": "350ms",  
"easing-standard": "cubic-bezier(0.16, 1, 0.3, 1)",  
"easing-in": "cubic-bezier(0.4, 0, 1, 1)",  
"easing-out": "cubic-bezier(0, 0, 0.2, 1)"  
}  
}  
}

## 10. 판단 체크리스트

AI 코딩 어시스턴트가 신규 화면 및 컴포넌트 코드를 작성한 후 자체 검증할 수 있는 질문 목록이다. 모든 항목에 대해 '예(Yes)'가 도출되어야 최종 코드로 승인된다.

| 검증 영역 | 점검 질문 항목 | 통과 조건 |
| :---- | :---- | :---- |
| **저작권/라이선스** | 사용된 모든 폰트가 SIL OFL 등 웹/앱 임베딩이 허용된 [자유 사용] 자산인가? | 예 (Yes) |
| **저작권/라이선스** | 출처 표기 의무 자산([출처 표기 필요])이 포함된 경우 서비스 내 크레딧이 명시되었는가? | 예 (Yes) |
| **저작권/지재권** | 특정 브랜드(토스, 카카오, 당근 등)의 고유 로고, 캐릭터, 독점 그래픽을 복제하지 않았는가? | 예 (Yes) |
| **저작권/부경법** | 타사 서비스의 독창적인 UI 배치 및 인터랙션 시퀀스를 1:1로 직접 모방하지 않고 독자성을 확보했는가? | 예 (Yes) |
| **접근성 (KWCAG 2.2)** | 텍스트와 배경 간 명도 대비가 본문 4.5:1, 대형 텍스트 및 조작 UI 3:1 이상을 충족하는가? | 예 (Yes) |
| **접근성 (KWCAG 2.2)** | 모든 인터랙션 터치 타깃이 최소 44×44px(네이티브 48×48dp) 이상인가? | 예 (Yes) |
| **타이포그래피** | 한글 본문(Body) 행간이 글자 크기의 150~160%로 설정되어 획 겹침이 방지되었는가? | 예 (Yes) |
| **타이포그래피** | 금액, 계좌번호, 통계 데이터 등 정렬이 요구되는 숫자에 font-variant-numeric: tabular-nums가 적용되었는가? | 예 (Yes) |
| **레이아웃/밀도** | 모바일 화면의 좌우 여백(Gutter)이 최소 16px 이상 유지되고 8pt 스케일을 준수하는가? | 예 (Yes) |
| **UX 패턴** | 모바일 하단 내비게이션 바의 탭 개수가 4개 또는 5개로 정돈되어 있는가? | 예 (Yes) |
| **UX 패턴** | 핵심 서비스 탐색 경로가 상단 햄버거 메뉴 뒤로 은닉되지 않고 외재화되어 있는가? | 예 (Yes) |
| **성능/모션** | 인앱 자동 재생 비디오가 기본 음소거(muted) 상태이며, 무거운 GIF 대신 Lottie/WebP를 사용하는가? | 예 (Yes) |

## 11. 불확실·의견 갈리는 항목

실무 프로덕트 디자인 조직 및 프론트엔드 엔지니어링 생태계 내에서 견해차가 명확히 갈리는 영역을 별도로 정리하여, 설계 시 상황에 맞는 유연한 의사결정을 지원한다.

* **이커머스/배달 도메인의 다크모드 도입 여부:**  
  * *도입 찬성론:* OS 다크모드 설정 동기화를 통한 야간 시각 피로도 감소와 OLED 배터리 절감, 현대적 테크 이미지 강조1.  
  * *도입 유보론 (현재 상업 이커머스 다수 채택 [추정]):* 음식 사진 및 패션 상품 본연의 색상 왜곡 방지, 붉은색 할인율과 프로모션 배너의 시인성 통제를 위해 라이트모드 단일 테마로 강제 고정하는 관행이 여전히 지배적임.  
* **한글 웹폰트 서브셋 패키징 용량 타협 (2,350자 vs 11,172자 풀셋):**  
  * *2,350자 권장:* 초기 렌더링 성능(LCP)과 모바일 데이터 절감을 위해 현대 표준 한글 2,350자 서브셋(용량 200~300KB)만 로드해야 한다는 실무진의 의견.  
  * *동적 풀셋 권장:* 신조어, 인명, 브랜드 외래어 표기(예: '눞', '쉑' 등) 시 글자가 깨지고 시스템 기본 고딕으로 폴백되는 시각적 결함을 방지하기 위해 Google Fonts 스타일의 유니코드 레인지(Unicode-range) 기반 동적 청크 서브셋을 적용해야 한다는 의견이 대립함.  
* **생성형 AI 대화형 인터페이스(Conversational UI)의 주류화 여부:**  
  * *대화형 중심론:* 기존의 복잡한 계층형 메뉴를 해체하고 자연어 질의응답 단일 창으로 탐색과 주문을 완결하는 대화형 인터페이스가 차세대 표준이 될 것이라는 주장.  
  * *GUI 보조 수단론 (현재 국내 시장 우세 [추정]):* 국내 사용자는 직관적인 시각 비교, 1-Click 필터링, 정렬된 카테고리 뷰(GUI)에 압도적으로 익숙하며, 텍스트 프롬프트를 직접 타이핑하는 과정 자체를 추가적인 피로로 인지하므로 챗봇 인터페이스는 플로팅 버튼이나 CS 탐색 보조에 머무를 것이라는 분석.

#### 참고 자료

> 1. 달리는 기차 바퀴 칠하기: 7년만의 컬러 시스템 업데이트 - Toss Tech, [https://toss.tech/article/tds-color-system-update](https://toss.tech/article/tds-color-system-update)  
> 2. 당근 디자인 시스템, [https://seed-design.io/](https://seed-design.io/)  
> 3. 토스 디자인 시스템·토큰 - ko/design.md, [https://www.getdesign.kr/services/toss](https://www.getdesign.kr/services/toss)  
> 4. Samsung One UI — DESIGN.md | designmd.app, [https://designmd.app/en/library/one-ui](https://designmd.app/en/library/one-ui)  
> 5. 디자인 스타일 소개 - KRDS, [https://www.krds.go.kr/html/site/style/style_01.html](https://www.krds.go.kr/html/site/style/style_01.html)  
> 6. Design Token - 당근 디자인 시스템, [https://seed-design.io/foundations/design-token](https://seed-design.io/foundations/design-token)  
> 7. 웹 콘텐츠 접근성 지침 2.2(한국어 비공식 번역본) - A11YKR, [https://a11ykr.github.io/docs/wcag2/](https://a11ykr.github.io/docs/wcag2/)  
> 8. 웹 접근성 지침 2.2 - Web Soul Lab, [https://www.websoul.co.kr/accessibility/WA_guide22.asp](https://www.websoul.co.kr/accessibility/WA_guide22.asp)  
> 9. 토스 디자인 시스템 (TDS) - 앱인토스 개발자센터, [https://developers-apps-in-toss.toss.im/design/components](https://developers-apps-in-toss.toss.im/design/components)  
> 10. 당근의 디자인 시스템, SEED 리브랜딩 | 디자인플러스, [https://design.co.kr/article/169523/](https://design.co.kr/article/169523/)  
> 11. KRDS, [https://www.krds.go.kr/](https://www.krds.go.kr/)  
> 12. Samsung's One UI skin makes using large Galaxy handsets easier, [https://www.techspot.com/news/77315-samsung-one-ui-skin-makes-using-large-galaxy.html](https://www.techspot.com/news/77315-samsung-one-ui-skin-makes-using-large-galaxy.html)  
> 13. One UI Guidelines - ECOIN Wallet, [https://ecoinwallet.org/one_ui](https://ecoinwallet.org/one_ui)  
> 14. Everything about One UI version 2.0 - Samsung Members Community, [https://r1.community.samsung.com/t5/others/everything-about-one-ui-version-2-0/td-p/3307691](https://r1.community.samsung.com/t5/others/everything-about-one-ui-version-2-0/td-p/3307691)  
> 15. “어르신, 손가락 하나면 충분해요”…시니어 공략에 속도내는 토스뱅크, [https://v.daum.net/v/2EaJyJg2Cd](https://v.daum.net/v/2EaJyJg2Cd)  
> 16. '50세+' 금융 전쟁…인뱅도, 페이도 '시니어 모시기' - 에너지경제신문, [https://www.ekn.kr/web/view.php?key=20250506023083356](https://www.ekn.kr/web/view.php?key=20250506023083356)  
> 17. 토스뱅크가 어르신들을 위해 찾아가는 금융교육을 실시했어요, [https://www.tossbank.com/articles/csr-senior](https://www.tossbank.com/articles/csr-senior)  
> 18. 디자인 토큰 네이밍 완전 정리 – KRDS vs Material Design 비교 - 찐망고, [https://uiweb.tistory.com/258](https://uiweb.tistory.com/258)  
> 19. 정보접근성소개 \> 인증소개 - 한국디지털접근성진흥원, [http://www.kwacc.or.kr/Accessibility/Certification](http://www.kwacc.or.kr/Accessibility/Certification)  
> 20. One UI Design Guidelines - Samsung - Manuals.plus, [https://manuals.plus/m/6e3890f8ccb2812ebc6718d42a67d99f00df42dacf057ba350dc591279f415e9](https://manuals.plus/m/6e3890f8ccb2812ebc6718d42a67d99f00df42dacf057ba350dc591279f415e9)  
> 21. MZ만? 5060도 미래고객…토스, 전용 앱 선보인다 - 한국경제, [https://www.hankyung.com/article/2022021180821](https://www.hankyung.com/article/2022021180821)  
> 22. AI에게도 친절한 디자인 시스템 구축하기 - 프리윌린, [https://freewheelin-recruit.oopy.io/tech9](https://freewheelin-recruit.oopy.io/tech9)  
> 23. Pretendard 폰트 - 무찌르자 단팥빵 - 티스토리, [https://dimorin.tistory.com/entry/Pretendard-%ED%8F%B0%ED%8A%B8](https://dimorin.tistory.com/entry/Pretendard-%ED%8F%B0%ED%8A%B8)  
> 24. 한글 웹 타이포그래피의 새로운 표준, Pretendard 완벽 가이드 | gem.tips, [https://gem.tips/korean-web-typography-pretendard-complete-guide/](https://gem.tips/korean-web-typography-pretendard-complete-guide/)  
> 25. 프리텐다드(Pretendard) 폰트 무료 다운로드부터 설치·PPT 적용까지, [https://park3min.com/1092](https://park3min.com/1092)  
> 26. 한국어 폰트의 기본. 처음으로 한국어를 지원하는 인디 게임 개발자 필독!, [https://note.com/masa_kei/n/neadfac5b9d10?hl=ko](https://note.com/masa_kei/n/neadfac5b9d10?hl=ko)  
> 27. KRDS 디자인 토큰과 코드 연동의 비밀 | 플립커뮤니케이션즈, [https://blog.pulip.com/krds-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%86%A0%ED%81%B0%EA%B3%BC-%EC%BD%94%EB%93%9C-%EC%97%B0%EB%8F%99%EC%9D%98-%EB%B9%84%EB%B0%80/](https://blog.pulip.com/krds-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%86%A0%ED%81%B0%EA%B3%BC-%EC%BD%94%EB%93%9C-%EC%97%B0%EB%8F%99%EC%9D%98-%EB%B9%84%EB%B0%80/)  
> 28. 디자인시스템을 개발에서 적용 하는법, [https://d2.naver.com/helloworld/7030870](https://d2.naver.com/helloworld/7030870)  
> 29. 디자인 시스템 중 디자인 토큰을 여러 도구를 이용하여 자동화 하는 방법, [https://oliveyoung.tech/2024-12-16/Design-System-Token-Automation/](https://oliveyoung.tech/2024-12-16/Design-System-Token-Automation/)  
> 30. 「생성형 인공지능의 저작물 학습에 대한 저작권법상 '공정이용, [https://www.mcst.go.kr/site/s_notice/press/pressView.jsp?pSeq=22261](https://www.mcst.go.kr/site/s_notice/press/pressView.jsp?pSeq=22261)  
> 31. KRDS Design System — Colors, Typography & Tokens, [https://oh-my-design.kr/design-systems/krds](https://oh-my-design.kr/design-systems/krds)  
> 32. TDS를 소개해요 - 토스, [https://tossmini-docs.toss.im/tds-react-native/](https://tossmini-docs.toss.im/tds-react-native/)  
> 33. 시작하기 | SDK - 앱인토스 개발자센터, [https://developers-apps-in-toss.toss.im/documentation/integration/getting-started](https://developers-apps-in-toss.toss.im/documentation/integration/getting-started)  
> 34. UI·UX도 법적 보호 대상?…삼성화재 '카카오페이손보 표절 의혹'이, [https://www.bizwnews.com/news/articleView.html?idxno=85127](https://www.bizwnews.com/news/articleView.html?idxno=85127)  
> 35. “UI도 표절이 인정될까?” 카카오페이 vs 삼성화재 사건 속 지식재산권, [https://ditoday.com/ui%EB%8F%84-%ED%91%9C%EC%A0%88%EC%9D%B4-%EC%9D%B8%EC%A0%95%EB%90%A0%EA%B9%8C-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8E%98%EC%9D%B4-vs-%EC%82%BC%EC%84%B1%ED%99%94%EC%9E%AC-%EC%82%AC%EA%B1%B4/](https://ditoday.com/ui%EB%8F%84-%ED%91%9C%EC%A0%88%EC%9D%B4-%EC%9D%B8%EC%A0%95%EB%90%A0%EA%B9%8C-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8E%98%EC%9D%B4-vs-%EC%82%BC%EC%84%B1%ED%99%94%EC%9E%AC-%EC%82%AC%EA%B1%B4/)  
> 36. 카페손보vs삼성화재 '표절 의혹'…과거 사례 살펴보니 UI도 '지식재산, [https://www.ajunews.com/view/20240630130329908](https://www.ajunews.com/view/20240630130329908)  
> 37. 여행자보험 문구 수정···삼성화재, 카카오페이 표절 논란 일단락되나, [https://www.newsway.co.kr/news/view?ud=2024071714445397975](https://www.newsway.co.kr/news/view?ud=2024071714445397975)  
> 38. 판례 \> 서울고등법원 2015나2063761 - 사법정보공개포털, [https://portal.scourt.go.kr/pgp/main.on?w2xPath=/pgp/ui/pgp1000/PGP1011M04.xml&jisCntntsSrno=3213621](https://portal.scourt.go.kr/pgp/main.on?w2xPath=/pgp/ui/pgp1000/PGP1011M04.xml&jisCntntsSrno=3213621)  
> 39. 2025 생성형 AI 저작권 등록 안내서 총정리 (feat. 업계 반응) - 디자인DB, [https://www.designdb.com/?menuno=1434&bbsno=1754&siteno=15&ztag=rO0ABXQAOTxjYWxsIHR5cGU9ImJvYXJkIiBubz0iOTkzIiBza2luPSJwaG90b19iYnNfMjAxOSI%2BPC9jYWxsPg%3D%3D&act=view](https://www.designdb.com/?menuno=1434&bbsno=1754&siteno=15&ztag=rO0ABXQAOTxjYWxsIHR5cGU9ImJvYXJkIiBubz0iOTkzIiBza2luPSJwaG90b19iYnNfMjAxOSI%2BPC9jYWxsPg%3D%3D&act=view)  
> 40. 생성형 AI 저작권 안내서(국/영문) \> 조사·연구(상세) \> 발간자료 \> 자료, [https://www.copyright.or.kr/information-materials/publication/research-report/view.do?brdctsno=52591](https://www.copyright.or.kr/information-materials/publication/research-report/view.do?brdctsno=52591)  
> 41. 우리 인공지능-저작권 기준, 전 세계에 알린다 - 문화체육관광부, [https://mcst.go.kr/servlets/eduport/front/upload/UplDownloadFile?pFileName=(0415)%EB%AC%B8%EC%B2%B4%EB%B6%80%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C-%EC%83%9D%EC%84%B1%ED%98%95_%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5_%EC%A0%80%EC%9E%91%EA%B6%8C_%EC%95%88%EB%82%B4%EC%84%9C_%EC%98%81%EB%AC%B8%EB%B3%B8_%EC%A0%9C%EC%9E%91_%EB%B0%B0%ED%8F%AC.pdf&pRealName=20240415081744634621136922_PRESS20240415081744101334.pdf&pPath=0302000000](https://mcst.go.kr/servlets/eduport/front/upload/UplDownloadFile?pFileName=(0415)%EB%AC%B8%EC%B2%B4%EB%B6%80%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C-%EC%83%9D%EC%84%B1%ED%98%95_%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5_%EC%A0%80%EC%9E%91%EA%B6%8C_%EC%95%88%EB%82%B4%EC%84%9C_%EC%98%81%EB%AC%B8%EB%B3%B8_%EC%A0%9C%EC%9E%91_%EB%B0%B0%ED%8F%AC.pdf&pRealName=20240415081744634621136922_PRESS20240415081744101334.pdf&pPath=0302000000)
