> **원문 보존본** — kr-ui-styles 팩 `dark-neon`이 사례·근거 조회용으로 싣는 리서치 보고서다. **Claude 딥 리서치 산출물**을 사용자가 2026-10-28 제공했다. 내보내기 흔적(이스케이프·단어와 hex 뒤 각주 번호)만 걷어냈고 내용은 고치지 않았다 — 각주 번호를 뺐으므로 참고 문헌 목록과의 대응은 사라졌다. 대비표 대부분의 출처(둘째 목록 17번)는 미확인 URL이어서 `dark-neon.md`가 공식으로 재계산한 값을 쓴다. 서체 라이선스는 `dark-neon.md` 표가 2026-10-28 공식 원문으로 다시 판정했다(JetBrains Mono는 원문의 Apache 2.0이 아니라 SIL OFL 1.1, 산돌 네모니2는 [상용 유료]로 제외). 팔레트 일부는 사례 서비스의 브랜드 색이라 팩은 기본값으로 쓰지 않는다. 규칙으로 쓸 것은 `dark-neon.md`·`dark-neon.tokens.json`이 갖는다 — 여기 문장을 그대로 규칙으로 인용하지 않는다.

# 2025~2026 한국 디지털 프로덕트의 다크·고대비·네온 인터페이스 설계 표준 리서치 보고서

## 판정: 이 스타일이 2025~2026년 한국에서 유의미한 흐름인가

2025~2026년 한국 디지털 프로덕트 환경에서 '다크·고대비·네온' 스타일은 모든 웹·앱에 무차별적으로 확산되는 범용 디자인 트렌드는 아니며, 특정 산업군을 중심으로 공고한 표준을 구축한 부분(도메인 특화 표준 정착)으로 판정한다. 토스(Toss)로 대표되는 절제된 기능주의—화이트 및 라이트 블루-그레이 계열 중립색과 단일 고채도 블루 액센트—는 일반 커머스, 공공 서비스, 모바일 뱅킹 등 대다수 대중 지향적 인터페이스에서 여전히 지배적인 디자인 시스템으로 작동하고 있다.  
그러나 비디오 스트리밍, 게이밍 및 e스포츠 전적 플랫폼, 실시간 가상자산 및 주식 트레이딩 시스템(WTS), 엔터테인먼트 미디어 서비스에서는 다크·고대비·네온 스타일이 단순한 시각적 유행을 넘어 서비스 본연의 가치를 전달하는 핵심 디자인 패러다임으로 자리 잡았다. 2023년 말부터 2025년 사이에 단행된 네이버 치지직의 공식 론칭, 아프리카TV의 SOOP 전면 리브랜딩, 토스증권 PC WTS 정식 출시, 업비트 및 빗썸의 차트 시스템 고도화 등 시장 지배적 플랫폼들이 연이어 이 스타일을 핵심 시각 언어로 전면 채택했다. 이는 주변 조도가 낮은 암전 환경에서의 미디어 시청 몰입감 확보, 수십 개의 수치가 초 단위로 갱신되는 화면에서의 정보 식별성 유지, 디스플레이 발광 효율을 극대화하려는 기능적 당위성이 맞물린 결과다. 결과적으로 이 스타일은 특정 도메인에서 대체 불가능한 시각 표준으로 분화·발전하고 있다.

## 대표 사례: 이 스타일을 쓰는 국내 서비스 5~10곳

국내 프로덕트에서 다크 스타일을 채택하는 방식은 크게 두 가지로 분류된다. 운영체제(OS)의 시스템 설정이나 야간 환경에 맞춰 기존 라이트 모드 레이아웃의 명도를 반전시켜 제공하는 **'다크모드 지원'** 모델과, 서비스 기획 초기부터 딥 블랙 및 차콜 캔버스를 전제로 정보 구조, 컴포넌트, 네온 컬러 시스템을 구축한 **'다크 기본 디자인(Dark-first)'** 모델이다.  
다크 기본 디자인은 캔버스 전체가 발광체 역할을 하지 않도록 억제함으로써 사용자가 콘텐츠(영상, 게임, 캔들스틱) 자체의 발색에 완전히 몰입하도록 유도한다. 반면 다크모드 지원 모델은 데이터 밀집도가 높은 업무 환경에서 사용자의 시각적 피로도를 선택적으로 완화하기 위한 기능적 확장으로 운용된다.

| 서비스명 | 업종 | 적용 화면 | 도입·개편 시기 | 디자인 분류 | 핵심 시각 요소 및 출처 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **치지직 (CHZZK)** | 게임·라이브 스트리밍 | 전 화면 (메인 탐색, 라이브 플레이어, 채팅 패널) | 2023.12 (베타) / 2024.05 (정식) | **다크 기본 (Dark-first)** | 딥 베이스(#141517), 시그니처 네온 그린(#00FFA3), 듀얼 라이브 링 그라데이션 |
| **SOOP (구 아프리카TV)** | 라이브 스트리밍 | 홈 피드, 라이브 스트리밍 룸, Catch 숏폼 UI | 2024.10 (전면 개편) | **다크 기본 (Dark-first)** | 딥 블랙 캔버스, 네온 청록 및 형광 블루 계열 인디케이터 배지 |
| **OP.GG** | e스포츠·게임 데이터 | 챔피언 분석 탭, 데스크톱 인게임 오버레이 | 2023~2024 (데스크톱 및 웹 리뉴얼) | **다크 기본 (Dark-first)** (앱) / 다크 지원 (웹) | 딥 다크 네이비(#1C1C1F), KDA 및 승률 데이터 시각화용 네온 시안·블루 |
| **토스증권 PC (WTS)** | 증권 트레이딩 | PC 웹 트레이딩 시스템 (멀티 차트, 오더북, 패널) | 2024.07 (정식 출시) | **다크모드 지원 (선택형 고도화)** | 딥 슬레이트 블랙 배경, 고밀도 데이터 그리드, 상승·하락 네온 컬러 보정 |
| **업비트 (Upbit)** | 가상자산 거래소 | 웹/모바일 거래소 차트, 호가창, 체결 내역창 | 2023~2024 (차트 엔진 개편) | **다크모드 지원 (선택형)** | 트레이딩 전용 다크 인터페이스, 캔들스틱 고채도 네온 발색 |
| **빗썸 (Bithumb)** | 가상자산 거래소 | 거래화면 차트 및 호가 주문 패널 (나이트 모드) | 2023~2024 (나이트 모드 고도화) | **다크모드 지원 (선택형)** | 원클릭 나이트 모드 토글, 고밀도 시계열 데이터 가독성 강화 |
| **왓챠 (WATCHA)** | OTT 비디오 스트리밍 | 홈 피드, 콘텐츠 상세 페이지, 비디오 플레이어 | 2023~2024 (디자인 시스템 고도화) | **다크 기본 (Dark-first)** | 순수 블랙에 근접한 배경, 시그니처 네온 핑크(#FF0558) 액션 버튼 |
| **알파스퀘어 (AlphaSquare)** | 스마트 주식 차트 | 올인원 발굴 차트, 재무 비율 분석 패널 | 2023~2024 (멀티차트 업데이트) | **다크모드 지원 (선택형)** | 딥 차콜 바탕, 기술적 지표 시각화용 고대비 멀티 네온 컬러선 |

해외 서비스와의 비교 관점에서 볼 때, 글로벌 금융 차트의 표준인 **TradingView**는 딥 차콜(#131722) 배경 위에서 네온 시안, 그린, 마젠타 지표선을 결합하여 수백 개의 지표가 중첩되어도 정보가 뭉개지지 않는 초고밀도 시계열 데이터 시각화의 정수를 보여준다. 음악 스트리밍 플랫폼 **Spotify**는 완전한 블랙(#121212, #000000) 캔버스에 형광 네온 그린(#1ED760) 단일 컬러로 인터랙션을 집중시킴으로써 앨범 아트워크 본연의 비주얼을 최전선으로 부각시키는 다크 기본 디자인의 글로벌 표준을 확립했다. 국내 대표 플랫폼들 역시 이와 유사하게 배경의 반사광을 극도로 억제하고 콘텐츠 본연의 발색을 끌어올리는 전략을 취하고 있다.

## 기본 스타일과의 차이

토스 계열의 절제된 기능주의가 여백과 면 분할을 통해 사용자의 인지 부하를 줄이는 인쇄물 기반의 모더니즘 시각 문법을 계승했다면, 다크·고대비·네온 스타일은 전문 계측 장비와 항공기 콕핏, 사이버네틱 콘솔에서 파생된 계측 인터페이스 문법을 따른다. 이로 인해 색채 계층, 깊이 표현, 컴포넌트 비례 등 디자인 시스템 전반의 7개 축에서 근본적인 차이가 발생한다.

| 디자인 축 | 토스 계열 절제된 기능주의 (기본 스타일) | 다크·고대비·네온 스타일 |
| :---- | :---- | :---- |
| **중립색** | 순백색(#FFFFFF) 및 블루-그레이 틴트 중립색 계열(#F2F4F6, #8B95A1, #333D4B, #191F28) | 퓨어 블랙 및 딥 차콜 계열(#000000, #0E0F10, #141517, #202224, #2E3033) |
| **강조색 구조** | 단일 고채도 브랜드 블루(예: #3182F6) 중심, 보조색 사용의 극단적 절제 | 고휘도 네온 단일~이중 조합(네온 그린 #00FFA3, 시안 #00F0FF, 핫핑크 #FF0558) 및 기능 배지 |
| **타이포그래피** | Pretendard 단일 서체, 넉넉한 자간(-0.3px), 중간 굵기(Medium/Bold) 중심 계층 구조 | 지오메트릭/볼드 디스플레이(산돌 네모니 등) + 본문 고가독성 산세리프, 세밀한 행간 제어 |
| **모서리 곡률** | 카드 16~20px, 버튼 12~16px의 유연하고 부드러운 유기적 라운딩 | 콤팩트한 4~8px(배지 4px, 버튼/입력 8px, 카드 8~12px), 날카롭고 기계적인 비례 |
| **깊이감 (그림자·레이어)** | 저채도 다층 소프트 그림자(box-shadow blur 20~40px)를 활용한 입체적 층위 표현 | 그림자를 배제하고 배경 면의 명도 차이(Surface Elevation)와 1px 보더 라인으로 평면 분할 |
| **이미지·일러스트** | 2D 파스텔 톤의 평면적 벡터 캐릭터, 밝은 인물 중심의 스톡 포토그래피 | 고대비 비디오 썸네일, 3D 글래스모피즘, 네온 림라이트, 어두운 배경에 용해되는 그라데이션 |
| **레이아웃 밀도** | 8pt 그리드 기반의 넉넉한 패딩(16~24px), 카드 간 분리가 확실한 저밀도 뷰 | 4pt/2pt 기반 고밀도 정보 패킹, 최소 마진(8~12px), 화면 분할 프레임 중심의 고밀도 뷰 |

## 색: 대표 팔레트, 명도 대비, 시세 관습 충돌 분석

다크 기본 인터페이스에서 중립색은 단순히 흰색을 반전시킨 회색이 아니라, 미세한 블루나 그린 틴트가 융합된 딥 차콜 계열로 조율된다. 면의 위계(Elevation)는 그림자가 아닌 서피스 컬러의 명도 단계를 통해 구축되며, 캔버스의 베이스에서 상위 팝오버로 올라갈수록 점진적으로 밝아진다.  
네온 강조색은 물리적 조명 환경의 '점등(ON)' 신호 역할을 부여받는다. 따라서 상시 노출되는 대형 배경 면이나 장문의 텍스트에 적용되지 않고, 토글 스위치 활성 상태, 비디오 스트리밍 채널의 활성 라이브 링, 즉각적인 반응이 필요한 주요 CTA(Call to Action) 버튼에 엄격히 제한되어 소비된다.

| 토큰 분류 | 토큰 식별자 | Hex 코드 | 인터페이스 적용 대상 및 역할 |
| :---- | :---- | :---- | :---- |
| **Surface** | surface-deep | #0E0F10 | 뷰포트의 가장 깊은 바탕, 외부 여백 영역 |
| **Surface** | surface-base | #141517 | 기본 페이지 배경, 플레이어 프레임 캔버스 |
| **Surface** | surface-elevated | #202224 | 컨테이너 카드, 리스트 행, 인풋 필드 기본 배경 |
| **Surface** | surface-overlay | #2E3033 | 팝오버, 모달 다이얼로그, 호버 상태 배경 |
| **Text** | text-primary | #FFFFFF | 헤드라인, 핵심 수치, 필수 본문 텍스트 |
| **Text** | text-secondary | #C9CEDC | 일반 본문 단락, 보조 폼 라벨 |
| **Text** | text-tertiary | #9DA5B6 | 메타데이터, 타임스탬프, 부가 설명 |
| **Text** | text-disabled | #545A69 | 비활성 버튼 텍스트, 플레이스홀더 |
| **Brand Neon** | primary-neon | #00FFA3 | 시그니처 액션, 활성 라이브 링 시작점, 포커스 링 |
| **Brand Neon** | primary-hover | #00E693 | 주요 버튼 마우스 호버 상태 |
| **Secondary** | secondary-teal | #027F80 | 라이브 링 그라데이션 종료점, 브랜드 보조선 |
| **Accent** | accent-pink | #FF0558 | 엔터테인먼트 CTA, 왓챠 시그니처 하이라이트 |
| **Semantic** | semantic-live | #E02020 | 라이브 방송 상태 배지, 치명적 위험 알림 |

웹 콘텐츠 접근성 지침(WCAG 2.1)의 상대 휘도(Relative Luminance) 계산 공식에 따라 주요 전경색과 배경색의 명암비를 산출한 결과, 다크 배경 위의 밝은 텍스트는 대체로 높은 대비 수준을 확보하는 것으로 분석된다.

| 전경색 (Foreground) | 배경색 (Background) | 대비비 (Contrast Ratio) | WCAG 2.1 기준 평가 | 비고 |
| :---- | :---- | :---- | :---- | :---- |
| Pure White (#FFFFFF) | Surface Base (#141517) | **18.27:1** | AAA 합격 (일반 텍스트) | 헤드라인 및 중요 본문 가독성 우수 |
| Text Secondary (#C9CEDC) | Surface Base (#141517) | **11.61:1** | AAA 합격 (일반 텍스트) | 장시간 독해 시 안성피로 완화 |
| Text Tertiary (#9DA5B6) | Surface Base (#141517) | **7.39:1** | AAA 합격 (일반 텍스트) | 보조 정보 및 캡션 기준 충족 |
| Text Disabled (#545A69) | Surface Base (#141517) | **2.65:1** | 불합격 (단, 규정상 예외) | 인터랙션 불가 요소에만 제한 적용 |
| Neon Green (#00FFA3) | Surface Base (#141517) | **13.78:1** | AAA 합격 (일반 텍스트) | 아이콘 및 텍스트 링크 식별성 탁월 |
| Neon Pink (#FF0558) | Surface Base (#141517) | **4.71:1** | AA 합격 (일반 텍스트) | 본문 크기에서 기준선(4.5:1) 충족 |
| **Dark Text (#0E0F10)** | **Neon Green (#00FFA3)** | **14.47:1** | **AAA 합격 (일반 텍스트)** | **네온 솔리드 버튼 필수 텍스트 조합**1 |
| **White Text (#FFFFFF)** | **Neon Green (#00FFA3)** | **1.33:1** | **치명적 불합격** | **가독성 파괴, 설계 안티패턴**1 |
| White Text (#FFFFFF) | Neon Pink (#FF0558) | **3.88:1** | AA Large 합격 (일반 실패) | 18.66px 볼드 이상 헤딩에만 허용 |

다크모드 지원 시스템을 설계할 때 가장 주의해야 할 지점은 토글 시 네온 컬러를 그대로 라이트 모드로 전이시키는 실수다. 네온 그린(#00FFA3)은 다크 캔버스에서는 13.78:1의 우수한 명암비를 보이지만, 화이트 배경(#FFFFFF) 위에서는 대비율이 약 1.3:1 수준으로 급락하여 시각 장애인은 물론 일반 사용자도 텍스트나 아이콘을 식별할 수 없게 된다. 따라서 다크 기본 시스템이 라이트 테마를 보조 지원할 경우, 시맨틱 토큰 매핑을 통해 명도와 채도가 조율된 딥 그린(예: 치지직 라이트 브랜드 그린 #1BB373)으로 자동 강등되는 구조를 갖추어야 한다.  
한국 주식 시세 관습과 네온 팔레트 사이의 충돌은 금융 및 암호화폐 프로덕트 설계 시 중대한 사용성 결함을 초래한다. 동아시아 금융권은 문화적 배경에 따라 전통적으로 주가 상승을 빨간색(양봉, 행운과 부), 하락을 파란색(음봉, 차분함과 냉정)으로 표기해 온 반면, 서구권과 글로벌 가상자산 시장(바이낸스, 트레이딩뷰 등)은 상승을 초록색(달러와 성장), 하락을 빨간색(위험과 경고)으로 표기한다.  
이러한 관습적 간극은 다크·네온 환경에서 두 가지 형태로 문제를 야기한다. 첫째, 서비스의 브랜드 시그니처가 네온 그린(#00FFA3, #1ED760)인 상태에서 한국 주식 시장 데이터(상승 빨강, 하락 파랑)가 한 화면에 렌더링될 경우, 초록색 액션 버튼과 빨간색 상승 차트, 파란색 하락 차트가 동시에 발광하여 시각적 위계가 완전히 붕괴된다. 서구권 인터페이스에 익숙한 사용자는 브랜드 네온 초록색을 상승 신호로 오인하여 매수 결정을 내리는 인지 오류에 노출될 수 있다.  
둘째, 어두운 배경 위에서 퓨어 레드(#FF0000)와 퓨어 블루(#0000FF)가 인접할 때, 빛의 파장 차이로 인해 망막에 맺히는 초점 거리가 달라지며 두 색상이 서로 다른 깊이에 떠 있는 것처럼 왜곡되는 입체 수차(Chromostereopsis) 현상이 발생하여 눈의 피로를 유발한다.  
국내 주요 핀테크 플랫폼은 이를 해결하기 위해 색채 파장을 정교하게 보정했다. 토스증권 PC와 업비트는 원색 계열을 지양하고, 다크 배경과의 대비를 유지하면서도 색수차를 억제하는 형광 코랄 레드(#F04452)와 고채도 스카이 블루(#3182F6)를 상승·하락 전용 시맨틱 토큰으로 채택했다. 또한 치지직은 실시간 방송 상태를 알리는 LIVE 배지에 순수 레드(#E02020)를 고정하고, 브랜드 네온 그린은 채널 아바타 테두리와 인터랙션 버튼에만 격리하여 기능과 상태 간 색채 간섭을 방지했다.

## 타이포: 서체, 스케일, 속성 및 라이선스

다크 배경에서는 발광하는 밝은 텍스트가 주변의 어두운 영역으로 번져 보이는 빛의 물리적 팽창, 즉 이레디에이션 현상(Irradiation effect)이 발생한다. 이로 인해 라이트 모드와 동일한 폰트 두께를 적용하더라도 다크 화면에서는 글자가 시각적으로 약 10~15% 더 두껍게 인지된다. 따라서 타이포그래피 시스템은 자간(Letter spacing)을 미세하게 조이고, 행간(Line height)을 140~150% 수준으로 넉넉하게 확보하여 글자 획 간의 번짐 간섭을 상쇄하는 설계 기준을 확립해야 한다.  
서체 구성에 있어서는 기하학적 개성을 드러내는 볼드 디스플레이 폰트와 데이터 판독성이 극대화된 본문 산세리프 서체를 엄격히 이원화하여 페어링한다.

| 서체 분류 | 채택 폰트 패밀리 | 담당 영역 및 디자인 의도 | 적용 라이선스 | 원문 URL |
| :---- | :---- | :---- | :---- | :---- |
| **본문 / UI 기본** | **Pretendard** | 고밀도 데이터 테이블, 채팅 스트림, 메뉴 라벨 등 인터페이스 전반 | SIL Open Font License 1.1 (상업적 무료, 오픈소스) | https://github.com/orioncactus/pretendard |
| **디스플레이 / 헤더** | **Sandoll 네모니 (Nemony2)** | 볼드한 사각 모티프의 대형 배너 타이틀, 카테고리 헤더 | 산돌 상용 폰트 라이선스 (유료 구독) | https://www.sandoll.co.kr |
| *대체 헤더 서체* | *Pretendard 800 (ExtraBold)* | 상용 서체 도입이 불가능한 환경에서의 헤드라인 대응 | SIL Open Font License 1.1 (상업적 무료, 오픈소스) | https://github.com/orioncactus/pretendard |
| **숫자 / 코드 데이터** | **JetBrains Mono** | 체결가, 호가 수량, 실시간 지표 등 고정폭(Tabular Num) 렌더링 | Apache License 2.0 (상업적 무료) | https://www.jetbrains.com/lp/mono/ |

| 위계 토큰 | 적용 서체 | 크기 (Font Size) | 굵기 (Weight) | 행간 (Line Height) | 자간 (Tracking) | 본문 대비 비율 |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Display** | Sandoll 네모니 / Pretendard | 40px | 400 (네모니) / 800 | 48px (120%) | 0px | 2.85 : 11 |
| **Heading 1** | Sandoll 네모니 / Pretendard | 32px | 400 (네모니) / 700 | 40px (125%) | 0px | 2.28 : 11 |
| **Heading 2** | Pretendard | 24px | 700 (Bold) | 32px (133%) | -0.3px | 1.71 : 11 |
| **Heading 3** | Pretendard | 20px | 700 (Bold) | 28px (140%) | -0.3px | 1.42 : 11 |
| **Body Large** | Pretendard | 16px | 500 (Medium) / 600 | 24px (150%) | -0.2px | 1.14 : 11 |
| **Body Base** | Pretendard | 14px (기준 본문) | 400 (Regular) | 20px (143%) | -0.2px | 1.00 : 11 |
| **Body Small** | Pretendard | 13px (채팅·댓글) | 400 (Regular) | 19px (146%) | -0.2px | 0.92 : 11 |
| **Caption** | Pretendard / JetBrains Mono | 12px (메타·호가) | 400 / 500 | 16px (133%) | 0px | 0.85 : 11 |

## 레이아웃·컴포넌트: 그리드 및 UI 요소 상세 규격

다크·고대비·네온 스타일의 공간 철학은 토스형의 넉넉한 8pt 기반 모바일 여백과 완전히 결별한다. 복수의 데이터 패널(동영상 플레이어, 실시간 채팅, 호가창, 주문 모듈)이 한 화면에 공존해야 하는 고밀도 데스크톱 및 태블릿 환경을 기본 타깃으로 삼기 때문에, 4pt를 기본 증분으로 두고 미세 간격에는 2pt를 활용하는 초정밀 그리드 구조를 채택한다.  
공간을 분할할 때 외부 마진을 넓혀 카드를 띄우는 방식 대신, 컨테이너 테두리에 1px solid #2E3033 형태의 섬세한 경계선을 두어 공간 손실을 최소화하는 계측 장비형 레이아웃을 구현한다.

| 컴포넌트 | 기본 높이 / 패딩 | 라운딩 (Radius) | 테두리 (Border) | 배경 면 (Surface) | 그림자 및 고도 (Elevation) |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Card (카드)** | 내부 패딩 12~16px | 8px ~ 12px | 1px solid #2E3033 | Surface Elevated (#202224) | 그림자 없음, 호버 시 border-color: #00FFA3 |
| **List Item (리스트)** | 높이 36~44px, 좌우 8px | 4px (호버 시에만) | 행 구분선 1px solid #202224 | 투명, 호버 시 rgba(255,255,255,0.04) | 없음 (플랫 렌더링) |
| **Primary Button** | 높이 36px, 좌우 14px | 8px (radius-md) | 없음 | Neon Green (#00FFA3), 텍스트 #0E0F10 | 없음, 포커스 시 외곽 네온 글로우 링 |
| **Secondary Button** | 높이 36px, 좌우 14px | 8px (radius-md) | 1px solid #2E3033 | Surface Overlay (#2E3033) | 없음 |
| **Input Form (입력창)** | 높이 40px, 패딩 0 12px | 8px (radius-md) | 기본 투명, 포커스 시 1.5px solid #00FFA3 | Surface Elevated (#202224) | 포커스 시 0 0 8px rgba(0,255,163,0.3) |
| **Navigation Bar** | GNB 높이 56~60px | 0px (상단 고정) | 하단 경계선 1px solid #202224 | rgba(20,21,23,0.85) + Blur 12px | 스크롤 시 0 4px 12px rgba(0,0,0,0.5) |
| **Status Badge** | 높이 20px, 패딩 0 6px | 4px (radius-sm) | 없음 또는 1px solid | 솔리드 레드(#E02020) 또는 어두운 반투명 | 없음 |

## 이미지·일러스트·아이콘

어두운 테마 환경에서 라이트 모드용 일반 사진이나 파스텔 톤 일러스트를 그대로 배치하면, 해당 영역만 사각형 형태로 강하게 발광하여 사용자의 시선을 교란하고 화면의 심도를 단절시킨다. 이를 극복하기 위해 다크·네온 시스템은 미디어 에셋의 테두리가 어두운 배경 속으로 자연스럽게 용해되도록 하는 비네팅 기법과 하단 그라데이션 마스크(linear-gradient(180deg, rgba(20,21,23,0) 0%, #141517 100%))를 필수로 적용한다. 썸네일 이미지의 모서리는 8px 라운딩을 부여하며, OLED 디스플레이의 심도를 살리기 위해 콘트라스트를 10~15% 가산하고 채도를 소폭 높이는 방향으로 컬러 그레이딩을 수행한다.  
일러스트레이션 화풍은 토스 계열의 평면적 2D 미니멀리즘 벡터 캐릭터를 지양한다. 어두운 우주 공간을 연상시키는 딥 톤 배경 위에서 네온 림라이트(Rim light)를 반사하는 정교한 3D 글래스모피즘 오브젝트, 전기 회로 및 헤르츠 주파수를 모티프로 삼은 사이버네틱 라인 아트를 주력 비주얼로 활용한다.  
아이콘 시스템은 명확한 상태 분리를 위해 듀얼 렌더링 방식을 채택한다. 기본 비활성 메뉴 아이콘은 24px 바운딩 박스 기준 stroke-width: 1.75px ~ 2.0px 규격의 라인 아웃라인(Line Stroke)으로 렌더링하여 배경에 묻어나게 하고, 마우스 호버나 탭 선택이 발생하는 순간 면이 채워진 솔리드(Filled) 형태로 전환하면서 아이콘 색상을 네온 그린으로 점등시킨다.  
이러한 규격을 충족하는 오픈소스 및 상용 수준의 무료 에셋 라이브러리는 다음과 같이 정리할 수 있다.

| 라이브러리 명칭 | 라이선스 종류 | 특징 및 다크·네온 스타일 적합성 |
| :---- | :---- | :---- |
| **Lucide Icons** | ISC License (상업적 이용 가능) | 치지직 기본 시스템의 대체제로 추천되며, SVG 선 두께를 2px로 정밀하게 제어 가능함 |
| **Tabler Icons** | MIT License (상업적 이용 가능) | 5,000종 이상의 계측 및 데이터 시각화용 심볼을 보유하여 WTS 및 전적 플랫폼에 최적화 |
| **Phosphor Icons** | MIT License (상업적 이용 가능) | Thin, Regular, Bold, Fill 등 다단계 웨이트를 완벽히 지원하여 활성 상태 전환 구현에 유리 |

## 모션: 마이크로인터랙션 및 화면 전환

토스 계열의 모션이 부드러운 유기적 팽창과 탄성(Spring)에 기반한 인간 중심의 친근한 인터랙션을 지향한다면, 다크·네온 스타일의 모션은 전기 신호의 즉각적인 개폐와 군용 장비 콘솔의 기계적인 정밀성을 지향한다. 따라서 불필요한 바운스나 완만한 감속을 배제하고, 입력 즉시 결과가 체결되는 **고속 스냅(High-speed Snap)** 인터랙션을 설계 원칙으로 삼는다.

| 모션 인터랙션 유형 | 대상 컴포넌트 | 지속 시간 (Duration) | 이징 커브 (Easing Curve) | 변위 및 투명도 속성 (Transform & Opacity) |
| :---- | :---- | :---- | :---- | :---- |
| **Micro Snap** | 버튼 호버, 탭 포커스 | 150ms ~ 200ms (fast) | cubic-bezier(0.16, 1, 0.3, 1) | border-color, background-color 즉시 전환 |
| **Panel Slide** | 사이드바 개폐, 아코디언 | 250ms ~ 350ms (base) | cubic-bezier(0.65, 0, 0.35, 1) | transform: translateX(), 리니어에 가까운 기계적 슬라이드 |
| **Modal Scale-up** | 다이얼로그, 주문 확인 팝업 | 200ms ~ 250ms | cubic-bezier(0, 0, 0.2, 1) | scale(0.96) -> scale(1.0), opacity: 0 -> 1 동시 전개 |
| **Data Tick Pulse** | 호가 변동, 코인 시세 갱신 | 300ms | linear | 셀 전체 점멸 대신 숫자 텍스트만 형광 점멸 후 200ms 내 복귀 |
| **Active Glow Pulse** | 라이브 스트리밍 링 인디케이터 | 1200ms (무한 루프) | ease-in-out | box-shadow 네온 번짐 반경 4px에서 10px로 주기적 진동 |

## 적합/부적합 분야

다크·고대비·네온 스타일의 성패는 도메인의 사용 맥락과 정보 처리 방식에 좌우된다. 미디어 스트리밍, e스포츠 데이터 플랫폼, 전문 금융 트레이딩(WTS), OTT 엔터테인먼트는 이 스타일이 최적의 효용을 발휘하는 핵심 영역이다. 라이브 스트리밍과 OTT에서는 영상 플레이어 자체가 빛을 뿜는 주체이므로, 주변 UI가 암전되어야만 극장 스크린 효과를 내며 몰입도를 극대화할 수 있다.  
e스포츠 전적 분석 플랫폼(OP.GG)의 경우, 사용자가 주로 플레이하는 게임 클라이언트(리그 오브 레전드, 발로란트 등)의 화면 톤과 시각적 연속성을 형성하며, 복잡한 KDA 수치와 티어 엠블럼을 형광 대비로 부각시켜 승패 데이터를 한눈에 판독하도록 돕는다.  
증권 WTS 및 가상자산 오더북 화면에서는 수십 개의 호가 잔량과 체결 내역이 실시간으로 갱신되는데, 다크 배경은 다량의 백색 픽셀 발광을 차단하여 장시간 모니터를 응시하는 트레이더의 안구 피로를 줄여주고 데이터의 변화 상태를 선명하게 짚어낸다.  
반면 범용 종합 이커머스(쿠팡, 네이버쇼핑, 컬리), 공공 행정 및 헬스케어 서비스, 텍스트 집약형 오피스 문서 도구, 전통 시중은행의 리테일 뱅킹 화면에서는 이 스타일을 전면 배제해야 한다. 이커머스에 다크·네온을 적용하면 패션, 뷰티, 신선식품의 고유한 색상이 주변 어두운 캔버스와 네온 반사광으로 인해 심각하게 왜곡되어 상품 탐색 피로도를 가중시키고 반품률을 유발할 위험이 크다.  
공공 행정 및 헬스케어 플랫폼은 고령층과 저시력자를 포괄하는 전 국민이 사용자이므로 국가 표준 웹 접근성 지침 준수가 필수적인데, 네온 중심의 시각 언어는 시각적 난독을 초래한다. 또한 수천 자의 문서를 정독해야 하는 오피스 도구에서는 어두운 배경에 흰 글자를 장시간 읽을 때 뇌의 인지 부하가 증가하므로 부적합하다. 전통 은행 업무 역시 보수적인 금전 거래의 신뢰성과 화사하고 대중적인 인상이 핵심이므로, 투기적이거나 유희적인 인상을 풍기는 네온 팔레트는 의도된 브랜드 가치와 정면으로 충돌한다.

## 접근성·사용성 함정

다크·고대비·네온 스타일은 특유의 화려한 시각성 이면에 심각한 인체공학적·광학적 사용성 함정을 내포하고 있으며, 이를 수치화된 기준으로 방어하지 않으면 서비스 품질이 급격히 저하된다.  
가장 치명적인 광학적 결함은 난시(Astigmatism) 사용자의 **할레이션(Halation) 번짐 현상**이다. 인간의 눈은 어두운 환경을 마주하면 망막으로 유입되는 광량을 확보하기 위해 동공을 4~8mm까지 확장시킨다. 동공이 확장되면 눈의 초점 심도(Depth of field)가 얕아지며, 각막 곡률이 불규칙한 난시 보유자는 빛이 고르게 수렴하지 못해 밝은 글자 외곽으로 빛이 뿌옇게 번지는 후광을 보게 된다. 한국 성인의 난시 유병률이 매우 높다는 의학적 사실을 감안할 때, 퓨어 블랙(#000000) 위 퓨어 화이트(#FFFFFF)의 극단적인 명암비(21:1)는 텍스트 윤곽을 뭉개버려 심한 안성피로(Eyestrain)를 초래한다. 따라서 본문 텍스트는 순백색을 피하고 오프화이트(#C9CEDC)로 감쇄하여 광학적 번짐을 억제해야 한다.

| 실패 유형 (Failure Mode) | 물리적·디자인적 유발 원인 | 실측된 결함 수치 | 준수해야 할 정밀 설계 규칙 |
| :---- | :---- | :---- | :---- |
| **할레이션 난독증** | 동공 확장에 따른 초점 심도 저하 및 난시 굴절 이상 | 순백색-순흑색 대비비 **21:1**17 | 본문 명암비를 **7:1 ~ 12:1** 범위로 감쇄 조정, 자간 축소 금지 |
| **공간 주파수 붕괴** | CSS text-shadow 글로우 남용으로 글자 에지 소실 | APCA 인지 식별성 점수 **50점 미만**24 | 14px 이하 본문 글로우 전면 금지, 에셋 외곽선으로만 효과 격리 |
| **전경색 역전 실명** | 고휘도 네온 버튼 배경에 습관적인 백색 텍스트 배치 | #FFFFFF on #00FFA3 \= **1.33:1**17 | 네온 배경 위에는 반드시 다크 텍스트(color: #0E0F10, **14.47:1**) 강제 |
| **모바일 타깃 침해** | WTS 데스크톱 정보 밀도를 모바일에 압축 이식 | 호가 버튼 터치 영역 **24~30px** 수준 전락 | 폰트가 12px이라도 터치 히트박스는 투명 패딩으로 **최소 44x44px** 확보 |
| **입체 수차 간섭** | 파장 차이가 극심한 원색 빨강과 파랑의 인접 배치 | 망막 굴절률 차이로 초점면 분리 | 중간 틴트 혼합형 코랄 레드(#F04452)와 스카이 블루(#3182F6)로 대체 |

## 설계 토큰 초안

디자이너와 프론트엔드 엔지니어가 즉각 연동하여 구축할 수 있도록 구성된 W3C Design Tokens 표준 규격 기반의 JSON 코드 구조다.

JSON  
{  
  "color": {  
    "background": {  
      "deep": { "value": "#0E0F10", "type": "color" },  
      "base": { "value": "#141517", "type": "color" },  
      "elevated": { "value": "#202224", "type": "color" },  
      "overlay": { "value": "#2E3033", "type": "color" }  
    },  
    "text": {  
      "primary": { "value": "#FFFFFF", "type": "color" },  
      "secondary": { "value": "#C9CEDC", "type": "color" },  
      "tertiary": { "value": "#9DA5B6", "type": "color" },  
      "disabled": { "value": "#545A69", "type": "color" },  
      "on-neon": { "value": "#0E0F10", "type": "color" }  
    },  
    "brand": {  
      "neon-green": { "value": "#00FFA3", "type": "color" },  
      "neon-green-hover": { "value": "#00E693", "type": "color" },  
      "neon-teal": { "value": "#027F80", "type": "color" },  
      "neon-pink": { "value": "#FF0558", "type": "color" }  
    },  
    "border": {  
      "subtle": { "value": "#202224", "type": "color" },  
      "base": { "value": "#2E3033", "type": "color" },  
      "focus": { "value": "#00FFA3", "type": "color" }  
    },  
    "market": {  
      "rise-kr": { "value": "#F04452", "type": "color" },  
      "fall-kr": { "value": "#3182F6", "type": "color" },  
      "rise-global": { "value": "#089981", "type": "color" },  
      "fall-global": { "value": "#F23645", "type": "color" }  
    }  
  },  
  "typography": {  
    "fontFamily": {  
      "base": { "value": "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif", "type": "fontFamily" },  
      "display": { "value": "Sandoll Nemony2, Pretendard, sans-serif", "type": "fontFamily" },  
      "mono": { "value": "JetBrains Mono, monospace", "type": "fontFamily" }  
    },  
    "scale": {  
      "display": {  
        "fontSize": { "value": "40px" },  
        "lineHeight": { "value": "48px" },  
        "fontWeight": { "value": "800" },  
        "letterSpacing": { "value": "0px" }  
      },  
      "h1": {  
        "fontSize": { "value": "32px" },  
        "lineHeight": { "value": "40px" },  
        "fontWeight": { "value": "700" },  
        "letterSpacing": { "value": "0px" }  
      },  
      "h2": {  
        "fontSize": { "value": "24px" },  
        "lineHeight": { "value": "32px" },  
        "fontWeight": { "value": "700" },  
        "letterSpacing": { "value": "-0.3px" }  
      },  
      "body-base": {  
        "fontSize": { "value": "14px" },  
        "lineHeight": { "value": "20px" },  
        "fontWeight": { "value": "400" },  
        "letterSpacing": { "value": "-0.2px" }  
      },  
      "caption": {  
        "fontSize": { "value": "12px" },  
        "lineHeight": { "value": "16px" },  
        "fontWeight": { "value": "400" },  
        "letterSpacing": { "value": "0px" }  
      }  
    }  
  },  
  "spacing": {  
    "xs": { "value": "4px", "type": "spacing" },  
    "sm": { "value": "8px", "type": "spacing" },  
    "md": { "value": "16px", "type": "spacing" },  
    "lg": { "value": "24px", "type": "spacing" },  
    "xl": { "value": "32px", "type": "spacing" }  
  },  
  "borderRadius": {  
    "sm": { "value": "4px", "type": "borderRadius" },  
    "md": { "value": "8px", "type": "borderRadius" },  
    "lg": { "value": "12px", "type": "borderRadius" },  
    "full": { "value": "9999px", "type": "borderRadius" }  
  },  
  "elevation": {  
    "surface-border": { "value": "1px solid #2E3033", "type": "border" },  
    "neon-glow-focus": { "value": " 0 8px rgba(0, 255, 163, 0.4)", "type": "boxShadow" },  
    "popover-shadow": { "value": " 4px 12px 4px rgba(0, 0, 0, 0.4)", "type": "boxShadow" }  
  },  
  "motion": {  
    "duration": {  
      "fast": { "value": "150ms", "type": "time" },  
      "base": { "value": "300ms", "type": "time" },  
      "slow": { "value": "500ms", "type": "time" }  
    },  
    "easing": {  
      "snap": { "value": "cubic-bezier(0.16, 1, 0.3, 1)", "type": "cubicBezier" },  
      "smooth": { "value": "cubic-bezier(0.65, 0, 0.35, 1)", "type": "cubicBezier" }  
    }  
  }  
}

## 불확실·의견이 갈리는 것

다크 테마가 눈 건강과 피로도에 미치는 영향에 대해서는 상용 서비스들의 마케팅적 주장과 의학계의 임상 연구 결과가 첨예하게 대립하고 있다. 다수의 IT 서비스와 디스플레이 제조사는 다크모드가 화면 전체의 광량을 줄여 블루라이트 노출을 억제하고 시력을 보호한다고 주장한다. 그러나 인체공학 및 안과학 연구에서는 밝은 배경에 어두운 글자를 표기하는 양화 표시(Positive polarity)가 동공을 수축시켜 눈의 굴절 오차를 줄이고 독해 속도와 텍스트 이해도를 실질적으로 높인다는 결론을 일관되게 제시하고 있다. 특히 난시 보유자에게 다크 테마는 할레이션으로 인한 시각 장벽으로 작용할 수 있음이 학술적으로 확인되었기에, 이를 일률적인 건강 기능으로 단정하기 어렵다.  
디스플레이 엔지니어링 측면에서는 순수 블랙(#000000)과 딥 차콜(#141517) 간의 선택을 둘러싸고 설계 철학이 갈린다. 퓨어 블랙은 OLED 소자를 물리적으로 소등시켜 전력 소모를 극적으로 줄일 수 있다는 장점이 있으나, 어두운 화면을 빠르게 스크롤할 때 꺼져 있던 화소가 켜지는 응답 지연으로 인해 글자 주변이 보랏빛이나 붉은빛으로 번지는 **OLED 블랙 스미어링(Black Smearing)** 현상을 유발한다. 이로 인해 스포티파이처럼 극단적인 순수 블랙을 고수하는 진영과, 치지직이나 구글 머티리얼처럼 스미어링을 억제하고 정교한 서피스 고도를 구현하기 위해 딥 차콜을 기본 캔버스로 채택하는 진영으로 기술적 합의가 양분되어 있다.  
한국 주식 시장의 시세 표기 관습(상승 빨강, 하락 파랑)을 글로벌 표준(상승 초록, 하락 빨강)으로 전환해야 하는가에 대한 논쟁 역시 장기화되고 있다. 테크 업계와 서구권 플랫폼 유경험자들은 암호화폐 시장과의 정합성을 위해 초록색 상승 표기로의 단일화를 제안하지만, 국내 금융권 및 규제 당국은 수십 년간 고착된 개인 투자자의 멘탈 모델을 훼손할 경우 급박한 장중 거래에서 치명적인 주문 착오와 자산 손실을 유발할 수 있다는 우려로 인해 현행 분리 체제를 고수하고 있다.  
마지막으로, 다크·고대비·네온 스타일의 도입이 체류 시간 증가, 결제 전환율, 트레이딩 주문 빈도 등 실제 비즈니스 핵심 지표(KPI)에 미친 정량적 효과 수치는 네이버, SOOP, 토스증권 등 대상 기업의 대외비 정책으로 인해 공인된 1차 발표 자료나 학술 논문 형태로 확인되지 않았다(미확인). 따라서 현시점의 프로덕트 리뉴얼 흐름은 계량화된 지표의 개선보다는 동영상 시청 환경의 조도 일치, 트위치 철수 국면에서의 게이머 오디언스 락인(Lock-in), 암전 상태에서의 감성적 몰입이라는 전략적·정성적 판단에 주로 기대고 있는 것으로 분석된다.

## 참고 문헌

> 1. 치지직 UI 디자인 시스템 및 브랜드 가이드: https://www.oppadu.com/tools/design-systems-site/brand/chzzk.html1  
> 2. 알파스퀘어 다크모드 화면테마 기능 가이드: https://alphasquare.oopy.io/5684a3a5-842b-4f87-9dfd-b70699e5e1af9  
> 3. 알파스퀘어 프로필 화면테마 설정 매뉴얼: https://alphasquare.oopy.io/5684a3a5-842b-4f87-9dfd-b70699e5e1af9  
> 4. 알파스퀘어 다크모드 차트 적용 예시 및 전환: https://alphasquare.oopy.io/10506658-d503-4c48-a299-a9e9d7b7fbbf14  
> 5. 알파스퀘어 차트 유형 및 캔들 지표 툴바 설정: https://alphasquare.oopy.io/supporters-tutorial/membership/chart-type26  
> 6. 업비트 차트 다크모드 및 어두운 배경 나이트모드 설정법: https://blackcocoas.com/entry/%EC%97%85%EB%B9%84%ED%8A%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%956  
> 7. 업비트 모바일 앱 화면 테마 다크모드 설정 안내: https://rallypoint.tistory.com/33311  
> 8. 업비트 거래소 톱니바퀴 화면 테마 설정 가이드: https://blackcocoas.com/entry/%EC%97%85%EB%B9%84%ED%8A%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%956  
> 9. 업비트 PC 웹 및 모바일 앱 공식 다크모드 지원 공지 및 설정법: https://rallypoint.tistory.com/33311  
> 10. OP.GG 앱 기본 테마 다크모드 설정 및 전적 화면: https://talk.op.gg/s/lol/free/6506639/%EB%8B%98%EB%93%A4%20%EC%98%B5%EC%A7%80%20%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%20%EC%96%B4%EC%BC%80%ED%95%A8??10  
> 11. 한국 주식 상승 빨간색과 서양 초록색의 문화적 차이: https://ininvestor.tistory.com/entry/%ED%95%9C%EA%B5%AD-%EC%A3%BC%EC%8B%9D%EC%9D%98-%EC%83%81%EC%8A%B9%EC%9D%80-%EB%B9%A8%EA%B0%84%EC%83%89-%EC%84%9C%EC%96%91%EC%9D%80-%EC%B4%88%EB%A1%9D%EC%83%89-%EA%B7%B8-%EC%9D%B4%EC%9C%A0%EB%8A%9419  
> 12. 주식 및 가상자산 호가창 빨간색 불빛과 금융 문화적 해석: https://www.a-ha.io/questions/4c61d4d56cf0475eb494607b89d074e321  
> 13. 한국과 미국 주식시장 상승·하락 색상 표기 차이 분석: https://www.mk.co.kr/news/society/498712227  
> 14. 주식시장 상승·하락 색상이 국가별로 통일되지 않은 이유: https://www.a-ha.io/questions/465f86fcd1a3de7fa67aa1ebd8cef39220  
> 15. 미국 증시와 한국 증시의 등락 색상 체계 비교 질의: https://www.a-ha.io/questions/465f86fcd1a3de7fa67aa1ebd8cef39220  
> 16. 동양권과 서구권의 색채 심리 및 호가창 색상 차이: https://www.a-ha.io/questions/4c61d4d56cf0475eb494607b89d074e321  
> 17. 반응형 주식 차트의 국가별 상승·하락 색채 관습: https://ininvestor.tistory.com/entry/%ED%95%9C%EA%B5%AD-%EC%A3%BC%EC%8B%9D%EC%9D%98-%EC%83%81%EC%8A%B9%EC%9D%80-%EB%B9%A8%EA%B0%84%EC%83%89-%EC%84%9C%EC%96%91%EC%9D%80-%EC%B4%88%EB%A1%9D%EC%83%89-%EA%B7%B8-%EC%9D%B4%EC%9C%A0%EB%8A%9419  
> 18. 글로벌 증시 주가 등락 색상 표시 관행 및 한국과의 대비: https://www.mk.co.kr/news/society/498712227  
> 19. 모니터 다크모드와 눈 건강의 상관관계 및 난시 번짐 분석: https://health.tali.kr/%EB%AA%A8%EB%8B%88%ED%84%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EB%88%88-%EA%B1%B4%EA%B0%9522  
> 20. 다크모드 사용자환경이 난시와 근시에 미치는 영향 (영상): https://www.youtube.com/watch?v=m_67BIzkN-w28  
> 21. 스마트폰 다크모드의 두 얼굴: 할레이션 현상과 시력: https://www.modoodoc.com/blog/post/5467/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EA%B0%80-%EB%88%88-%EA%B1%B4%EA%B0%95%EC%97%90-%EB%AC%B4%EC%A1%B0%EA%B1%B4-%EC%9D%B4%EB%A1%9C%EC%9A%B8%EA%B9%8C/?is_global_post=true8  
> 22. 다크모드의 할레이션(Halation) 현상과 동공 확장 안성피로: https://www.modoodoc.com/blog/post/5467/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EA%B0%80-%EB%88%88-%EA%B1%B4%EA%B0%95%EC%97%90-%EB%AC%B4%EC%A1%B0%EA%B1%B4-%EC%9D%B4%EB%A1%9C%EC%9A%B8%EA%B9%8C/?is_global_post=true8  
> 23. 다크모드 UI와 근시·난시 유발 논쟁 심층 취재 (영상): https://www.youtube.com/watch?v=m_67BIzkN-w28  
> 24. 안구건조증 및 난시 환자의 다크모드 글자 번짐 메커니즘: https://www.bgneye.com/bgn_company/blogView.php?bbs_idx=318123  
> 25. 다크 테마의 WCAG 대비율과 사용성 가독성 논쟁: https://www.reddit.com/r/kde/comments/o0hz2i/why_are_dark_themes_so_popular_despite_poor/?tl=ko29  
> 26. 다크모드와 라이트모드의 인체공학적 효율 및 후광 현상: https://www.bgneye.com/bgn_company/blogView.php?bbs_idx=318123  
> 27. 간편 로그인 UI 디자인 가이드 및 어두운 배경 대비: https://ditoday.com/%EA%B0%84%ED%8E%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%A0%EA%B9%8C-_-ux-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EA%B0%9C%EB%B0%9C/13  
> 28. 네이버 치지직(CHZZK) 디자인 시스템 및 타이포·모션 토큰 상세: https://www.oppadu.com/tools/design-systems-site/brand/chzzk.html1  
> 29. WCAG 2.1 색상 및 명암 대비 기준과 다크모드 검사: https://a11ystar.tistory.com/entry/%EC%83%89%EC%83%81%EA%B3%BC-%EB%AA%85%EC%95%94-%EB%8C%80%EB%B9%84-%EB%AA%A8%EB%91%90%EA%B0%80-%EC%84%A0%EB%AA%85%ED%95%98%EA%B2%8C-%EB%B3%BC-%EA%B6%8C%EB%A6%AC530  
> 30. WCAG Level AA 일반 텍스트 4.5:1 명암비 준수 가이드: https://a11ystar.tistory.com/entry/%EC%83%89%EC%83%81%EA%B3%BC-%EB%AA%85%EC%95%94-%EB%8C%80%EB%B9%84-%EB%AA%A8%EB%91%90%EA%B0%80-%EC%84%A0%EB%AA%85%ED%95%98%EA%B2%8C-%EB%B3%BC-%EA%B6%8C%EB%A6%AC530  
> 31. 국내 주요 앱(당근, 네이버, 유튜브) 라이트/다크 명암비 실측 비교: https://yozm.wishket.com/magazine/detail/2901/31  
> 32. 웹 명암비 체커 및 WCAG 상대 휘도 계산 도구: https://coddy.tech/tools/ko/contrast-checker18  
> 33. 모바일 UI의 작은 텍스트 명암비 기준과 접근성 평가: https://yozm.wishket.com/magazine/detail/2901/31  
> 34. 웹 접근성 WCAG 명암비 단계 정의: https://naradesign.github.io/wcag-contrast.html32  
> 35. 차세대 접근성 지각 알고리즘 APCA의 인지적 대비 평가 기준: https://hawaiikiki.tistory.com/40324  
> 36. 구글 웹 개발자 가이드: 색상 및 대비 접근성과 APCA 모델: https://web.dev/articles/color-and-contrast-accessibility?hl=ko33  
> 37. 주식 차트 상승·하락 색상의 문화적 전통과 투자 심리: https://www.a-ha.io/questions/465f86fcd1a3de7fa67aa1ebd8cef39220  
> 38. 주식 차트 상승 색상(빨강)의 흥분 효과와 글로벌 개편 전망: https://www.a-ha.io/questions/4406bf7bc742074484c1416151be0f7a25  
> 39. 주식 및 가상자산 호가창 빨간색·초록색 불빛의 기호학: https://www.a-ha.io/questions/4c61d4d56cf0475eb494607b89d074e321  
> 40. 빗썸 거래화면 나이트 모드(다크모드) 설정 및 적용법: https://blackcocoas.com/entry/%EB%B9%97%EC%8D%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%957  
> 41. 트레이딩뷰 차트 다크모드 및 어두운 테마 설정 가이드: https://blackcocoas.com/entry/%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%94%A9%EB%B7%B0-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95-%EC%96%B4%EB%91%90%EC%9A%B4-%ED%99%94%EB%A9%B415  
> 42. 빗썸 거래소 화면 테마 나이트 모드 전환 기능: https://blackcocoas.com/entry/%EB%B9%97%EC%8D%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%957  
> 43. 국내 코인 시장 거래소 차트 다크모드 비교: https://blackcocoas.com/category/%EC%BD%94%EC%9D%B8%EC%8B%9C%EC%9E%A5%20%EC%9D%B4%EC%8A%88/%EC%B0%A8%ED%8A%B8%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%9512  
> 44. 네이버 치지직 디자인 토큰, 컬러, 컴포넌트, 안티패턴 명세: https://www.oppadu.com/tools/design-systems-site/brand/chzzk.html1  
> 45. 빗썸 차트 눈 피로 완화용 나이트 모드 인터페이스: https://blackcocoas.com/entry/%EB%B9%97%EC%8D%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%957  
> 46. 업비트 웹 거래소 다크모드 전환 및 시인성 비교: https://blackcocoas.com/entry/%EC%97%85%EB%B9%84%ED%8A%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%956  
> 47. 코인 거래소 차트 설정 및 빗썸·업비트 다크 테마 분석: https://blackcocoas.com/category/%EC%BD%94%EC%9D%B8%EC%8B%9C%EC%9E%A5%20%EC%9D%B4%EC%8A%88/%EC%B0%A8%ED%8A%B8%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%9512  
> 48. 트레이딩뷰 공식 지원: 모바일 및 데스크톱 테마 설정: https://kr.tradingview.com/support/solutions/43000506669/16  
> 49. 트레이딩뷰 iOS 및 안드로이드 테마 설정 안내: https://kr.tradingview.com/support/solutions/43000506669/16  
> 50. WCAG 2.1 기준 상대 휘도 및 명암 대비율 시뮬레이션 알고리즘 실측 데이터17  
> 51. 파이낸셜뉴스: 토스증권 PC 정식 출시 및 다크모드 탑재 보도: https://www.fnnews.com/news/2024071808491417714  
> 52. 위키리크스한국: 토스증권 WTS 사전 이용자 피드백과 다크모드: http://www.wikileaks-kr.org/news/articleView.html?idxno=15586334  
> 53. 뉴시스: 토스증권 PC 정식 서비스 개시, 패널 커스텀과 다크모드: https://mobile.newsis.com/view/NISX20240718_00028160985  
> 54. 한국경제: 토스증권 PC 사전 신청 결과 및 야간 모드 지원: https://www.hankyung.com/article/202407181804Y35  
> 55. Daum 뉴스: 토스증권 WTS 출시 및 트레이딩 패널 다크모드: https://v.daum.net/v/20240718093803752?f=p36  
> 56. 한스경제: 토스증권 모바일에서 PC 웹으로 트레이딩 시스템 확장: http://www.hansbiz.co.kr/news/articleView.html?idxno=70356637  
> 57. 아프리카TV의 SOOP 사명 변경 및 리브랜딩 방향성: https://i-love-rt.tistory.com/entry/%EC%88%B2-%EC%95%84%ED%94%84%EB%A6%AC%EC%B9%B4-%EB%B3%80%EA%B2%BD-%EC%9D%B4%EC%9C%A0-SOOP-%EB%A1%9C%EA%B3%A0%EA%B9%8C%EC%A7%8038  
> 58. 전자신문: 아프리카TV, 18년 만에 SOOP으로 UI/UX 전면 개편: https://m.etnews.com/202410150002782  
> 59. ZDNet Korea: SOOP 리브랜딩 발표 및 스트리밍 플랫폼 전환: https://zdnet.co.kr/view/?no=2024101513263539  
> 60. SOOP 플랫폼 공식 리브랜딩 및 CI 변경 분석: https://i-love-rt.tistory.com/entry/%EC%88%B2-%EC%95%84%ED%94%84%EB%A6%AC%EC%B9%B4-%EB%B3%80%EA%B2%BD-%EC%9D%B4%EC%9C%A0-SOOP-%EB%A1%9C%EA%B3%A0%EA%B9%8C%EC%A7%8038  
> 61. 뉴스투트리: 아프리카TV 사명 SOOP으로 주총 의결: https://www.newstree.kr/newsView/ntr20240329000740  
> 62. 디스이즈게임: 아프리카TV의 2024년 새 모습 SOOP, UI/도메인 개편 계획: https://www.thisisgame.com/articles/1865693  
> 63. ZDNet Korea: SOOP 국내외 통합 스트리밍 플랫폼 구축: https://zdnet.co.kr/view/?no=2024101513263539  
> 64. 뉴시스: SOOP 개편과 열린 스트리밍 생태계 구축 전략: https://mobile.newsis.com/view/NISX20241015_000292085041

#### 참고 자료

> 1. CHZZK (치지직) 디자인 시스템 — 컬러·타이포·컴포넌트 | 오빠두엑셀, [https://www.oppadu.com/tools/design-systems-site/brand/chzzk.html](https://www.oppadu.com/tools/design-systems-site/brand/chzzk.html)  
> 2. 아프리카TV, 18년 만에 'SOOP'으로…리브랜딩 완료 - 전자신문, [https://m.etnews.com/20241015000278?obj=Tzo4OiJzdGRDbGFzcyI6Mjp7czo3OiJyZWZlcmVyIjtOO3M6NzoiZm9yd2FyZCI7czoxMzoid2ViIHRvIG1vYmlsZSI7fQ%3D%3D](https://m.etnews.com/20241015000278?obj=Tzo4OiJzdGRDbGFzcyI6Mjp7czo3OiJyZWZlcmVyIjtOO3M6NzoiZm9yd2FyZCI7czoxMzoid2ViIHRvIG1vYmlsZSI7fQ%3D%3D)  
> 3. 라이브 스트리밍 플랫폼, 아프리카TV가 20년간 걸어온 길, [https://www.thisisgame.com/articles/186569](https://www.thisisgame.com/articles/186569)  
> 4. “PC로 옮겨놓은 MTS”···토스증권 WTS 나왔다 - 파이낸셜뉴스, [https://www.fnnews.com/news/202407180849141771](https://www.fnnews.com/news/202407180849141771)  
> 5. 토스증권, 'PC 서비스' 정식 출시 - 뉴시스, [https://mobile.newsis.com/view/NISX20240718_0002816098](https://mobile.newsis.com/view/NISX20240718_0002816098)  
> 6. 업비트 차트 다크모드(어두운 배경) 나이트모드 설정방법 - 블랙코코아, [https://blackcocoas.com/entry/%EC%97%85%EB%B9%84%ED%8A%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%95](https://blackcocoas.com/entry/%EC%97%85%EB%B9%84%ED%8A%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%95)  
> 7. 빗썸 차트 다크모드(어두운 배경) 나이트모드 설정하는 방법, [https://blackcocoas.com/entry/%EB%B9%97%EC%8D%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95](https://blackcocoas.com/entry/%EB%B9%97%EC%8D%B8-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EC%96%B4%EB%91%90%EC%9A%B4-%EB%B0%B0%EA%B2%BD-%EB%82%98%EC%9D%B4%ED%8A%B8%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)  
> 8. 스마트폰 '다크모드'가 눈 건강에 무조건 이로울까? - 모두닥, [https://www.modoodoc.com/blog/post/5467/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EA%B0%80-%EB%88%88-%EA%B1%B4%EA%B0%95%EC%97%90-%EB%AC%B4%EC%A1%B0%EA%B1%B4-%EC%9D%B4%EB%A1%9C%EC%9A%B8%EA%B9%8C/?is_global_post=true](https://www.modoodoc.com/blog/post/5467/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%EA%B0%80-%EB%88%88-%EA%B1%B4%EA%B0%95%EC%97%90-%EB%AC%B4%EC%A1%B0%EA%B1%B4-%EC%9D%B4%EB%A1%9C%EC%9A%B8%EA%B9%8C/?is_global_post=true)  
> 9. 다크모드 사용하기 - 알파스퀘어, [https://alphasquare.oopy.io/5684a3a5-842b-4f87-9dfd-b70699e5e1af](https://alphasquare.oopy.io/5684a3a5-842b-4f87-9dfd-b70699e5e1af)  
> 10. 님들 옵지 다크모드 어케함?? - OP.GG - 톡피지지, [https://talk.op.gg/s/lol/free/6506639/%EB%8B%98%EB%93%A4%20%EC%98%B5%EC%A7%80%20%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%20%EC%96%B4%EC%BC%80%ED%95%A8??](https://talk.op.gg/s/lol/free/6506639/%EB%8B%98%EB%93%A4%20%EC%98%B5%EC%A7%80%20%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C%20%EC%96%B4%EC%BC%80%ED%95%A8??)  
> 11. 업비트 다크모드 설정하는 방법 (모바일, PC) - 랠리포인트 - 티스토리, [https://rallypoint.tistory.com/333](https://rallypoint.tistory.com/333)  
> 12. '코인시장 이슈/차트설정방법' 카테고리의 글 목록 - 블랙코코아, [https://blackcocoas.com/category/%EC%BD%94%EC%9D%B8%EC%8B%9C%EC%9E%A5%20%EC%9D%B4%EC%8A%88/%EC%B0%A8%ED%8A%B8%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%95](https://blackcocoas.com/category/%EC%BD%94%EC%9D%B8%EC%8B%9C%EC%9E%A5%20%EC%9D%B4%EC%8A%88/%EC%B0%A8%ED%8A%B8%EC%84%A4%EC%A0%95%EB%B0%A9%EB%B2%95)  
> 13. 간편 로그인 디자인 어떻게 할까? _ UX 디자인과 개발, [https://ditoday.com/%EA%B0%84%ED%8E%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%A0%EA%B9%8C-_-ux-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EA%B0%9C%EB%B0%9C/](https://ditoday.com/%EA%B0%84%ED%8E%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%A0%EA%B9%8C-_-ux-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EA%B0%9C%EB%B0%9C/)  
> 14. 다크모드 사용하기, [https://alphasquare.oopy.io/10506658-d503-4c48-a299-a9e9d7b7fbbf](https://alphasquare.oopy.io/10506658-d503-4c48-a299-a9e9d7b7fbbf)  
> 15. 트레이딩뷰 차트 다크모드 설정 방법 (어두운 화면) - 블랙코코아, [https://blackcocoas.com/entry/%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%94%A9%EB%B7%B0-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95-%EC%96%B4%EB%91%90%EC%9A%B4-%ED%99%94%EB%A9%B4](https://blackcocoas.com/entry/%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%94%A9%EB%B7%B0-%EC%B0%A8%ED%8A%B8-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95-%EC%96%B4%EB%91%90%EC%9A%B4-%ED%99%94%EB%A9%B4)  
> 16. 다크 테마를 켜려면? - 트레이딩뷰 - TradingView, [https://kr.tradingview.com/support/solutions/43000506669/](https://kr.tradingview.com/support/solutions/43000506669/)  
> 17. [unknown_url](http://docs.google.com/unknown_url)  
> 18. WCAG 색상 대비 검사기 - AA, AAA - Coddy Tech, [https://coddy.tech/tools/ko/contrast-checker](https://coddy.tech/tools/ko/contrast-checker)  
> 19. 한국 주식의 상승은 빨간색, 서양은 초록색, 그 이유는?, [https://ininvestor.tistory.com/entry/%ED%95%9C%EA%B5%AD-%EC%A3%BC%EC%8B%9D%EC%9D%98-%EC%83%81%EC%8A%B9%EC%9D%80-%EB%B9%A8%EA%B0%84%EC%83%89-%EC%84%9C%EC%96%91%EC%9D%80-%EC%B4%88%EB%A1%9D%EC%83%89-%EA%B7%B8-%EC%9D%B4%EC%9C%A0%EB%8A%94](https://ininvestor.tistory.com/entry/%ED%95%9C%EA%B5%AD-%EC%A3%BC%EC%8B%9D%EC%9D%98-%EC%83%81%EC%8A%B9%EC%9D%80-%EB%B9%A8%EA%B0%84%EC%83%89-%EC%84%9C%EC%96%91%EC%9D%80-%EC%B4%88%EB%A1%9D%EC%83%89-%EA%B7%B8-%EC%9D%B4%EC%9C%A0%EB%8A%94)  
> 20. 주식투자에서 상승 하락 색이 우리나라는 빨간색이 상승, 파란색 ... - 아하, [https://www.a-ha.io/questions/465f86fcd1a3de7fa67aa1ebd8cef392](https://www.a-ha.io/questions/465f86fcd1a3de7fa67aa1ebd8cef392)  
> 21. 주식 호가창은 왜 한국은 빨간색이 오르는 거고, 미국은 초록색 ... - 아하, [https://www.a-ha.io/questions/4c61d4d56cf0475eb494607b89d074e3](https://www.a-ha.io/questions/4c61d4d56cf0475eb494607b89d074e3)  
> 22. 모니터 다크모드 눈 건강에 좋을까? 사무직이라면 꼭 알아야 할 진실, [https://health.tali.kr/%EB%AA%A8%EB%8B%88%ED%84%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EB%88%88-%EA%B1%B4%EA%B0%95](https://health.tali.kr/%EB%AA%A8%EB%8B%88%ED%84%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EB%88%88-%EA%B1%B4%EA%B0%95)  
> 23. 다크모드가 눈에 더 좋다? 상황별 최적 밝기·대비 세팅 총정리, [https://www.bgneye.com/bgn_company/blogView.php?bbs_idx=3181](https://www.bgneye.com/bgn_company/blogView.php?bbs_idx=3181)  
> 24. UI와 접근성 가이드: WCAG와 APCA의 차이점 알아보기, 측정툴 추천, [https://hawaiikiki.tistory.com/403](https://hawaiikiki.tistory.com/403)  
> 25. 우리나라 주식 시장에서도 상승을 뜻할 때는 파란색, 하락은 빨간색, [https://www.a-ha.io/questions/4406bf7bc742074484c1416151be0f7a](https://www.a-ha.io/questions/4406bf7bc742074484c1416151be0f7a)  
> 26. 차트유형 - 알파스퀘어, [https://alphasquare.oopy.io/supporters-tutorial/membership/chart-type](https://alphasquare.oopy.io/supporters-tutorial/membership/chart-type)  
> 27. [아하! 그렇구나] 주가상승 왜 빨간색으로 표시하나 - 매일경제, [https://www.mk.co.kr/news/society/4987122](https://www.mk.co.kr/news/society/4987122)  
> 28. '다크모드=근시 유발?' 안과 교수들에게 직접 물어봄｜크랩 - YouTube, [https://www.youtube.com/watch?v=m_67BIzkN-w](https://www.youtube.com/watch?v=m_67BIzkN-w)  
> 29. 어두운 테마가 가독성이 떨어지는데도 왜 그렇게 인기가 많을까? : r/kde, [https://www.reddit.com/r/kde/comments/o0hz2i/why_are_dark_themes_so_popular_despite_poor/?tl=ko](https://www.reddit.com/r/kde/comments/o0hz2i/why_are_dark_themes_so_popular_despite_poor/?tl=ko)  
> 30. 색상과 명암 대비: 모두가 선명하게 볼 권리(5), [https://a11ystar.tistory.com/entry/%EC%83%89%EC%83%81%EA%B3%BC-%EB%AA%85%EC%95%94-%EB%8C%80%EB%B9%84-%EB%AA%A8%EB%91%90%EA%B0%80-%EC%84%A0%EB%AA%85%ED%95%98%EA%B2%8C-%EB%B3%BC-%EA%B6%8C%EB%A6%AC5](https://a11ystar.tistory.com/entry/%EC%83%89%EC%83%81%EA%B3%BC-%EB%AA%85%EC%95%94-%EB%8C%80%EB%B9%84-%EB%AA%A8%EB%91%90%EA%B0%80-%EC%84%A0%EB%AA%85%ED%95%98%EA%B2%8C-%EB%B3%BC-%EA%B6%8C%EB%A6%AC5)  
> 31. 웹 접근성 명암비 기준, 꼭 지켜야 할까? - 요즘IT, [https://yozm.wishket.com/magazine/detail/2901/](https://yozm.wishket.com/magazine/detail/2901/)  
> 32. WCAG 2.0 지침이 전하는 전경색과 배경색 명도 대비. - 정찬명, [https://naradesign.github.io/wcag-contrast.html](https://naradesign.github.io/wcag-contrast.html)  
> 33. 색상 및 대비 접근성 - web.dev, [https://web.dev/articles/color-and-contrast-accessibility?hl=ko](https://web.dev/articles/color-and-contrast-accessibility?hl=ko)  
> 34. 토스증권, 'PC 서비스' 정식 출시…MTS→WTS로 확장 - 위키리크스한국, [http://www.wikileaks-kr.org/news/articleView.html?idxno=155863](http://www.wikileaks-kr.org/news/articleView.html?idxno=155863)  
> 35. 토스증권, 웹트레이딩 서비스 정식 출시 PC로 더많은 투자정보, [https://www.hankyung.com/article/202407181804Y](https://www.hankyung.com/article/202407181804Y)  
> 36. 토스증권, 앱에서 PC로 확장…'WTS' 정식 출시 - Daum, [https://v.daum.net/v/20240718093803752?f=p](https://v.daum.net/v/20240718093803752?f=p)  
> 37. 토스증권, PC 서비스 정식 출시 - 한스경제, [http://www.hansbiz.co.kr/news/articleView.html?idxno=703566](http://www.hansbiz.co.kr/news/articleView.html?idxno=703566)  
> 38. 숲 - 아프리카 변경 이유 : SOOP 로고까지, [https://i-love-rt.tistory.com/entry/%EC%88%B2-%EC%95%84%ED%94%84%EB%A6%AC%EC%B9%B4-%EB%B3%80%EA%B2%BD-%EC%9D%B4%EC%9C%A0-SOOP-%EB%A1%9C%EA%B3%A0%EA%B9%8C%EC%A7%80](https://i-love-rt.tistory.com/entry/%EC%88%B2-%EC%95%84%ED%94%84%EB%A6%AC%EC%B9%B4-%EB%B3%80%EA%B2%BD-%EC%9D%B4%EC%9C%A0-SOOP-%EB%A1%9C%EA%B3%A0%EA%B9%8C%EC%A7%80)  
> 39. 스트리밍 플랫폼 아프리카TV, 'SOOP'으로 변경 - 지디넷코리아, [https://zdnet.co.kr/view/?no=20241015132635](https://zdnet.co.kr/view/?no=20241015132635)  
> 40. 아프리카TV 사명 ''숲(SOOP)'으로 변경…"글로벌 노린다" - 뉴스;트리, [https://www.newstree.kr/newsView/ntr202403290007](https://www.newstree.kr/newsView/ntr202403290007)  
> 41. 아프리카TV, SOOP으로 새출발…홈페이지 전면 개편 - 뉴시스, [https://mobile.newsis.com/view/NISX20241015_0002920850](https://mobile.newsis.com/view/NISX20241015_0002920850)
