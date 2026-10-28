> **원문 보존본** — kr-ui-styles 팩 `kitsch`가 사례·근거 조회용으로 싣는 리서치 보고서다. **Claude 딥 리서치 산출물**을 사용자가 2026-10-28 제공했다. 내보내기 흔적(이스케이프·단어 뒤 각주 번호)만 걷어냈고 내용은 고치지 않았다 — 각주 번호를 뺐으므로 참고 자료 목록과의 대응은 사라졌다. 원문이 수식·단위를 그림 5개로 내보낸 자리는 `⟦그림 1⟧`~`⟦그림 5⟧` 마커로 바꾸고 base64 정의는 지웠다(그림이 뜻하던 값은 `kitsch.md`가 ⟦보완⟧으로 적었다 — 눌림 이동 축 X·Y, 위글 키프레임 ±2~3°, AA 최소 4.5:1, 44×44pt / 48×48dp). 대비표 10행 중 8행의 출처(26번)는 미확인 URL이어서 `kitsch.md`가 공식으로 재계산한 값을 쓴다. 서체 라이선스 표는 `kitsch.md`가 2026-10-28 공식 원문으로 다시 판정했다 — 원문의 디스플레이 서체 5종은 공식 조항을 읽을 수 없어 전부 [검증 필요]이고(URL 2건은 다른 페이지·죽은 호스트), 팩은 Google Fonts OFL 수록본(Jua·Do Hyeon·Black Han Sans)을 쓴다. 팔레트는 사례 서비스의 디자인 시스템에서 왔고 민트는 그 브랜드 색이라 팩은 강조색을 기본값으로 쓰지 않는다. 규칙으로 쓸 것은 `kitsch.md`·`kitsch.tokens.json`이 갖는다 — 여기 문장을 그대로 규칙으로 인용하지 않는다.

# 키치·일러스트·B급 디지털 프로덕트 인터페이스 설계 사양 및 트렌드 연구 보고서

## 1. 판정: 2025~2026년 한국 디지털 프로덕트에서의 유의미성

2025~2026년 한국 웹·앱 프로덕트 디자인 환경에서 키치·일러스트·B급 스타일(네오브루탈리즘, 손글씨 및 디스플레이 서체, 볼드한 캐릭터 일러스트레이션, 해학적 마이크로카피)의 유의미성은 ‘부분(Partial)’으로 판정된다. 이 스타일은 프로덕트 전반을 지배하는 기본 UI 패러다임(Main UI Framework)으로 안착하기보다는, 사용자 인게이지먼트를 극대화하기 위한 특정 비즈니스 목적의 ‘전략적 하위 계층(Sub-layer)’으로 격리되어 고도화되는 추세를 보인다.  
2010년대 배달의민족이 한나체·주아체와 특유의 패러디 문화를 서비스 전면에 내세워 독보적인 브랜딩을 구축했으나, 2024~2025년을 거치며 단행된 배민 2.0 리브랜딩은 이 스타일의 구조적 한계를 명확히 드러냈다. 배민은 기존의 구형 디스플레이 서체를 코어 UI에서 전면 철거하고, 좁은 뷰포트 내 정보 밀도와 판독성을 높인 전용 서체 '배민 WORK체'와 현대적인 고채도 민트(#0CEFD3)를 메인 UI 표준으로 확립하였다. 구형 한나체를 메인 UI에 시스템 폰트처럼 사용하는 관행은 공식 디자인 가이드라인에서 안티패턴으로 정의되었으며, 디스플레이 서체와 B급 비주얼은 프로모션 배너와 이벤트 레이어로 축소·격리되었다.  
현재 국내 디지털 프로덕트 생태계에서 본 스타일이 집중적으로 소비되는 영역은 다음의 네 가지로 수렴된다. 첫째는 올웨이즈의 ‘올팜’, 토스의 ‘고양이 키우기’, 마켓컬리의 ‘마이컬리팜’처럼 체류 시간과 일일 활성 사용자 수(DAU)를 견인하는 게이미피케이션 커머스 피처이다. 둘째는 카카오뱅크 mini와 같이 캐릭터 인터랙션과 시각적 개성이 서비스 선택의 핵심 동기가 되는 10대 알파 세대 전용 버티컬이다. 셋째는 여기어때, 당근, 배달의민족 등에서 시즌별 할인 프로모션이나 로컬 커뮤니티 캠페인에 단기적으로 투입하는 마이크로 인터페이스이다. 넷째는 폼 빌더 왈라(Walla)처럼 네오브루탈리즘 시각 언어를 통해 기술적 딱딱함을 탈피하려는 B2B SaaS의 틈새 브랜딩이다.  
결과적으로 본 스타일은 토스 계열의 절제된 기능주의를 대체하는 주류 UI 프레임워크가 아니며, 기능적 명확성을 저해하지 않는 선에서 사용자 관여도를 순간적으로 증폭시키는 특수 목적형 디자인 언어로 정립되어 있다.

## 2. 대표 사례

국내 디지털 프로덕트 7곳 및 비교 분석을 위한 해외 프로덕트 2곳의 실제 적용 현황은 다음과 같다.

| 서비스명 | 업종 | 적용 화면 및 범위 | 도입·개편 시기 | 주요 특징 및 출처 |
| :---- | :---- | :---- | :---- | :---- |
| **배달의민족** | 음식 배달·퀵커머스 | 프로모션 배너, 리뷰 스티커, 선물하기, 이벤트 상세 | 2010년 론칭, 2024~2025년 2.0 개편 | 코어 UI는 WORK체로 기능주의 전환, 이벤트/배너는 키치 톤 유지 |
| **올웨이즈** | 공동구매 커머스 | '올팜' 인앱 작물 육성 미니게임 및 리워드 전반 | 2021년 출시, 2023~2025년 고도화 | 손그림 감성의 농작물 캐릭터, 픽셀 이펙트, 게임형 팝업 집중 |
| **토스** | 종합 핀테크·플랫폼 | '고양이 키우기', 만보기 아이템 샵, 행운복권 | 2023년~2025년 지속 확장 | 표준 디자인 시스템(TDS) 내 캐주얼 게이미피케이션 격리 운영 |
| **카카오뱅크 mini** | 청소년 금융 | 청소년 전용 홈, 카드 발급, 송금 리워드 인터랙션 | 2020년 10월 출시, 2023~2024년 확장 | 니니즈 캐릭터 전면 배치, 익살스러운 축하 모션과 일러스트 |
| **당근** | 하이퍼로컬 커뮤니티 | 동네생활 온보딩, 매너온도 피드백, 칭찬 배지 | 2020년 당근이, 2024년 8월 단추·앙리 공개 | 식재료 및 동물 의인화 캐릭터 기반의 친근한 커뮤니케이션 |
| **여기어때** | 여행·숙박 플랫폼 | 시즌 프로모션, 할인 쿠폰팩, 메인 캠페인 배너 | 2018년 잘난체 배포, 2023~2025년 적용 | 볼드한 전용 디스플레이 서체와 과장된 원색 배너 그래픽 |
| **왈라 (Walla)** | 폼 빌더·B2B SaaS | 랜딩 페이지, 템플릿 탐색기, 설문 응답 완료 화면 | 2023년~2025년 | 네오브루탈리즘 기반의 2px 블랙 테두리, 하드 섀도우, 팝 컬러 |
| **Duolingo** (해외) | 언어 교육 | 앱 전체 코어 UI, 학습 세션, 위젯, 스트릭 알림 | 2019년 대개편, 2023~2025년 심화 | 마스코트(Duo)의 극단적 감정 표현, 원색 블록, 밈 중심 마이크로카피 |
| **Gumroad** (해외) | 크리에이터 커머스 | 웹 서비스 전체(랜딩, 대시보드, 체크아웃 폼) | 2021년 네오브루탈리즘 리브랜딩 | 3px 블랙 보더, 블러 없는 4px 오프셋 섀도우, 무채색과 형광 대비 |

이들 프로덕트는 코어 트랜잭션과 인게이지먼트 피처의 시각적 경계를 철저히 분리하는 설계를 취하고 있다. 메인 결제나 계약이 수반되는 영역에서는 표준화된 정보 구조를 제공하되, 사용자의 반복 진입을 유도하는 관문에는 과장된 일러스트와 원색을 배치함으로써 기능성과 감성적 락인(Lock-in)을 동시에 달성한다.

## 3. 기본 스타일과의 차이: 7축 비교

토스 계열의 절제된 기능주의와 키치·일러스트·B급 스타일의 구조적 시각 차이는 다음과 같은 축으로 대별된다.

| 비교 축 | 토스 계열 절제된 기능주의 (기준 스타일) | 키치·일러스트·B급 스타일 (대상 스타일) |
| :---- | :---- | :---- |
| **1. 중립색** | 블루-그레이 틴트 중립색 (#191F28, #333D4B, #8B95A1, #F2F4F6). 차갑고 균일한 톤. | 웜 크림/오프화이트 바탕 (#FFFDF8, #FAF7EE), 짙은 먹색 라인 (#121212, #000000). |
| **2. 강조색 구조** | 단일 고채도 블루 (#0064FF) 중심의 엄격한 1점 포인트. 보조색은 상태 표시에 국한. | 다색 고채도 원색(Multi-saturated). 네온 옐로우, 마젠타, 시안 등 3개 이상의 색채가 동등한 위계로 충돌. |
| **3. 타이포** | Pretendard 단일 네오그로테스크 산세리프. 굵기와 크기 스케일만으로 위계 설정. | 하이브리드 페어링. 타이틀에 장식용 디스플레이/손글씨/픽셀 서체 적용, 본문만 산세리프로 폴백. |
| **4. 라운딩** | 카드 및 컨테이너에 16~20px의 완만한 스무스 코너(Squircle) 일관 적용. | 극단적 양극화. 직각(0px) 네오브루탈리즘 형태 또는 알약형(999px Pill), 비대칭 모서리 혼용. |
| **5. 깊이 (그림자·레이어)** | 다층 저채도 소프트 섀도우 (투명도 4~8%, 블러 12~24px). 매끄러운 공간 부유감. | 하드 드롭 섀도우 (투명도 100% 솔리드 블랙, 블러 0px, 3~5px 오프셋) 및 1.5~3px 검정 테두리. 스티커 레이어링. |
| **6. 이미지·일러스트** | 정제된 3D 렌더링 글래스모피즘 아이콘, 사실적 고화질 사진. 절제된 감정선. | 2D 캐릭터 마스코트, 두꺼운 외곽선의 낙서풍 두들(Doodle), 레트로 8비트 도트 그래픽. 과장된 유머. |
| **7. 레이아웃 밀도** | 8pt 그리드 기반의 넉넉한 여백, 1화면 1태스크 원칙의 극단적 인지 부하 최소화. | 팝업 스티커 분산 배치, 컨테이너 바깥으로 튀어나오는 그래픽 오브젝트, 배지 집약형 고밀도 구성. |

기준 스타일이 요소 간의 간격과 투명도, 다층 음영을 활용해 화면 전체의 시각적 마찰을 소거하는 반면, 대상 스타일은 테두리와 단단한 그림자, 원색의 상충을 통해 인터페이스 요소 자체를 하나의 장난감 블록이나 인쇄된 스티커처럼 인지하게 만든다. 이는 심미적 정갈함보다는 즉각적인 시각적 자극과 손에 잡힐 듯한 촉각적 상호작용성을 유도하는 데 집중된 구조다.

## 4. 색 체계와 WCAG 명도 대비

키치·B급 스타일은 원색의 생동감을 활용하되, 본문 및 기능 요소의 접근성을 위해 엄격한 텍스트 대비 규칙을 수립해야 한다.  
팔레트의 기본 구조는 물리적 지면의 질감을 연상시키는 웜 크림(#FFFDF8)을 메인 뷰포트 배경으로 채택하고, 외곽선 및 주요 텍스트 잉크로 짙은 먹색(#121212)을 사용한다. 여기에 주의 집중을 위한 사이버 옐로우(#FFE500), 감정 반응을 촉발하는 네오 핑크(#FF4D8D), 경쾌한 액션을 유도하는 배민 민트 2.0(#0CEFD3), 긍정적 보상 피드백을 전달하는 애시드 그린(#2CE69B), 서브 프로모션을 보조하는 일렉트릭 퍼플(#7B2CBF)을 악센트로 편성한다. 중립색은 Cream(FFFDF8), Light Ivory(F4EEDD), Gray(767676), Solid Black(121212)의 4단계로 단순화하여 원색과의 마찰을 방지한다.  
강조색은 최대 3~4종을 조합할 수 있으나, 단일 모듈 내에서는 ‘배경 1종 + 섀도우 먹색 1종 + 액션 포인트 1종’의 배색 규칙을 엄수해야 시각적 인지 붕괴를 피할 수 있다. 다크모드의 경우 원색이 암전 환경에서 유발하는 극심한 눈부심(Glare)을 방지하기 위해 캐주얼 피처 화면에서는 라이트 테마를 강제 고정하는 것이 일반적이다. 전체 프로덕트 차원에서 다크모드 대응이 강제되는 경우에는 배경을 #121212로 전환하고, 컨테이너의 외곽선을 네온 컬러(2px solid #FFE500)로 치환하며 내부 텍스트를 #FFFFFF로 통일하는 '사이버-Y2K' 테마로 전환한다.

| 전경색 (Text/Icon) | 배경색 (Background) | 명도 대비율 | WCAG AA 적합 여부 (일반/대형) | 설계 판정 및 가이드 |
| :---- | :---- | :---- | :---- | :---- |
| #000000 (Black) | #FFE500 (Yellow) | **16.46:1** | 적합 (AAA) | 권장. 옐로우 컨테이너 내부 텍스트 기본값 |
| #FFFFFF (White) | #FFE500 (Yellow) | **1.28:1** | **부적합 (Fail)** | **절대 사용 금지 (심각한 판독 불가)** |
| #000000 (Black) | #FF4D8D (Neo-Pink) | **6.70:1** | 적합 (AAA) | 권장. 핑크 배경 위 모든 UI 텍스트 |
| #FFFFFF (White) | #FF4D8D (Neo-Pink) | **3.14:1** | 18pt 이상 대형만 적합 | 18pt 미만 본문 텍스트 사용 금지 |
| #000000 (Black) | #0CEFD3 (Mint 2.0) | **14.30:1** | 적합 (AAA) | 권장. 배민 2.0 권장 표준 조합 |
| #FFFFFF (White) | #0CEFD3 (Mint 2.0) | **1.47:1** | **부적합 (Fail)** | **절대 사용 금지 (명시적 안티패턴)** |
| #000000 (Black) | #2CE69B (Acid Green) | **12.90:1** | 적합 (AAA) | 권장. 리워드 태그 및 배지 |
| #FFFFFF (White) | #2CE69B (Acid Green) | **1.63:1** | **부적합 (Fail)** | **절대 사용 금지** |
| #000000 (Black) | #FFFDF8 (Cream) | **20.66:1** | 적합 (AAA) | 권장. 메인 뷰포트 기본 본문 텍스트 |
| #7B2CBF (Purple) | #FFFFFF (White) | **7.11:1** | 적합 (AAA) | 권장. 화이트 카드 내 보조 타이틀 |

위 명도 대비 분석에서 입증되듯, 고채도 옐로우나 민트 바탕 위에 습관적으로 흰색 텍스트를 배치하는 행위는 대비율이 1.28~1.47:1까지 추락하여 접근성을 심각하게 파괴한다. 따라서 고채도 컨테이너 내부의 전경색은 반드시 짙은 먹색으로 강제되어야 한다.

## 5. 타이포그래피 사양 및 서체 라이선스

배달의민족은 2012년 한나체를 시작으로 주아체, 도현체, 을지로체 등 복고풍 디스플레이 글꼴을 연이어 발표하며 B급 브랜드 정체성을 선도했다. 그러나 서비스가 일상 인프라로 격상된 현시점에서는 코어 UI에서 해당 서체들을 찾아볼 수 없다. 획의 두께가 불균일하고 글자 폭이 넓은 디스플레이 글꼴은 모바일 뷰포트의 좁은 컴포넌트(메뉴 리스트, 옵션 선택기, 주문서)에서 가독성을 저해하고 화면 공간을 과도하게 점유하기 때문이다. 이에 따라 배민은 2024~2025년 한글 빗침획을 블록 형태로 단순화한 가독성 중심의 전용 글꼴 ‘배민 WORK체’를 개발하여 앱 전반에 적용하였다. 구형 한나체와 주아체는 이벤트 배너, 선물하기 메시지 카드, 리뷰 스티커 등 마케팅 감성 표현 영역으로 적용 범위가 엄격히 제한되었다.  
디지털 프로덕트에 키치 톤앤매너를 부여할 때 활용 가능한 주요 상업용 무료 한글 디스플레이 서체의 법적 라이선스 규격은 다음과 같다.

| 서체명 | 배포처/권리자 | 서체 특징 | 웹 임베딩 (@font-face) | 상업적 이용 및 제한 사항 | 라이선스 공식 원문 URL |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **배달의민족 한나체 Pro / 주아체 / 을지로체** | ㈜우아한형제들 | 간판 글씨 기반, 둥글고 친근한 붓글씨 및 복고풍 | **허용** (WOFF 웹폰트 변환 탑재 가능) | 개인·기업 무료 상업 이용 가능. 단, 폰트 파일 자체의 유료 판매 금지. SIL OFL 1.1 적용 | https://www.woowahan.com/fonts/license |
| **여기어때 잘난체 / 잘난체 고딕** | ㈜여기어때컴퍼니 | 네모틀 구조, 굵은 획과 달리는 듯한 곡선 자음 | **조건부 허용** (임베딩 및 번들 가능, 출처 표기 권장) | 상업적 인쇄·광고·CI/BI 허용. 단, 서체 파일의 유료 판매 및 임의 수정 재배포 금지 | https://gccompany.co.kr/font |
| **던파 비트비트체 v2** | ㈜네오플 / 넥슨 | 8비트 도트 픽셀 아트 기반의 고해상도 계단형 조형 | **허용** (소프트웨어 및 웹 임베딩 가능) | 상업적 무료 사용 가능. 단, 서체 단독 판매 금지 및 **CI/BI(사명/로고) 사용 명시적 금지** | https://brand.nexon.com/ko/ci-brand-guidelines/typeface |
| **쿠키런체 (CookieRun)** | 데브시스터즈㈜ | 볼륨감 있는 라운드 볼드, 모험적이고 귀여운 인상 | **조건부 허용** (비게임 웹/앱 소프트웨어 탑재 가능) | 개인·기업 무료. **단, 게임 산업군(PC/모바일)에서의 상업적/비상업적 사용 전면 금지** | https://www.cookierunfont.com |
| **넥슨 메이플스토리체** | ㈜넥슨코리아 | 메이플스토리 로고 모티브의 통통하고 장난스러운 획 | **허용** (웹폰트 및 프로그램 탑재 허용) | 개인·기업 상업적 무료. 폰트 단독 판매 금지, 공공질서 위반 매체 사용 금지 | https://levelup.nexon.com/font |

타이포그래피 시스템은 헤드라인과 본문의 서체를 분리하는 하이브리드 페어링 방식을 전제로 구성한다.

* **Display (Hero Title)**: 36px ~ 44px (Line-height: 120%, Letter-spacing: -0.03em, Weight: Bold/Black, 디스플레이 서체 전용)  
* **H1 (Section Header)**: 26px ~ 30px (Line-height: 130%, Letter-spacing: -0.02em, Weight: Bold, 디스플레이 서체 권장)  
* **H2 (Card Header)**: 20px ~ 22px (Line-height: 135%, Letter-spacing: -0.01em, Weight: SemiBold, 디스플레이 또는 볼드 고딕)  
* **Body Large**: 16px (Line-height: 150%, Letter-spacing: -0.005em, Weight: Medium, **반드시 Pretendard 등 시스템 산세리프 강제**)  
* **Body Regular**: 14px (Line-height: 150%, Letter-spacing: 0, Weight: Regular, **반드시 시스템 산세리프 강제**)  
* **Caption / Meta**: 12px (Line-height: 140%, Letter-spacing: 0, Weight: Regular)  
* **제목 대 본문 대비 비율**: 약 2.2:1 (토스 스타일의 1.6:1 대비 현격하게 과장된 시각적 대비를 형성하여 주목도를 확보함)

## 6. 레이아웃과 UI 컴포넌트 스펙

키치·B급 스타일의 컴포넌트 조형은 디지털 화면 위에 종이나 플라스틱 블록을 물리적으로 배치한 듯한 네오브루탈리즘의 역학을 계승한다.  
공간 구조는 8pt 그리드 시스템을 기반으로 모바일 뷰포트 좌우 마진을 16px 또는 20px로 고정하고, 내부 여백은 4px, 8px, 12px, 16px, 24px, 32px 단위로 전개한다. 요소 간의 경계는 소프트 그림자 대신 명확한 블랙 외곽선과 흐림 없는 오프셋 그림자로 규정된다.  
카드 컨테이너는 12px의 모서리 라운딩(선택적으로 대각선 모서리만 16px/4px로 깎는 비대칭 처리 가능)과 2px solid #121212 테두리, 그리고 4px 4px 0px #121212의 솔리드 하드 그림자를 기본 형태로 취한다. 내부 패딩은 16px에서 20px로 설정하여 콘텐츠의 응집도를 높인다.  
주요 액션 버튼은 8px 라운딩 또는 999px의 완전한 알약형(Pill) 구조를 채택하며, 2px solid #121212 테두리에 사이버 옐로우(#FFE500) 배경을 부여한다. 평상시에는 3px 3px 0px #121212 그림자가 유지되지만, 사용자가 누르는 순간(Active/Pressed) 요소를 ⟦그림 1⟧ 축으로 각 2px 이동시키고 그림자를 1px로 줄여 물리적 스위치가 실제로 딸깍 눌리는 촉각적 피드백을 제공한다.  
리스트 아이템은 항목 간 단순 구분선 대신 개별 아이템을 독립된 카드 블록으로 분리하거나, 경계면에 1.5px solid #121212 실선 또는 2px dashed #E5DFC9 점선을 적용하여 캐주얼한 메모지의 인상을 전달한다.  
하단 내비게이션 바는 높이 64px(홈 인디케이터 영역 제외)에 2px solid #121212 상단 보더를 부여하고 흰색 표면을 유지한다. 활성화된 탭은 일반적인 색상 전환에 그치지 않고, 아이콘 배면에 직경 10px의 노란색 스티커 원형을 띄우거나 미니 캐릭터 배지가 통통 튀는 인터랙션으로 현재 위치를 알린다.  
입력 폼은 높이 48px, 8px 라운딩, 2px solid #121212 테두리를 기본값으로 갖는다. 포커스 상태에서는 일반적인 블루 링 대신 border-color: #121212를 유지한 채 3px 3px 0px #0CEFD3의 민트색 하드 오프셋 그림자가 즉각 형성되도록 설계하여 브랜드 특유의 위트를 컴포넌트 상태 변화에 투영한다.

## 7. 이미지·일러스트·아이콘

사진 에셋은 현실 세계의 사실성을 인터페이스의 만화적 문법과 동기화하기 위해 누끼 컷아웃(Cut-out) 처리를 기본으로 한다. 피사체의 배경을 완전 제거한 후 외곽선에 2px~3px 두께의 흰색 또는 옐로우 솔리드 스트로크를 둘러 가위로 오려낸 실물 스티커의 질감을 재현한다. 색보정 시에는 채도와 명도를 일반적인 커머스 기준보다 10~15% 인위적으로 증폭시켜 화면 전반의 키치한 톤앤매너와 조화를 이루도록 유도한다.  
일러스트레이션은 인물의 해부학적 비례나 사물의 원근법을 과장되게 왜곡하는 2D 카툰 및 두들(Doodle) 화풍을 표준으로 삼는다. 긴 팔다리와 단순화된 눈코입, 굵은 외곽선(2px 이상)이 특징이며, 무표정하고 차분한 테크 기업형 일러스트와 대조적으로 익살스러움, 당황함, 통쾌함 등의 극적인 표정을 가감 없이 노출한다.  
아이콘은 라인과 채움이 혼합된 Filled & Heavy Stroke 방식을 채택한다. 스트로크 굵기는 모바일 기준 2.0px~2.5px로 유지하며 끝점과 꺾임점은 부드러운 라운드(Round Cap, Round Join)로 처리해 날카로움을 지운다. 특히 정형화된 시스템 기호에 머물지 않고 여행, 쇼핑, 축하 맥락에 어울리는 딩뱃(Dingbat) 그래픽을 적극적으로 믹스하여 시각적 리듬감을 부여한다.  
실무에 즉시 투입 가능한 라이선스 검증 무료 오픈소스 자산은 다음과 같다.

| 자산명 | 제작자/제공처 | 형식 및 특성 | 라이선스 |
| :---- | :---- | :---- | :---- |
| **Open Peeps** | Pablo Stanley | 손그림 낙서풍 캐릭터 두들 라이브러리 (표정, 의상, 포즈 조합) | CC0 1.0 Universal (퍼블릭 도메인, 상업 이용 가능) |
| **Humaaans** | Pablo Stanley | 믹스앤매치 2D 플랫 일러스트레이션 자산 | CC0 1.0 Universal |
| **Lucide Icons** | Lucide Community | 스트로크 두께(Stroke width)를 2.5px로 커스텀 가능한 굵은 라인 아이콘 | MIT License |
| **Phosphor Icons** | Phosphor Team | Duotone 및 Bold 가중치를 기본 지원하는 시스템 아이콘 셋 | MIT License |

## 8. 모션 및 인터랙션

토스 스타일이 250~300ms의 차분한 감속 곡선(Ease-out)을 바탕으로 매끄러운 화면 부유감을 연출한다면, 키치·B급 스타일의 모션은 기계적 스위치의 반발력과 만화적 탄성(Spring)을 핵심 조형 언어로 삼는다.  
모션의 기본 문법은 크기가 순간적으로 커졌다가 제자리로 돌아오는 스냅 팝인(Snap Pop-in)과 시선을 유도하기 위해 끊임없이 흔들리는 위글(Wiggle)로 구성된다. 요소가 등장할 때 70% 스케일에서 105%로 팽창한 뒤 정규 크기로 수납되는 오버슈트 인터랙션을 통해 활기찬 인상을 준다. 혜택 수령이나 확인 버튼 등 즉각적인 조작이 필요한 영역에는 2~3도 내외로 좌우 진동하는 루프 애니메이션을 적용해 클릭을 유도한다.

| 모션 유형 | 지속 시간 (Duration) | CSS Easing / Spring Curve | 인터랙션 맥락 |
| :---- | :---- | :---- | :---- |
| **Button Press (Click)** | 80ms ~ 100ms | cubic-bezier(0.2, 0, 0, 1) | 물리 스위치가 딸깍이며 눌리는 즉각적인 촉각 피드백 |
| **Sticker Pop-in** | 180ms ~ 220ms | cubic-bezier(0.34, 1.56, 0.64, 1) | 156% 수준의 오버슈트가 발생하는 경쾌한 팝핑 효과 |
| **Badge Wiggle Loop** | 400ms (Loop) | ease-in-out (Keyframes: ⟦그림 2⟧) | 주의를 집중시켜야 하는 쿠폰 받기, 이벤트 배지 |
| **Card Dismiss (Swipe)** | 150ms | cubic-bezier(0.4, 0, 1, 1) | 화면 밖으로 휙 던져지듯 사라지는 스냅 아웃 모션 |

이러한 모션 곡선은 100ms 안팎의 초단기 반응과 200ms 전후의 탄성 반동을 결합하여, 사용자로 하여금 디지털 인터페이스가 아닌 실제 만화 속 물리 오브젝트를 다루고 있다는 심리적 즐거움을 체감하게 한다.

## 9. 적합 및 부적합 분야

키치·일러스트·B급 스타일의 적용 타당성은 서비스 도메인과 화면이 요구하는 ‘이해관계의 위험도(Stakes)’에 의해 결정된다.  
인앱 농장 육성 게임, 출석 보상 룰렛, 선착순 럭키드로우처럼 사용자의 반복 방문과 가벼운 소비가 목적인 게이미피케이션 커머스 화면은 본 스타일이 가장 큰 효과를 발휘하는 영역이다. 올웨이즈의 ‘올팜’이 입증하듯, 만화적 비주얼과 직관적인 보상 피드백은 사용자의 유희적 몰입을 극대화하여 체류 시간을 극적으로 증대시킨다. 또한 10대 청소년을 타깃으로 하는 금융 버티컬(카카오뱅크 mini)이나 동네 생활 커뮤니티(당근)처럼 친밀감 형성이 핵심 가치인 화면, 그리고 404 에러나 검색 결과 없음 화면처럼 실패 상황의 당혹감을 유쾌하게 해소해야 하는 전환 지점에 매우 적합하다.  
반면 고액 송금, 대출 심사, 투자 체결, 자산 관리 등 자본의 실질적 이동이나 법적 채무 관계가 발생하는 핵심 금융 여정에는 절대적으로 부적합하다. 아울러 결제 승인 실패, 계정 잠김, 보안 인증 경고처럼 사용자 자산의 안전성이 불확실해지는 중대 오류 화면, 그리고 데이터의 정밀한 판독이 생명인 B2B 엔터프라이즈 관리자 대시보드에서는 본 스타일의 사용을 원천 차단해야 한다.  
금융, 결제, 오류 화면에서 장난스러운 톤이 브랜드 신뢰를 훼손하는 경계는 UX 라이팅과 비주얼 톤의 핵심적인 실패 사례를 통해 실증된다. 카드 결제 승인 오류나 잔액 부족 상황에서 땀 흘리는 캐릭터와 함께 "앗! 통장이 텅텅 비었거나 카드가 낮잠을 자고 있네요!"와 같은 말장난 카피를 노출하는 경우가 대표적이다. 사용자는 거래 실패 상황에서 ‘실제 내 계좌에서 돈이 빠져나갔는가? 시스템 오류로 금융 사고가 발생한 것은 아닌가?’라는 강한 공포를 느끼게 되는데, 이때 제공되는 농담 섞인 문구는 브랜드가 고객의 자산을 조롱하거나 가볍게 여긴다는 치명적인 반발심을 부른다. 비밀번호 오입력 시 "머릿속 지우개가 작동했나요?" 식의 메시지를 띄우는 것 역시 보안 시스템의 안정성에 심각한 의구심을 품게 만든다.  
따라서 프로덕트의 위험도가 높아질수록 비주얼의 장식성과 마이크로카피의 위트 볼륨은 '0'으로 수렴해야 한다. 결제 오류 화면에서는 캐릭터를 완전히 소거하고 "결제가 정상적으로 완료되지 않았습니다. 금액이 출금되지 않았으니 안심하세요"라는 객관적 사실과 "다른 카드로 결제하기"라는 명확한 복구 경로만을 제공하는 것이 금융 프로덕트의 기본 원칙이다. 배달의민족과 토스 역시 프로모션 영역에서는 파격적인 B급 카피를 구사하더라도, 최종 결제창과 인증 에러 화면에서는 시스템 폰트 기반의 무채색 인터페이스와 건조한 정보 전달 문구만을 엄격히 고수하고 있다.

## 10. 접근성 및 사용성 함정

키치·B급 스타일이 양산하는 대표적인 사용성 결함과 이를 제어하기 위한 설계 기준값은 다음과 같다.  
첫째, 고채도 파스텔 및 형광 배경 위에서 발생하는 텍스트 대비의 붕괴다. 시각적 주목을 끌기 위해 #FFE500(사이버 옐로우)이나 #0CEFD3(민트) 배경 위에 습관적으로 흰색 텍스트를 얹는 실수가 빈번하게 발생한다. 실측 결과 옐로우 위 화이트는 명도비가 1.28:1에 불과하며 민트 위 화이트 역시 1.47:1로 수렴하여 WCAG AA 최소 기준(⟦그림 3⟧)에 처참하게 미달한다. 이는 저시력자뿐 아니라 야외 직사광선 환경의 모든 사용자에게 심각한 정보 차단을 초래한다. 따라서 이러한 고채도 컨테이너 위에는 반드시 #000000 또는 #121212 텍스트만 허용되도록 컴포넌트 레벨에서 하드코딩해야 한다.  
둘째, 장식용 디스플레이 폰트의 본문 오용에 따른 판독성 저하다. 주아체, 잘난체, 던파 비트비트체와 같은 글꼴은 16px 미만의 작은 크기로 렌더링될 때 획이 서로 뭉개지며 글자 간 판독 속도가 표준 산세리프 대비 20~35% 지연되는 현상을 낳는다. 이에 따라 타이포그래피 시스템은 18px 미만의 모든 본문, 폼 레이블, 캡션에 대해 Pretendard, Apple SD 산돌고딕 Neo, Roboto 등 시스템 기본 폰트로 강제 폴백(Fallback)되도록 설계 규칙을 강제해야 한다.  
셋째, 하드 드롭 섀도우 영역의 터치 타깃 오인 현상이다. 버튼이나 카드 하단에 4px 4px 0px #121212와 같은 블러 없는 단단한 그림자를 부여할 때, 사용자는 이 그림자 돌출부 역시 누를 수 있는 물리적 버튼의 일부로 인지하고 탭하게 된다. 이때 실제 인터랙티브 엘리먼트의 바운딩 박스가 본체 영역에만 한정되어 있으면 탭 미스가 발생한다. 시각적 외형과 관계없이 모든 대화형 요소는 최소 ⟦그림 4⟧ (Android 기준 ⟦그림 5⟧) 이상의 투명 터치 히트 영역(Hit Area)을 확보해야 하며, 그림자 오프셋 범위를 포함하는 패딩을 설정해야 한다.  
넷째, 과도한 시각 자극의 중첩으로 인한 정보 위계의 와해(Visual Clutter)와 배너 무시(Banner Blindness) 현상이다. 단일 뷰포트 내에 여러 개의 스티커, 회전된 배지, 원색 블록이 동시다발적으로 경쟁할 경우 사용자는 어디가 중요한 액션 포인트인지 판단하지 못하고 인지 과부하를 겪게 된다. 따라서 단일 화면 내에서 키치한 디스플레이 요소는 메인 헤더 그래픽 또는 핵심 CTA 버튼 1개로 제한하고, 나머지 보조 데이터 영역은 차분한 먹색 라인과 무채색 배경으로 눌러주어 시각적 닻(Visual Anchor)을 안정적으로 유지해야 한다.

## 11. 설계 토큰 초안 (Design Tokens JSON)

W3C Design Tokens Community Group (DTCG) 규격을 준수한 설계 토큰 초안이다.

JSON  
{  
  "color": {  
    "background": {  
      "base": { "value": "#FFFDF8", "type": "color" },  
      "surface": { "value": "#FFFFFF", "type": "color" },  
      "neutral-subtle": { "value": "#F4EEDD", "type": "color" }  
    },  
    "ink": {  
      "primary": { "value": "#121212", "type": "color" },  
      "secondary": { "value": "#767676", "type": "color" },  
      "inverse": { "value": "#FFFFFF", "type": "color" }  
    },  
    "accent": {  
      "yellow": { "value": "#FFE500", "type": "color" },  
      "pink": { "value": "#FF4D8D", "type": "color" },  
      "mint": { "value": "#0CEFD3", "type": "color" },  
      "green": { "value": "#2CE69B", "type": "color" },  
      "purple": { "value": "#7B2CBF", "type": "color" }  
    }  
  },  
  "typography": {  
    "fontFamily": {  
      "display": { "value": "'BMJUA', 'Jalnan', sans-serif", "type": "fontFamily" },  
      "body": { "value": "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", "type": "fontFamily" }  
    },  
    "scale": {  
      "display": {  
        "fontSize": { "value": "36px", "type": "dimension" },  
        "lineHeight": { "value": ".2", "type": "number" },  
        "letterSpacing": { "value": "-0.03em", "type": "dimension" },  
        "fontWeight": { "value": "900", "type": "fontWeight" }  
      },  
      "h1": {  
        "fontSize": { "value": "26px", "type": "dimension" },  
        "lineHeight": { "value": ".3", "type": "number" },  
        "letterSpacing": { "value": "-0.02em", "type": "dimension" },  
        "fontWeight": { "value": "700", "type": "fontWeight" }  
      },  
      "body-large": {  
        "fontSize": { "value": "16px", "type": "dimension" },  
        "lineHeight": { "value": ".5", "type": "number" },  
        "letterSpacing": { "value": "-0.005em", "type": "dimension" },  
        "fontWeight": { "value": "500", "type": "fontWeight" }  
      },  
      "body-regular": {  
        "fontSize": { "value": "14px", "type": "dimension" },  
        "lineHeight": { "value": ".5", "type": "number" },  
        "letterSpacing": { "value": "0", "type": "dimension" },  
        "fontWeight": { "value": "400", "type": "fontWeight" }  
      },  
      "caption": {  
        "fontSize": { "value": "12px", "type": "dimension" },  
        "lineHeight": { "value": ".4", "type": "number" },  
        "letterSpacing": { "value": "0", "type": "dimension" },  
        "fontWeight": { "value": "400", "type": "fontWeight" }  
      }  
    }  
  },  
  "spacing": {  
    "unit-1": { "value": "4px", "type": "dimension" },  
    "unit-2": { "value": "8px", "type": "dimension" },  
    "unit-3": { "value": "12px", "type": "dimension" },  
    "unit-4": { "value": "16px", "type": "dimension" },  
    "unit-6": { "value": "24px", "type": "dimension" },  
    "unit-8": { "value": "32px", "type": "dimension" }  
  },  
  "borderRadius": {  
    "none": { "value": "0px", "type": "dimension" },  
    "sm": { "value": "4px", "type": "dimension" },  
    "md": { "value": "8px", "type": "dimension" },  
    "lg": { "value": "12px", "type": "dimension" },  
    "pill": { "value": "999px", "type": "dimension" }  
  },  
  "border": {  
    "solid-ink": {  
      "width": { "value": "2px", "type": "dimension" },  
      "style": { "value": "solid", "type": "string" },  
      "color": { "value": "{color.ink.primary.value}", "type": "color" }  
    }  
  },  
  "shadow": {  
    "hard-sm": {  
      "value": { "x": "2px", "y": "2px", "blur": "0px", "spread": "0px", "color": "{color.ink.primary.value}" },  
      "type": "boxShadow"  
    },  
    "hard-md": {  
      "value": { "x": "4px", "y": "4px", "blur": "0px", "spread": "0px", "color": "{color.ink.primary.value}" },  
      "type": "boxShadow"  
    },  
    "hard-lg": {  
      "value": { "x": "6px", "y": "6px", "blur": "0px", "spread": "0px", "color": "{color.ink.primary.value}" },  
      "type": "boxShadow"  
    }  
  },  
  "motion": {  
    "duration": {  
      "instant": { "value": "80ms", "type": "duration" },  
      "quick": { "value": "150ms", "type": "duration" },  
      "bouncy": { "value": "220ms", "type": "duration" }  
    },  
    "easing": {  
      "tactile": { "value": "cubic-bezier(0.2, 0, 0, 1)", "type": "cubicBezier" },  
      "spring-overshoot": { "value": "cubic-bezier(0.34, 1.56, 0.64, 1)", "type": "cubicBezier" }  
    }  
  }  
}

## 12. 불확실·의견이 갈리는 것

게이미피케이션 인앱 피처의 트래픽 견인 효과와 실제 사업적 순이익(LTV) 기여도 사이에는 업계 내 첨예한 시각차가 존재한다. 올웨이즈는 ‘올팜’ 출시 이후 1천만 명 이상의 가입자를 확보하고 국내 커머스 앱 중 일평균 사용 시간 1위를 달성하는 등 폭발적인 외형 성장을 기록했다. 그러나 이러한 체류 시간 증가가 고단가 상품의 실질적 결제 전환율(CVR)로 이어지는지에 대해서는 회의론이 상존한다. 실제 농작물 보상만을 수령하고 이탈하는 ‘체리피커’ 유저층의 급증으로 인해 물류비와 상품 소싱 비용이 누적되어 단위 경제성(Unit Economics)이 악화된다는 지적이 제기되고 있으나, 이에 대한 플랫폼별 순이익 개선 기여도는 공식 회계 데이터로 검증되지 않아 불확실성이 크다.  
브랜드 고유의 차별화 확보와 디자인 시스템 유지보수 비용 간의 충돌 역시 논쟁적이다. 획일화된 모던 미니멀리즘에 피로감을 느끼는 사용자들에게 키치하고 생동감 넘치는 비주얼 언어가 강력한 팬덤과 브랜드 회상도를 제공한다는 주장이 있는 반면, 하드 섀도우와 원색 테두리 기반의 컴포넌트는 재사용성이 떨어지고 다크모드 대응 복잡도를 가중시킨다는 비판이 팽팽히 맞선다. 유행 주기(Trend Cycle)가 2~3년에 불과한 B급 스타일을 디자인 시스템 레벨에 영구 반영할 경우, 차기 리브랜딩 시 시스템 전면 재구축에 따른 막대한 엔지니어링 비용이 발생한다는 기술적 우려가 지속되고 있다.  
마지막으로 디스플레이 웹폰트 경량화(Subsetting)와 완성형 한글 글리프의 기술적 상충 이슈가 존재한다. 한글 11,172자를 온전히 수록한 OTF/TTF 폰트는 용량이 1.5MB~2.5MB에 달해 모바일 웹 환경의 최대 콘텐츠 페인트(LCP)를 심각하게 저하시킨다. 이를 방지하고자 KS X 1001 표준 2,350자로 서브셋 경량화를 단행할 경우, 사용자가 작성하는 리뷰, 닉네임, 유행어(예: '띱', '뷁', '존맛') 등에서 시스템 기본 고딕으로 글자가 튀는 글리프 깨짐(FOUT/Tofu) 현상이 불가피하게 발생한다. 이로 인해 사용자 생성 콘텐츠(UGC)가 활성화된 모바일 웹 뷰에서 디스플레이 서체의 적용 경계를 어디까지 한정해야 하는가에 대한 프론트엔드 엔지니어링 표준은 아직 확립되지 못한 상태다.

#### 참고 자료

> 1. 2024년 웹페이지 UI/UX 디자인의 최신 트렌드 - MOKKOZI.COM, [https://mokkozi.com/hsj/bbs/board.php?bo_table=UIUX&wr_id=21](https://mokkozi.com/hsj/bbs/board.php?bo_table=UIUX&wr_id=21)  
> 2. Baemin (배달의민족) 디자인 시스템 — 컬러·타이포 - 오빠두엑셀, [https://www.oppadu.com/tools/design-systems-site/brand/baemin.html](https://www.oppadu.com/tools/design-systems-site/brand/baemin.html)  
> 3. 플랫폼 체류 시간늘리는 '게이미피케이션' 열풍, 알고 계신가요? - 10월호, [https://stibee.com/api/v1.0/emails/share/t8toZFYa7g1n8EQWT3xhMCISa4diTrU](https://stibee.com/api/v1.0/emails/share/t8toZFYa7g1n8EQWT3xhMCISa4diTrU)  
> 4. [2025 KDA Winner] 기업가치혁신상 우아한형제들 - 월간 디자인, [https://design.co.kr/article/140088/](https://design.co.kr/article/140088/)  
> 5. 배민체 – 배달의민족 브랜드 감성을 담은 개성 있는 디스플레이 한글, [https://freefont100.com/baemin-font/](https://freefont100.com/baemin-font/)  
> 6. 배민 앱 출시 15주년 맞아 리브랜딩 착수… 앱아이콘 ... - 우아한형제들, [https://www.woowahan.com/report/detail/975?page=1](https://www.woowahan.com/report/detail/975?page=1)  
> 7. 배달의민족, 15년 만에 '배민 2.0' 리브랜딩 - 디자인 나침반, [https://designcompass.org/2025/07/23/baemin-2-rebranding/](https://designcompass.org/2025/07/23/baemin-2-rebranding/)  
> 8. 올웨이즈 - 올팜, [https://weeklyuxuichallenge.oopy.io/24503fa5-6086-4255-9e98-32b5f583b064](https://weeklyuxuichallenge.oopy.io/24503fa5-6086-4255-9e98-32b5f583b064)  
> 9. 쿠팡·네이버.. 이커머스 3위는 토스쇼핑? | 큐레터 - Daum, [https://v.daum.net/v/5Sf66cTNrI](https://v.daum.net/v/5Sf66cTNrI)  
> 10. 10대용 '카카오뱅크 미니' 나왔다…'니니즈' 카드 뭘 고를까 - 아이뉴스24, [http://www.inews24.com/view/1308280](http://www.inews24.com/view/1308280)  
> 11. 청소년 리딩뱅크 된 카카오뱅크 미니…금융 넘어 문화로 - 한국경제, [https://www.hankyung.com/article/2020122570371](https://www.hankyung.com/article/2020122570371)  
> 12. 여기어때 잘난체 | 눈누 - 상업용 무료 한글 폰트, [https://noonnu.cc/font_page/115](https://noonnu.cc/font_page/115)  
> 13. 당근, 새 캐릭터 '단추'와 '앙리' 공개 - 뉴스탭, [https://www.newstap.co.kr/news/articleView.html?idxno=222070](https://www.newstap.co.kr/news/articleView.html?idxno=222070)  
> 14. 당근, 새 마스코트 '단추'와 '앙리' 공개... 본격적인 캐릭터 사업 시동 걸기?, [https://ditoday.com/%EB%8B%B9%EA%B7%BC-%EC%83%88-%EB%A7%88%EC%8A%A4%EC%BD%94%ED%8A%B8-%EB%8B%A8%EC%B6%94%EC%99%80-%EC%95%99%EB%A6%AC-%EA%B3%B5%EA%B0%9C-%EB%B3%B8%EA%B2%A9%EC%A0%81/](https://ditoday.com/%EB%8B%B9%EA%B7%BC-%EC%83%88-%EB%A7%88%EC%8A%A4%EC%BD%94%ED%8A%B8-%EB%8B%A8%EC%B6%94%EC%99%80-%EC%95%99%EB%A6%AC-%EA%B3%B5%EA%B0%9C-%EB%B3%B8%EA%B2%A9%EC%A0%81/)  
> 15. 왈라 | 깔끔한 디자인에 보안을 더한 대한민국 No.1 무료 설문 폼 - Walla, [https://home.walla.my/ko/](https://home.walla.my/ko/)  
> 16. 토스의 8가지 라이팅 원칙들 - 토스 테크, [https://toss.tech/article/21022](https://toss.tech/article/21022)  
> 17. 게이미피케이션을 넘어 아예 게임을 앱 속에 넣어버린 올웨이즈 - '올팜, [https://weeklyuxuichallenge.tistory.com/8](https://weeklyuxuichallenge.tistory.com/8)  
> 18. 금융앱 넘어 쇼핑 강자로…토스, 2800만 결제 데이터로 커머스 시장, [https://www.startupn.kr/news/articleView.html?idxno=51941](https://www.startupn.kr/news/articleView.html?idxno=51941)  
> 19. 중·고딩도 카뱅 쓴다…10대만의 '니니즈 카드' 등장 - 머니투데이, [https://www.mt.co.kr/finance/2020/10/19/2020101910471795983](https://www.mt.co.kr/finance/2020/10/19/2020101910471795983)  
> 20. 이것도 먹을 수 있다고?! 식재료 의인화로 만나는 신세계 프로젝트 🍽️, [https://www.jaenung.net/tree/24547](https://www.jaenung.net/tree/24547)  
> 21. 여기어때 잘난체, [https://gccompany.co.kr/font](https://gccompany.co.kr/font)  
> 22. 여기어때 잘난체 – 브랜드 감성을 살린 강렬한 디스플레이 한글 폰트, [https://freefont100.com/yeogi-eottae-jalnan/](https://freefont100.com/yeogi-eottae-jalnan/)  
> 23. Understanding tones of voice for better UX writing - LogRocket Blog, [https://blog.logrocket.com/ux-design/tones-of-voice-ux-writing/](https://blog.logrocket.com/ux-design/tones-of-voice-ux-writing/)  
> 24. 던파 비트비트체 v2 - 무료 한글 폰트 - 산돌구름, [https://www.sandollcloud.com/free-font/19491/DNF-Bit-Bit-v2](https://www.sandollcloud.com/free-font/19491/DNF-Bit-Bit-v2)  
> 25. 넥슨 카트 고딕 - NEXON Brand Identity Guide, [https://brand.nexon.com/ko/ci-brand-guidelines/typeface](https://brand.nexon.com/ko/ci-brand-guidelines/typeface)  
> 26. [unknown_url](http://docs.google.com/unknown_url)  
> 27. 배민 한나체 Air - 가늘지만 획이 살아있는 무료폰트 - 이미지아카이브, [https://imagearchive.tistory.com/entry/%EB%B0%B0%EB%AF%BC-%ED%95%9C%EB%82%98%EC%B2%B4-Air-%EA%B0%80%EB%8A%98%EC%A7%80%EB%A7%8C-%ED%9A%8D%EC%9D%B4-%EC%82%B4%EC%95%84%EC%9E%88%EB%8A%94-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8](https://imagearchive.tistory.com/entry/%EB%B0%B0%EB%AF%BC-%ED%95%9C%EB%82%98%EC%B2%B4-Air-%EA%B0%80%EB%8A%98%EC%A7%80%EB%A7%8C-%ED%9A%8D%EC%9D%B4-%EC%82%B4%EC%95%84%EC%9E%88%EB%8A%94-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8)  
> 28. 배달의 민족 주아체, 배민 폰트 사용가이드, [https://portalnum.com/76](https://portalnum.com/76)  
> 29. 배민 한나체 Pro - 무료 한글 폰트 - 산돌구름, [https://www.sandollcloud.com/free-font/626/BM-HANNA-Pro](https://www.sandollcloud.com/free-font/626/BM-HANNA-Pro)  
> 30. 붓글씨 느낌 폰트 모음 상업적 이용 가능한 무료 폰트, [https://ing0joo.tistory.com/70](https://ing0joo.tistory.com/70)  
> 31. 을지로체 | 눈누 - 상업용 무료 한글 폰트, [https://noonnu.cc/font_page/321](https://noonnu.cc/font_page/321)  
> 32. 배달의민족 글꼴 라이센스 정책 - 우아한형제들, [https://www.woowahan.com/fonts/license](https://www.woowahan.com/fonts/license)  
> 33. 여기어때 잘난체 고딕 - 솔직하고 경쾌하다! - All about {Web} - 티스토리, [https://wooin21.tistory.com/m/entry/%EC%86%94%EC%A7%81%ED%95%98%EA%B3%A0-%EA%B2%BD%EC%BE%8C%ED%95%9C-%EC%97%AC%EA%B8%B0%EC%96%B4%EB%95%8C-%EC%9E%98%EB%82%9C%EC%B2%B4-%EA%B3%A0%EB%94%95](https://wooin21.tistory.com/m/entry/%EC%86%94%EC%A7%81%ED%95%98%EA%B3%A0-%EA%B2%BD%EC%BE%8C%ED%95%9C-%EC%97%AC%EA%B8%B0%EC%96%B4%EB%95%8C-%EC%9E%98%EB%82%9C%EC%B2%B4-%EA%B3%A0%EB%94%95)  
> 34. 상업용 무료 한글 폰트 여기어때 잘난체 다운로드 - CreativePick, [https://creativepick.tistory.com/entry/%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C-%ED%95%9C%EA%B8%80-%ED%8F%B0%ED%8A%B8-%EC%97%AC%EA%B8%B0%EC%96%B4%EB%95%8C-%EC%9E%98%EB%82%9C%EC%B2%B4-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C](https://creativepick.tistory.com/entry/%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C-%ED%95%9C%EA%B8%80-%ED%8F%B0%ED%8A%B8-%EC%97%AC%EA%B8%B0%EC%96%B4%EB%95%8C-%EC%9E%98%EB%82%9C%EC%B2%B4-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C)  
> 35. 넥슨 무료 글꼴 다운로드 11종 총정리! | Peak, [https://peak.nexon.com/post/974](https://peak.nexon.com/post/974)  
> 36. 던파 비트비트체 | 눈누 - 상업용 무료 한글 폰트, [https://noonnu.cc/font_page/1043](https://noonnu.cc/font_page/1043)  
> 37. 쿠키런체 [한글날 무료폰트(7) : 2019년], [https://wooin21.tistory.com/entry/%EC%BF%A0%ED%82%A4%EB%9F%B0%EC%B2%B4-%ED%95%9C%EA%B8%80%EB%82%A0-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B87-2019%EB%85%84](https://wooin21.tistory.com/entry/%EC%BF%A0%ED%82%A4%EB%9F%B0%EC%B2%B4-%ED%95%9C%EA%B8%80%EB%82%A0-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B87-2019%EB%85%84)  
> 38. 쿠키런체(Cookie Run) - 상업용 무료폰트, 다운로드 - 지식저장고, [https://auvoleur.tistory.com/entry/%EC%BF%A0%ED%82%A4%EB%9F%B0%EC%B2%B4Cookie-Run-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C](https://auvoleur.tistory.com/entry/%EC%BF%A0%ED%82%A4%EB%9F%B0%EC%B2%B4Cookie-Run-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C)  
> 39. [무료폰트] 귀여운 POP느낌의 폰트 '쿠키런 폰트' - 유미소 블로그 :), [https://smileyoo.tistory.com/entry/%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EA%B7%80%EC%97%AC%EC%9A%B4-POP%EB%8A%90%EB%82%8C%EC%9D%98-%ED%8F%B0%ED%8A%B8-%EC%BF%A0%ED%82%A4%EB%9F%B0-%ED%8F%B0%ED%8A%B8](https://smileyoo.tistory.com/entry/%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EA%B7%80%EC%97%AC%EC%9A%B4-POP%EB%8A%90%EB%82%8C%EC%9D%98-%ED%8F%B0%ED%8A%B8-%EC%BF%A0%ED%82%A4%EB%9F%B0-%ED%8F%B0%ED%8A%B8)  
> 40. 쿠키런체 - 무료 한글 폰트 - 산돌구름, [https://www.sandollcloud.com/free-font/17911/CookieRun](https://www.sandollcloud.com/free-font/17911/CookieRun)  
> 41. 2021 상업용 무료폰트 추천 글씨체 다운로드 사이트 모음 - 매거진 VM, [https://magazinevm.com/2021-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EC%B6%94%EC%B2%9C-%EA%B8%80%EC%94%A8%EC%B2%B4-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%AA%A8%EC%9D%8C/](https://magazinevm.com/2021-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EC%B6%94%EC%B2%9C-%EA%B8%80%EC%94%A8%EC%B2%B4-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%AA%A8%EC%9D%8C/)  
> 42. 글꼴/목록/상업용, [https://m.namu.moe/w/%EA%B8%80%EA%BC%B4/%EB%AA%A9%EB%A1%9D/%EC%83%81%EC%97%85%EC%9A%A9](https://m.namu.moe/w/%EA%B8%80%EA%BC%B4/%EB%AA%A9%EB%A1%9D/%EC%83%81%EC%97%85%EC%9A%A9)  
> 43. 상업적 사용 가능한 무료 한글 폰트 사이트 모음, [https://boxwitch.tistory.com/entry/%EC%83%81%EC%97%85%EC%A0%81-%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%AC%B4%EB%A3%8C-%ED%95%9C%EA%B8%80-%ED%8F%B0%ED%8A%B8-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%AA%A8%EC%9D%8C](https://boxwitch.tistory.com/entry/%EC%83%81%EC%97%85%EC%A0%81-%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%AC%B4%EB%A3%8C-%ED%95%9C%EA%B8%80-%ED%8F%B0%ED%8A%B8-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%AA%A8%EC%9D%8C)  
> 44. How to Write Error Message Copy - Amelie Pollak, [https://www.ameliepollak.com/blog/how-to-write-error-message-copy](https://www.ameliepollak.com/blog/how-to-write-error-message-copy)  
> 45. 14 practical examples of good UX writing - Halo Lab, [https://www.halo-lab.com/blog/good-ux-writing-examples](https://www.halo-lab.com/blog/good-ux-writing-examples)  
> 46. Oops but Make It Professional: UX Writing for a 404 Error Page, [https://medium.com/design-bootcamp/oops-but-make-it-professional-ux-writing-for-a-404-error-page-4c498caee60a](https://medium.com/design-bootcamp/oops-but-make-it-professional-ux-writing-for-a-404-error-page-4c498caee60a)  
> 47. ux-writing — AI agent skill | explainx.ai, [https://explainx.ai/skills/content-designer/ux-writing-skill/ux-writing](https://explainx.ai/skills/content-designer/ux-writing-skill/ux-writing)  
> 48. 하이엔드 게이미피케이션으로 쇼핑몰을 폭발적으로 성장시키세요., [https://store.cafe24.com/story/3386](https://store.cafe24.com/story/3386)
