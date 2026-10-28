> **원문 보존본** — kr-ui-styles 팩 `editorial`이 사례·근거 조회용으로 싣는 리서치 보고서다. **Claude 딥 리서치 산출물**을 사용자가 2026-10-28 제공했다(이전 kr-ui-guide 원문처럼 사용자가 직접 조사한 것이 아니다). 내보내기 흔적(이스케이프·단어 뒤 각주 번호)만 걷어냈고 내용은 고치지 않았다 — 각주 번호를 뺐으므로 참고 문헌 목록과의 대응은 사라졌다. 대비표의 출처(원문 각주 15)는 미확인 URL이어서 `editorial.md`가 공식으로 재계산한 값을 쓴다. 서체 라이선스는 `editorial.md` 표가 2026-10-28 공식 원문으로 다시 판정했다(29CM 에디토리얼·KoPubWorld는 [조건부], 마루 부리는 공식 페이지 확인으로 [자유 사용]). 규칙으로 쓸 것은 `editorial.md`·`editorial.tokens.json`이 갖는다 — 여기 문장을 그대로 규칙으로 인용하지 않는다.

# 에디토리얼·모노크롬 디자인 시스템 리서치 보고서: 2025~2026 한국 디지털 프로덕트 트렌드 진단 및 엔지니어링 설계 가이드라인

## 판정

에디토리얼·모노크롬 스타일은 2025~2026년 기준 한국 디지털 프로덕트 디자인 환경에서 부분적(패션·라이프스타일 커머스 및 고감도 큐레이션 미디어 도메인에 국한된 지배적 흐름)으로 유의미한 설계 양식이다.  
금융, 배달, 모빌리티 등 유틸리티 중심 서비스에서 표준으로 자리 잡은 토스(Toss) 계열의 기능주의 인터페이스를 전면 대체하는 것은 아니지만, 브랜드의 고유 감도와 콘텐츠 큐레이션을 핵심 경쟁력으로 내세우는 버티컬 플랫폼에서는 가장 유력한 시각적 차별화 전략으로 정착했다. 2024년 12월 W컨셉의 '발견' 탭 개편을 기점으로, 2026년 10월 29CM가 독자 개발한 전용 가변 서체인 '29CM 에디토리얼'을 웹·앱 전면에 전면 적용하면서 이커머스 업계의 독자적인 디자인 문법으로 자리매김했다. 최소 6개 이상의 국내 선도 플랫폼이 해당 양식을 핵심 사용자 경험에 채택하고 있으며, 단순한 시각적 유행을 넘어 브랜드 정체성을 전달하는 구조적 UI 패러다임으로 기능하고 있다.

## 대표 사례

국내 디지털 프로덕트 중 에디토리얼·모노크롬 양식을 채택한 대표 서비스와 글로벌 벤치마크 사례를 분석하여 화면 적용 양상과 도입 시기를 정리했다. 기존 업계에서 혼동하기 쉬운 무신사와 29CM의 포지셔닝 차이를 바로잡고, 해외 주요 브랜드의 성공 및 실패 요인을 비교군으로 제시한다.

| 서비스명 | 업종 | 적용 화면 | 도입·개편 시기 | 디자인 시스템 특이점 및 출처 |
| :---- | :---- | :---- | :---- | :---- |
| **29CM** | 패션·라이프스타일 커머스 | 모바일 앱 홈 피드, 브랜드 쇼케이스, 스페셜 오더, 상품 상세 | 2026년 10월 전면 적용 | 자체 개발 가변 서체 '29CM 에디토리얼' 도입, 산세리프-세리프 결합, 흑백 중심 레이아웃 |
| **W컨셉** | 패션·뷰티 커머스 | '발견' 탭, 브랜드 룩북 피드, 단독 기획전 화면 | 2024년 12월 전면 개편 | 잡지형 큐레이션 피드 신설, 0px 라운딩, 블랙 단일 CTA 및 오렌지-레드(#FF4600) 세일 강조색 |
| **무신사** | 패션 플랫폼 | **[현황 정정]** 메인 커머스 제외, '무신사 스냅' 및 한정판 래플 탭 | 상시 유지 (영역 국한) | 메인 커머스는 고밀도 카탈로그 산세리프 기능주의 유지. 감도 중심의 에디토리얼 톤은 29CM로 이원화 |
| **매거진 B** | 다큐멘터리 미디어·출판 | 공식 웹사이트, 디지털 아카이브 리딩 뷰어 | 지속 유지 | 인쇄 매거진의 디지털 재현, 세리프 헤드라인, 1:1 대칭 마진, 극단적 모노크롬 텍스트 뷰어 |
| **EQL** | 한섬 현대백화점 패션 커머스 | 메인 홈, 큐레이션 스토리텔링 화면 | 2022~2023 전면 개편 후 유지 | 빅폰트와 여백의 극단적 대비, 모노크롬 베이스에 단일 형광 오렌지 포인트, 매거진식 아티클 큐레이션 |
| **젠틀몬스터** | 아이웨어·글로벌 패션 | 글로벌 웹스토어 전체, 캠페인 화면 | 지속 유지 | UI 크롬의 극단적 소거, 풀블리드 사진 및 영상, 0px 각진 프레임, 텍스트의 극단적 소형화 |
| **SSENSE** *(해외 비교)* | 글로벌 럭셔리 커머스 | 웹스토어 및 모바일 앱 전반 | 지속 유지 | 완전한 0px 라운딩, 그림자 배제, 시스템 서체 기반의 극단적 플랫 흑백 그리드 |
| **ZARA** *(해외 비교)* | 글로벌 패스트 패션 | 모바일 앱 및 공식 웹사이트 홈·카탈로그 | 지속 유지 | 풀블리드 패션 화보형 레이아웃, 숨겨진 햄버거 메뉴, 탐색 복잡도로 인한 UX 이슈 동반 |

시장 내에서 무신사는 흔히 29CM와 함께 에디토리얼 플랫폼으로 묶여 언급되지만, 실제 무신사의 메인 쇼핑 환경은 신속한 대량 상품 탐색과 거래 전환 속도를 극대화한 고밀도 카탈로그 구조(8~16px 카드 라운딩, 2열 균등 그리드, 산세리프 단일 체계)를 고수하고 있다. 무신사는 볼륨 커머스의 효율성을 훼손하지 않기 위해 고감도 매거진 양식의 구현을 자회사 플랫폼인 29CM에 전면 일임하거나, 앱 내 커뮤니티 성격의 '스냅' 탭에만 엄격히 분리하여 운영하는 이원화 전략을 취하고 있다.

## 기본 스타일과의 차이

토스 계열의 절제된 기능주의와 에디토리얼·모노크롬 스타일은 화면 설계의 지향점 자체가 다르다. 전자가 사용자의 인지 부하를 최소화하여 단시간 내에 작업을 완료하도록 돕는 트랜잭션 중심이라면, 후자는 시각적 감상과 브랜드 세계관 탐색을 유도하는 브라우징 중심이다.

| 비교 축 | 기본 스타일 (토스 계열 절제된 기능주의) | 대상 스타일 (에디토리얼·모노크롬) |
| :---- | :---- | :---- |
| **중립색 (Neutrals)** | 블루-그레이 틴트 중립색 (#191F28, #333D4B, #8B95A1, #F2F4F6) 중심의 쿨톤 환경 | 틴트가 배제된 완전 무채색 순수 흑백 계열 (#000000, #111111, #333333, #CCCCCC, #FFFFFF) |
| **강조색 구조 (Accents)** | 고채도 블루 (#3182F6 등)를 인터랙션 전반의 기본 액션 색상으로 지정 | 기본 액션은 순수 블랙 (#000000), 강조색은 할인율·경고 등에만 단 1개 (#FF4600 등) 극도로 제한 |
| **타이포그래피** | Pretendard 등 화면 최적화 단일 산세리프 서체, 굵기(Weight) 중심의 안전한 위계 구조 | 세리프(명조)와 산세리프(고딕)의 의도적 혼용, 또는 가변 폰트 기반의 고대비 타이포그래피 |
| **모서리 곡률 (Radius)** | 카드 및 버튼 16~20px, 부드러운 둥근 모서리로 높은 접근성과 친근감 형성 | 0px (완전 직각) 기본 원칙, 최대 2~4px을 초과하지 않는 날카롭고 절제된 조형 |
| **깊이감 (Elevation)** | 저채도 다층 소프트 그림자 (box-shadow), Z축 레이어 기반 떠 있는 카드 표현 | 그림자 완전 배제 (box-shadow: none), 1px 헤어라인 테두리와 면 분할 기반 순수 평면(Flat) |
| **이미지·일러스트** | 친근한 3D 그래픽, 심플한 기능성 2D 벡터 일러스트, 정형화된 제품 썸네일 | 감도 높은 고해상도 룩북, 3:4/비정형 비율의 큰 사진, 필름 톤 색보정, 일러스트 철저 배제 |
| **레이아웃 밀도** | 균일한 8pt 그리드, 카드 중심의 규칙적 분리, 스크롤당 정량적 정보 노출 최적화 | 비대칭 그리드, 매거진식 단(Column) 구성, 56~80px에 달하는 파격적인 수직 여백 |

## 색

에디토리얼·모노크롬의 색채 체계는 순수 흑백의 콘트라스트를 기반으로 브랜드의 정제된 인상을 형성한다. 일반적인 프로덕트 디자인이 사용자 주의를 환기하기 위해 채도 높은 컬러 버튼을 활용하는 것과 달리, 이 스타일은 검은색 자체를 브랜드이자 메인 인터랙션 색상으로 승화시킨다.

### 대표 팔레트 및 중립색 단계

인터페이스의 기본 골격은 무채색 스케일로 구성되며, 각 단계는 엄격한 기능적 역할을 부여받는다.

| 단계 토큰명 | Hex 코드 | UI 역할 정의 |
| :---- | :---- | :---- |
| color-black | #000000 | 프라이머리 CTA 버튼 채움, 브랜드 워드마크, 대형 헤드라인 |
| color-neutral-900 | #111111 | 메인 본문 텍스트, 고대비 아이콘 스트로크 |
| color-neutral-800 | #1A1A1A | 헤더 내비게이션 라벨, 주요 상품명 |
| color-neutral-700 | #333333 | 보조 본문, 스펙 설명 텍스트 |
| color-neutral-500 | #767676 | 날짜, 카테고리 태그, 비활성 레이블 (WCAG AA 통과 최소 경계) |
| color-neutral-300 | #CCCCCC | 평면 디바이더 라인, 인풋 필드 아웃라인 |
| color-neutral-100 | #F5F5F5 | 룩북 썸네일 기본 백그라운드 박스, 검색창 배경 |
| color-white | #FFFFFF | 기본 캔버스 배경, 블랙 버튼 내 텍스트 라벨 |

### 강조색 수와 쓰임

강조색은 시스템 전체에서 오직 1종만을 엄격히 격리하여 사용한다. 패션 및 라이프스타일 커머스 표준으로 자리 잡은 오렌지-레드(accent-sale: #FF4600)는 오직 상품의 '할인율', '한정 드롭(Drop) 태그', '시스템 검증 오류'에만 국한하여 노출한다. 내비게이션 액티브 상태나 장바구니 담기, 기획전 배너 등 일반적인 유인 요소에는 강조색을 결코 사용하지 않으며, 계층의 구분은 서체의 굵기(font-weight: 700)와 면적 대비만으로 해결한다.

### 다크모드 처리

다크모드에서는 단순 명도 반전이 아닌 고대비 환경에서의 눈부심을 제어하는 평면 튜닝을 적용한다. 기저 캔버스에는 순수 블랙(#000000) 또는 딥 차콜(#111111)을 배치하며, 그림자를 통한 레이어 분리가 불가능하므로 #222222 또는 #2A2A2A 규격의 1px 솔리드 보더를 활용해 영역을 분할한다. 장문의 텍스트는 암전 환경에서 발생하기 쉬운 할레이션(빛 번짐) 현상을 억제하기 위해 순백색 대신 미세하게 톤 다운된 오프화이트(#E5E5E5)를 메인 본문 컬러로 지정한다.

### WCAG 명도 대비 측정 결과

텍스트와 배경의 조합은 WCAG 2.1 기준(일반 텍스트 4.5:1 이상, 18pt 이상 대형 텍스트 3.0:1 이상)을 충족해야 한다.

| 텍스트 색상 | 배경 색상 | 명도 대비 비율 (X:1) | WCAG AA (일반 텍스트) | WCAG AA (대형 텍스트) | WCAG AAA | 판정 및 가이드라인 |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| #000000 | #FFFFFF | **21.00 : 1** | PASS | PASS | PASS | 최상위 헤드라인, 메인 블랙 버튼 라벨 (완전 적합) |
| #111111 | #FFFFFF | **18.88 : 1** | PASS | PASS | PASS | 기본 본문 텍스트 (완전 적합) |
| #333333 | #FFFFFF | **12.63 : 1** | PASS | PASS | PASS | 보조 설명문, 상품 상세 스펙 (완전 적합) |
| #767676 | #FFFFFF | **4.54 : 1** | PASS | PASS | FAIL | 메타 정보 및 캡션의 하한선 (AA 기준 간헐적 통과) |
| #999999 | #FFFFFF | **2.85 : 1** | **FAIL** | **FAIL** | **FAIL** | **사용 금지 (가독성 기준치 미달로 시각 장애 유발)**15 |
| #CCCCCC | #FFFFFF | **1.61 : 1** | **FAIL** | **FAIL** | **FAIL** | 텍스트 사용 불가, 순수 장식용 디바이더 전용 |
| #FFFFFF | #000000 | **21.00 : 1** | PASS | PASS | PASS | 다크모드 디스플레이 헤드라인, 블랙 버튼 텍스트 |
| #E5E5E5 | #111111 | **14.99 : 1** | PASS | PASS | PASS | 다크모드 장문 본문 (빛 번짐 방지 최적화) |
| #888888 | #111111 | **5.33 : 1** | PASS | PASS | FAIL | 다크모드 캡션 및 서브 텍스트 |
| #767676 | #F5F5F5 | **4.17 : 1** | **FAIL** | PASS | FAIL | 연회색 박스 위 캡션 (18px 이상 대형 폰트만 허용) |

## 타이포

에디토리얼 스타일의 시각적 품격은 서체의 조형성과 크기 대비에서 비롯된다. 감도를 전달하는 타이틀 영역과 정보의 명확성이 요구되는 본문 영역의 서체를 이원화하여 배치하는 것이 시스템 구축의 핵심이다.

### 서체 구성 및 라이선스

인쇄 매거진의 서체 미학을 디지털 화면으로 전이하기 위해 상업적 이용이 가능한 오픈소스 및 전용 서체를 체계화한다.

| 서체 분류 | 서체명 | 저작권자 및 라이선스 | 특성 및 권장 UI 용도 | 원문 공식 URL |
| :---- | :---- | :---- | :---- | :---- |
| **국문 세리프** | **Noto Serif KR** | Google / Adobe (SIL OFL 1.1) | 굵기 선택폭이 넓고 자형 구조가 단단함. 대형 디스플레이 및 H1 헤드라인용 | https://fontsource.org/fonts/noto-serif-kr/about17 |
| **국문 세리프** | **마루 부리** | 네이버, 네이버문화재단 (SIL OFL 1.1) | 디지털 화면 가독성에 최적화된 온스크린 명조. 아티클 제목 및 인용구용 | https://hangeul.naver.com/font18 |
| **국문 세리프** | **KoPubWorld 바탕** | 한국출판인회의 (자체 상업 무료 라이선스) | 출판 인쇄 표준 구조를 계승. 장문형 스토리텔링 리딩 화면용 | https://www.kopus.org19 |
| **국문 전용 가변** | **29CM 에디토리얼** | 29CM (비영리 무료 배포, 상업용 사전 승인) | 굵기 300(산세리프)부터 800(세리프)까지 연속 전환되는 브랜드 전용 서체 | https://designcompass.org/2026/10/09/29cm-editorial-typeface/4 |
| **국문 산세리프** | **Pretendard** | 타입베이지 (SIL OFL 1.1) | 시스템 가독성 표준. 16px 이하 모든 본문, 가격, 버튼, 입력 폼 강제 적용 | https://github.com/orioncactus/pretendard |
| **영문 세리프** | **Cormorant Garamond** | Christian Thalmann (SIL OFL 1.1) | 전통적인 클래식 매거진 느낌의 고대비 세리프. 영문 헤더 및 브랜드 로고용 | https://fonts.google.com/specimen/Cormorant+Garamond |
| **영문 산세리프** | **Inter** | Rasmus Andersson (SIL OFL 1.1) | 중립적 스위스 스타일 산세리프. 영문 스펙, 테크니컬 메타데이터 표기용 | https://fonts.google.com/specimen/Inter |

### 화면 가독성 한계와 하이브리드 설계

한글 세리프(명조) 서체는 복잡한 모음과 자음의 결합 구조를 지니고 있어, 14px 이하의 작은 크기에서는 획 끝의 삐침(부리)이 뭉개지거나 서체 렌더링 힌팅(Hinting) 기술의 한계로 인해 가로획이 끊어지는 시각적 노이즈가 발생한다. 따라서 에디토리얼 디자인 시스템은 "20px 이상의 대형 타이틀에는 세리프를 적용하여 잡지의 우아한 감도를 살리고, 16px 이하의 본문, 가격 표기, 옵션 선택기, 시스템 레이블에는 산세리프(고딕)를 강제하는 하이브리드 타이포 규칙"을 엄격히 적용한다.

### 타입 스케일 및 세부 스펙

대형 디스플레이와 본문 간의 시각적 위계 격차를 극대화하기 위해 모듈러 스케일을 설정한다.

| 레벨 토큰명 | 크기 (px) | 굵기 (Weight) | 행간 (Line-height) | 자간 (Tracking) | 적용 서체 군 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| display | 44px | Regular (400) / Bold (700) | 120% (52.8px) | -0.03em (-1.32px) | Noto Serif KR / Cormorant Garamond |
| heading-1 | 32px | SemiBold (600) / Bold (700) | 130% (41.6px) | -0.025em (-0.8px) | Noto Serif KR / 마루 부리 |
| heading-2 | 24px | Medium (500) / SemiBold (600) | 135% (32.4px) | -0.02em (-0.48px) | 마루 부리 / Pretendard |
| heading-3 | 20px | SemiBold (600) | 140% (28.0px) | -0.02em (-0.4px) | Pretendard |
| body-1 | 16px | Regular (400) / Medium (500) | 160% (25.6px) | -0.015em (-0.24px) | Pretendard (스토리텔링 뷰어 시 마루 부리) |
| body-2 | 14px | Regular (400) / SemiBold (600) | 150% (21.0px) | -0.01em (-0.14px) | Pretendard (산세리프 강제) |
| caption | 12px | Medium (500) | 140% (16.8px) | 0.00em (영문 대문자 시 +0.05em) | Pretendard (산세리프 강제) |

Display(44px)와 Body 1(16px) 사이의 크기 비율은 **2.75 : 1**로, 일반 기능주의 앱의 대비율(약 1.75 : 1)에 비해 월등히 크며 이는 지면의 표지와 같은 강한 시각적 장악력을 형성한다. 한글 글리프의 공간적 응집력을 높이기 위해 모든 한글 텍스트 토큰에는 -0.2px에서 -0.4px 수준의 미세 음수 자간을 기본값으로 부여한다.

## 레이아웃·컴포넌트

레이아웃 설계는 떠 있는 카드 컴포넌트를 나열하는 방식에서 벗어나 지면의 평면 분할과 비대칭 리듬을 추구한다.

### 그리드 및 여백 시스템

모바일 인터페이스는 4 컬럼 그리드를 기반으로 좌우 마진 20px, 거터(Gutter) 12px을 사용한다. 데스크톱 뷰포트는 12 컬럼 체계 내에서 최대 너비 1440px 중앙 정렬을 취하며 좌우 마진 48~80px, 거터 24px을 적용한다. 전형적인 2열 균등 격자 배열을 피하고, 1열 풀블리드(Full-bleed) 대형 화보와 비대칭 2열 배치를 교차 배치하여 시선의 단조로움을 차단한다. 섹션 간 수직 간격은 일반 커머스 앱(24~32px)보다 2배 이상 넓은 **56~80px**을 부여함으로써 콘텐츠 덩어리 사이에 충분한 시각적 여백을 확보한다.

### 컴포넌트 형태 명세

모든 컴포넌트는 그림자를 배제하고 0px 직각 모서리를 채택하여 구조적 간결함을 유지한다.

| 컴포넌트 | 곡률 (Radius) | 테두리 (Border) | 그림자 (Box-shadow) | 내부 여백 및 구조적 규격 |
| :---- | :---- | :---- | :---- | :---- |
| **상품 카드** | 0px (Sharp) | none | none | 외곽 프레임 없이 이미지가 영역을 채우며, 텍스트는 하단에 플랫 배치 |
| **리스트 아이템** | 0px | 하단 1px solid #EEEEEE | none | 카드 박스를 두지 않고 헤어라인 구분선만으로 행을 분할 |
| **프라이머리 버튼** | 0px | none | none | 배경 #000000, 라벨 #FFFFFF, 높이 52px, 패딩 좌우 24px |
| **세컨더리 버튼** | 0px | 1px solid #111111 | none | 배경 투명, 라벨 #111111, 인터랙션 시 배경 블랙 반전 |
| **GNB / 내비게이션** | 0px | 하단 1px solid #EEEEEE | none | 불투명 배경 #FFFFFF, 블러 효과를 배제한 단단한 평면 바 |
| **입력 폼 (Input)** | 0px | 하단 1px solid #111111 또는 외곽 1px solid #CCCCCC | none | 배경 투명 또는 #F5F5F5, 포커스 시 테두리 #000000 즉각 전환 |

## 이미지·일러스트·아이콘

### 사진 연출 및 화면 보정 가이드

제품 사진은 단순 썸네일이 아닌 지면의 시각적 주인공으로 작동해야 하므로, 1:1 정방형 규격을 지양하고 모델의 전신과 착장 분위기를 온전히 담을 수 있는 **3:4 세로형** 또는 와이드 16:9 비율을 기본 채택한다.  
채도가 과장된 스튜디오 조명보다는 자연광 중심의 차분한 톤 앤 매너를 지향하며, 미세한 필름 그레인 질감을 살려 아날로그 감성을 보존한다. 흑백 사진은 기획전 챕터 헤더나 브랜드 인트로에 전략적으로 교차 배치하여 모노크롬 특유의 정제된 인상을 강화한다.

### 사진 중심 화면의 정보 위계 확보 전략

풀블리드 화보가 화면 전체를 지배할 때 상품 정보와 전환 액션이 시각적으로 매몰되는 현상을 방지하기 위해 3단계 정보 격리 원칙을 적용한다.  
첫째, 뷰포트 하단에 순백색(#FFFFFF) 100% 불투명 서피스로 마감된 높이 60px의 하단 고정 플로팅 바(Sticky Purchase Bar)를 배치하고 그 위에 0px 직각 블랙 버튼(#000000)을 상시 노출하여 최종 구매 전환(CTA) 경로를 확보한다.  
둘째, 룩북 사진 위에 상품명이나 가격을 불가피하게 오버레이해야 하는 경우, 이미지 하단 30% 영역에만 선형 그라디언트(linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%))를 얇게 깔아 텍스트의 가독성을 구조적으로 보호한다.  
셋째, 화보 화면 내부에 복잡한 옵션 셀렉트 박스를 노출하지 않고, '옵션 선택' 탭 시 화면 하단에서 날카로운 직각 형태의 트랜잭션 드로어(Transaction Drawer)가 솟아오르게 설계하여 감상 경험과 결제 입력 단계를 기능적으로 분리한다.

### 그래픽 자산 및 아이콘 스타일

앱 서비스에서 흔히 쓰이는 둥근 3D 캐릭터나 알록달록한 플랫 벡터 일러스트는 에디토리얼 무드를 즉각 훼손하므로 배제한다. 그래픽 요소가 반드시 필요한 경우에는 세밀한 단색 에칭 판화 기법이나 타이포그래피 심볼만을 제한적으로 허용한다.  
아이콘은 면을 채우는 솔리드(Filled) 형태를 금지하고, 정밀한 **1.0px~1.5px 아웃라인(Linear)** 형태를 유지한다. 아이콘 선 끝은 둥글리지 않고 직각(Square Cap)으로 마감하여 샤프한 형태감을 통일한다.

| 라이브러리명 | 라이선스 | 스트로크 및 디자인 특성 | 시스템 적용 방안 | 원문 공식 URL |
| :---- | :---- | :---- | :---- | :---- |
| **Lucide Icons** | ISC License | 1.0px~1.5px 가변 스트로크 제어 용이, 군더더기 없는 기하학적 형태 | 공통 시스템 내비게이션, 검색, 장바구니 아이콘 | https://lucide.dev24 |
| **Phosphor Icons** | MIT License | Thin, Light 등 초슬림 웨이트 지원, 모노라인 조형성 우수 | 상세 뷰어 도구, 소셜 공유, 미디어 컨트롤러 | https://phosphoricons.com25 |

## 모션

에디토리얼 스타일의 모션은 모바일 OS 특유의 물리 엔진(스프링 튕김, 통통 튀는 바운스)을 철저히 배제하고, 미술관의 도록을 정갈하게 넘기는 듯한 차분하고 단호한 가감속을 지향한다.

### 모션 전환 스펙

인터랙션은 빠르고 경쾌한 반응 대신 정돈된 안정감을 부여하도록 파라미터를 튜닝한다.

| 인터랙션 유형 | 전환 방식 (Type) | 지속 시간 (Duration) | 이징 곡선 (Easing) | 모션 철학 및 특이사항 |
| :---- | :---- | :---- | :---- | :---- |
| **페이지 진입** | 페이드 인 & 미세 수직 이동 (Y: 12px → 0px) | 350ms | cubic-bezier(0.16, 1, 0.3, 1) | 급격한 가속 후 지면 위에 안착하는 Out Expo 감속 |
| **이미지 스크롤 노출** | 클리핑 마스크 해제 및 오파시티 전환 | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | 갤러리 셔터가 열리듯 이미지가 서서히 드러나는 연출 |
| **바텀시트 / 모달 전개** | 슬라이드 업 (Y: 100% → 0%) | 300ms | cubic-bezier(0.32, 0.72, 0, 1) | 바운스 없는 절제된 감속 정지 |
| **버튼 탭 반응** | 색상 즉각 반전 (Black ↔ White) | 150ms | ease-out | 크기 변화(스케일 다운) 없이 면적 색상만 치환 |

## 적합/부적합 분야

에디토리얼·모노크롬 스타일은 시각적 몰입과 브랜드 감도를 비약적으로 상승시키는 반면, 정보 밀도와 신속한 작업 효율을 저하시킨다. 따라서 서비스의 본질적인 사용자 여정 목적에 따라 도입 여부를 신중히 판단해야 한다.

### 적합 분야

패션 디자이너 브랜드 및 럭셔리 편집숍(29CM, W컨셉, SSENSE 등)은 상품 자체가 높은 시각적 완성도를 지니며, 고객이 빠른 검색보다는 '취향 발견'과 '룩북 감상'을 목적으로 체류하므로 이 스타일에 가장 완벽히 부합한다. 공간 연출과 가구 배치가 중요한 하이엔드 인테리어 및 라이프스타일 커머스 역시 넓은 여백과 잡지식 스토리텔링이 단가를 정당화하는 핵심 수단이 된다.  
매거진 B와 같은 브랜드 미디어 및 독립 출판 서비스는 텍스트의 깊이 있는 독서가 주 목적이므로 세리프 서체와 모노크롬 평면이 인쇄 출판물의 신뢰성을 온전히 전달한다. 성분 나열보다 브랜드 철학과 시각적 무드가 구매 결정을 좌우하는 니치 향수 및 프리미엄 코스메틱 도메인에서도 뛰어난 시너지를 발휘한다.

### 부적합 분야

토스나 카카오뱅크 같은 핀테크 및 뱅킹 서비스에서는 0.1초 단위의 빠른 데이터 인지와 정확한 오조작 방지가 최우선이므로, 감성적인 세리프 폰트와 넓은 여백은 사용자의 인지 피로와 스크롤 저항을 극대화한다. 배달의민족이나 카카오 T 같은 온디맨드 유틸리티 서비스 역시 배고픔이나 이동 등 급박한 목적을 해결해야 하므로 화보형 그리드는 심각한 이탈을 초래한다.  
쿠팡이나 11번가 같은 종합 오픈마켓은 수만 명의 입점 판매자가 업로드하는 저품질·다채색 배너 이미지가 혼재하므로, 정제된 흑백 미학이 유지되지 못하고 레이아웃이 즉각 붕괴된다. 화면 하나에 수백 개의 지표와 상태값을 압축해 보여주어야 하는 B2B 엔터프라이즈 SaaS 대시보드 역시 0px 프레임과 비대칭 단 구성이 데이터 시인성을 심각하게 방해한다.

## 접근성·사용성 함정

심미적 완결성을 추구하는 과정에서 웹 콘텐츠 접근성 가이드라인(WCAG)과 인터페이스의 기본 조작성을 훼손하는 함정들이 발생하기 쉽다.

### 회색 텍스트 저대비로 인한 시각 접근성 탈락

미니멀한 인상을 연출하기 위해 날짜, 카테고리 태그, 부가 설명을 #999999 또는 #AAAAAA 같은 밝은 회색으로 처리하는 관행이 잦다. 흰색(#FFFFFF) 배경 위에 #999999를 올릴 경우 명도 대비율은 **2.85:1**에 불과하여 WCAG 2.1 AA 기준(4.5:1)을 명백히 위반한다.  
저시력자나 야외 환경의 사용자는 해당 텍스트를 거의 인식할 수 없게 된다. 따라서 보조 텍스트는 최소 #767676(4.54:1) 이상을 지정해야 하며, 14px 이하 작은 텍스트는 안전하게 #555555(7.46:1) 이상을 적용해야 한다.

### 한글 세리프 서체의 저해상도 뭉개짐

화보 감성을 살리기 위해 11~13px 크기의 옵션 텍스트나 시스템 라벨에까지 세리프(명조) 폰트를 적용할 경우, 서체 힌팅 한계로 인해 획이 부서지거나 자간이 엉겨 붙는 가독성 붕괴가 일어난다.  
화면 렌더링 품질을 방어하기 위해 세리프 적용은 **20px 이상의 헤드라인으로 제한**하고, 본문과 컴포넌트에는 시스템 산세리프를 강제하는 하이브리드 원칙을 시스템 차원에서 락(Lock)해야 한다.

### 미니멀 아이콘의 터치 타깃 미달

여백의 미를 살리기 위해 닫기(X), 뒤로가기, 장바구니 아이콘을 16~18px 크기의 얇은 단선으로 배치하고 시각적 박스를 완전히 지우는 설계가 흔히 목격된다. 이는 모바일 UI 표준인 **최소 터치 타깃 44×44pt (또는 48×48px)** 규정을 위반하여 반복적인 오터치를 유발한다. 아이콘 그래픽 자체의 시각적 크기는 20px을 유지하더라도, 투명한 히트박스 패딩(padding: 12px 이상)을 감싸 물리적 인터랙션 영역을 반드시 확보해야 한다.

### 자라(ZARA) 증후군: 형태 우선주의로 인한 정보 위계 붕괴

자라(ZARA)의 모바일 웹 및 앱은 과도한 패션 화보형 레이아웃을 도입한 결과, 클릭 가능한 영역(Affordance)이 모호해지고 상품 가격이 은폐되며 모델 컷 내에서 실제 판매 대상 상품이 무엇인지 파악하기 어려운 심각한 사용성 위기를 겪었다.  
심미성이 비즈니스 거래 기능을 압도하지 않도록, 모든 룩북 이미지 하단에는 상품명, 정가, 구매 가능 여부를 100% 불투명한 순백색 카드 내에 고정 배치하고 사진 영역과 결제 인터랙션을 분리해야 한다.

## 설계 토큰 초안

디자인과 개발 간의 일관된 구현을 위해 W3C 디자인 토큰 커뮤니티 그룹(DTCG) 규격을 준수한 설계 토큰 JSON 명세를 정의한다.

JSON  
{  
  "color": {  
    "canvas": {  
      "default": { "value": "#FFFFFF", "type": "color" },  
      "subtle": { "value": "#F5F5F5", "type": "color" },  
      "dark": { "value": "#111111", "type": "color" }  
    },  
    "text": {  
      "primary": { "value": "#111111", "type": "color" },  
      "secondary": { "value": "#555555", "type": "color" },  
      "muted": { "value": "#767676", "type": "color" },  
      "inverse": { "value": "#FFFFFF", "type": "color" }  
    },  
    "border": {  
      "subtle": { "value": "#EEEEEE", "type": "color" },  
      "default": { "value": "#CCCCCC", "type": "color" },  
      "strong": { "value": "#111111", "type": "color" }  
    },  
    "brand": {  
      "primary": { "value": "#000000", "type": "color" },  
      "inverse": { "value": "#FFFFFF", "type": "color" }  
    },  
    "accent": {  
      "sale": { "value": "#FF4600", "type": "color" },  
      "error": { "value": "#D0021B", "type": "color" }  
    }  
  },  
  "typography": {  
    "fontFamily": {  
      "serif": {  
        "value": "'Noto Serif KR', 'Maru Buri', serif",  
        "type": "fontFamily"  
      },  
      "sans": {  
        "value": "'Pretendard Variable', -apple-system, BlinkMacSystemFont, sans-serif",  
        "type": "fontFamily"  
      }  
    },  
    "scale": {  
      "display": {  
        "fontSize": { "value": "44px", "type": "dimension" },  
        "lineHeight": { "value": ".2", "type": "number" },  
        "fontWeight": { "value": "700", "type": "fontWeight" },  
        "letterSpacing": { "value": "-0.03em", "type": "dimension" },  
        "fontFamily": { "value": "{typography.fontFamily.serif}", "type": "fontFamily" }  
      },  
      "heading1": {  
        "fontSize": { "value": "32px", "type": "dimension" },  
        "lineHeight": { "value": ".3", "type": "number" },  
        "fontWeight": { "value": "600", "type": "fontWeight" },  
        "letterSpacing": { "value": "-0.025em", "type": "dimension" },  
        "fontFamily": { "value": "{typography.fontFamily.serif}", "type": "fontFamily" }  
      },  
      "heading2": {  
        "fontSize": { "value": "24px", "type": "dimension" },  
        "lineHeight": { "value": ".35", "type": "number" },  
        "fontWeight": { "value": "500", "type": "fontWeight" },  
        "letterSpacing": { "value": "-0.02em", "type": "dimension" },  
        "fontFamily": { "value": "{typography.fontFamily.sans}", "type": "fontFamily" }  
      },  
      "body1": {  
        "fontSize": { "value": "16px", "type": "dimension" },  
        "lineHeight": { "value": ".6", "type": "number" },  
        "fontWeight": { "value": "400", "type": "fontWeight" },  
        "letterSpacing": { "value": "-0.015em", "type": "dimension" },  
        "fontFamily": { "value": "{typography.fontFamily.sans}", "type": "fontFamily" }  
      },  
      "body2": {  
        "fontSize": { "value": "14px", "type": "dimension" },  
        "lineHeight": { "value": ".5", "type": "number" },  
        "fontWeight": { "value": "400", "type": "fontWeight" },  
        "letterSpacing": { "value": "-0.01em", "type": "dimension" },  
        "fontFamily": { "value": "{typography.fontFamily.sans}", "type": "fontFamily" }  
      },  
      "caption": {  
        "fontSize": { "value": "12px", "type": "dimension" },  
        "lineHeight": { "value": ".4", "type": "number" },  
        "fontWeight": { "value": "500", "type": "fontWeight" },  
        "letterSpacing": { "value": "0em", "type": "dimension" },  
        "fontFamily": { "value": "{typography.fontFamily.sans}", "type": "fontFamily" }  
      }  
    }  
  },  
  "spacing": {  
    "macroSection": { "value": "64px", "type": "dimension" },  
    "section": { "value": "48px", "type": "dimension" },  
    "group": { "value": "32px", "type": "dimension" },  
    "item": { "value": "16px", "type": "dimension" },  
    "micro": { "value": "8px", "type": "dimension" }  
  },  
  "borderRadius": {  
    "none": { "value": "0px", "type": "dimension" },  
    "subtle": { "value": "2px", "type": "dimension" }  
  },  
  "boxShadow": {  
    "none": { "value": " 0 0 0 transparent", "type": "shadow" }  
  },  
  "motion": {  
    "duration": {  
      "fast": { "value": "150ms", "type": "duration" },  
      "base": { "value": "300ms", "type": "duration" },  
      "slow": { "value": "400ms", "type": "duration" }  
    },  
    "easing": {  
      "standard": { "value": "cubic-bezier(0.25, 0.1, 0.25, 1)", "type": "string" },  
      "editorialReveal": { "value": "cubic-bezier(0.16, 1, 0.3, 1)", "type": "string" }  
    }  
  }  
}

## 불확실·의견이 갈리는 것

에디토리얼·모노크롬 스타일의 구축 및 유지보수 과정에서 업계 내 의견이 팽팽히 맞서거나 객관적 데이터 검증이 더 필요한 쟁점들을 정리한다.

### 에디토리얼 개편과 전환율(CVR)의 인과관계

고감도 화보 중심의 매거진 레이아웃이 브랜드 선호도, 체류 시간, 객단가(AOV)를 증대시킨다는 정성적 주장이 지배적이다. 반면 글로벌 패션 플랫폼에서는 지나친 비주얼 중심 설계가 즉각적인 장바구니 전환율(CVR)을 떨어뜨리고 이탈률을 높인다는 실무적 지적이 팽팽히 맞선다.  
국내 29CM, W컨셉 등 주요 플랫폼의 개편에 따른 구체적 거래액 증감이나 CVR 변동 수치는 기업 기밀로 분류되어 대외적으로 공식 발표된 1차 출처가 부재하며 객관적 수치 확인은 불가능하다(**미확인**).

### 본문(Body Copy) 영역의 한글 세리프 허용 범위

타이포그래퍼 진영에서는 화면 최적화 힌팅 기술이 적용된 최신 서체(네이버 마루 부리, 29CM 에디토리얼 등)의 경우 15~16px 본문에서도 잡지 같은 독서감을 제공하므로 적극적인 본문 세리프 적용을 권장한다.  
그러나 디지털 프로덕트 UX 엔지니어 진영에서는 스마트폰의 가변 해상도, OS별 안티에일리어싱 차이, 고령층 및 저시력자의 시인성을 고려할 때 본문 레벨에서의 세리프 강제는 치명적인 접근성 저하를 낳으므로 산세리프(고딕)만 엄격히 허용해야 한다고 맞선다.

### 다크모드 환경의 순수 블랙(#000000) 채택 논쟁

스타일 우선주의 진영에서는 모노크롬 철학의 연속성을 위해 OLED 디스플레이의 심도를 극대화하는 순수 블랙 캔버스를 고수해야 한다고 주장한다.  
반면 접근성 우선주의 진영에서는 완전 블랙 배경 위에 순백색(#FFFFFF) 텍스트가 얹힐 경우 발생하는 시각적 번짐(Halation Effect)과 눈의 피로도를 완화하기 위해 머티리얼 디자인 표준처럼 딥 차콜(#121212~#1E1E1E)을 기저에 깔아야 한다는 견해를 제시하고 있다.

## 참고 문헌

> 1. 뉴스1, "29CM 에디토리얼 서체… 산세리프·세리프 두 가지 포함", https://www.news1.kr/industry/distribution/631225114  
> 2. 전자신문, "29CM 브랜드 아이덴티티 및 전용 서체 공개", https://www.etnews.com/2026100700009928  
> 3. 한국섬유신문, "카테고리 확대 맞춰 BI 재정비… 전용 서체 '29CM 에디토리얼' 앱·웹 전면 적용", https://www.ktnews.com/news/articleView.html?idxno=1491263  
> 4. 애플 앱스토어, "입소문 - 맛집 추천 매거진 (킨포크·매거진B 스타일 에디토리얼 레이아웃)", https://apps.apple.com/us/app/%EC%9E%85%EC%86%8C%EB%AC%B8-%EB%A7%9B%EC%A7%91-%EC%B6%94%EC%B2%9C-%EB%A7%A4%EA%B1%B0%EC%A7%84/id6779589353?l=ko5  
> 5. 타이포그래피 서울, "모든 취향 곁에, 29CM 전용 가변 서체 이야기", https://typographyseoul.com/%EB%AA%A8%EB%93%A0-%EC%B7%A8%ED%96%A5-%EA%B3%81%EC%97%90-29cm/4  
> 6. 뉴시스, "'모든 취향 곁에' 29CM, 새 브랜드 메시지·전용 서체 공개", https://mobile.newsis.com/view/NISX20261007_000381705329  
> 7. 한국경제, "29CM, 새 태그라인 '모든 취향 곁에' 공개… 전용 서체도 선보여", https://www.hankyung.com/article/202610076939g30  
> 8. 한경비즈니스, "W컨셉 앱 UI·UX 전면 개편… 고감도 스타일링 콘텐츠 개인화", https://magazine.hankyung.com/business/article/202412069852b1  
> 9. 뉴시스, "W컨셉, '발견' 탭 및 스타일클립 신설 모바일 UI 개편", https://mobile.newsis.com/view/NISX20241206_00029874142  
> 10. 인사이트 데이터 랩, "시각화·인포그래픽에서 폰트 고르는 법 — 화면 해상도 환경에서의 명조체 가독성 한계", https://insight-data-lab.com/entry/%EC%8B%9C%EA%B0%81%ED%99%94%C2%B7%EC%9D%B8%ED%8F%AC%EA%B7%B8%EB%9E%98%ED%94%BD%EC%97%90%EC%84%9C-%ED%8F%B0%ED%8A%B8-%EA%B3%A0%EB%A5%B4%EB%8A%94-%EB%B2%95-%E2%80%94-%EB%AC%B4%EB%A3%8C-%EC%B6%94%EC%B2%9C-%ED%8F%B0%ED%8A%B8-%EC%B4%9D%EC%A0%95%EB%A6%AC23  
> 11. 슬로워크, "영문과 한글의 조화 및 본문·타이틀 웹폰트 가독성 비교", https://slowalk.com/222016  
> 12. 패션포스트, "젠틀몬스터 공간 및 온라인 브랜드 미학", http://fpost.co.kr/6  
> 13. 폰트소스, "Noto Serif KR 오픈소스 라이선스 및 글리프 안내", https://fontsource.org/fonts/noto-serif-kr/about17  
> 14. Everything Fonts, "Noto Serif KR SIL Open Font License 1.1 Specification", https://everythingfonts.com/font/noto-serif-kr20  
> 15. 멜론커피, "네이버 마루 부리 글꼴 오픈 폰트 라이선스(OFL) 안내", https://meloncoffee.com/%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A7%88%EB%A3%A8-%EB%B6%80%EB%A6%AC-%EA%B8%80%EA%BC%B4/18  
> 16. 태돈 폰트, "네이버 한글캠페인 마루 부리 라이선스 상세", https://fonts.taedonn.com/post/Maru+Buri21  
> 17. 한국출판인회의 서체 안내, "KoPubWorld 전자출판 공용서체 사용 약관 및 라이선스", https://angryfire.kr/entry/%ED%95%9C%EA%B8%80-KoPubWorld-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%B0%94%EB%A1%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%E2%AC%87%EF%B8%8E19  
> 18. 나무위키, "KoPub 서체 역사 및 저작권 약관 분석", https://namu.wiki/w/KoPub%20%EC%84%9C%EC%B2%B422  
> 19. 스웨긴 갤러리, "Editorial & Swiss Minimal Design Pattern Gallery", https://swaggin.dev/gallery/10  
> 20. 미디엄 (SSENSE-TECH), "Designing With Ambiguity: Establishing an Experience and Design Principles", https://medium.com/ssense-tech/designing-with-ambiguity-part-i-establishing-an-experience-and-design-principles-8a93a4157fe911  
> 21. 디아이투데이, "한섬 EQL UI/UX 전면 리뉴얼 프로젝트 케이스 스터디", https://ditoday.com/project/eql-ui-ux-%EC%A0%84%EB%A9%B4-%EB%A6%AC%EB%89%B4%EC%96%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/7  
> 22. 디자인컴퍼스, "29CM 에디토리얼 서체 특징과 가변 폰트 디자인 분석", https://designcompass.org/2026/10/09/29cm-editorial-typeface/8  
> 23. 오마이디자인, "W컨셉 디자인 시스템 분석: 흑백 모노크롬과 0px 라운딩의 미학", https://oh-my-design.kr/ko/design-systems/wconcept9  
> 24. 미디엄 (UX Collective), "ZARA: Is Everything Okay? Sincerely, a Lost Buyer", https://medium.com/@nidashah14/zara-is-everything-okay-sincerely-a-lost-buyer-bdf41c3fd81112  
> 25. 엘레켄, "Mobile UX Design Examples: Zara Editorial-Style Product Flow", https://www.eleken.co/blog-posts/mobile-ux-design-examples13  
> 26. 스크리브드, "ZARA Website Usability Benchmark and Navigation Analysis", https://www.scribd.com/document/640253822/Zara-Usability-Ashley-Prince27  
> 27. 스마트컨스트럭션툴, "Lucide Icons 오픈소스 ISC 라이선스 규정", https://smartconstructiontool.com/icons24  
> 28. 챌린존에듀, "피그마 추천 아이콘: Phosphor Icons MIT 라이선스 분석", https://challenzonedu.com/%ED%94%BC%EA%B7%B8%EB%A7%88-%EB%AC%B4%EB%A3%8C-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B6%94%EC%B2%9C-4/26  
> 29. 노멀로그, "웹 UI 개발자를 위한 오픈소스 아이콘 세트 라이선스 비교", https://note.com/easy_wand/n/nd283786449ae?hl=ko25

#### 참고 자료

> 1. W컨셉, 앱 UI·UX 전면 개편 '콘텐츠 커머스 도약' - 한경매거진&북, [https://magazine.hankyung.com/business/article/202412069852b](https://magazine.hankyung.com/business/article/202412069852b)  
> 2. W컨셉, 앱 UI·UX 전면 개편…"콘텐츠 커머스 도약" - 뉴시스, [https://mobile.newsis.com/view/NISX20241206_0002987414](https://mobile.newsis.com/view/NISX20241206_0002987414)  
> 3. 29CM, '취향 큐레이션' 넓힌다…브랜드 체계 재정비 - 한국섬유신문, [https://www.ktnews.com/news/articleView.html?idxno=149126](https://www.ktnews.com/news/articleView.html?idxno=149126)  
> 4. 모든 취향 곁에, 29CM - 타이포그래피 서울, [https://typographyseoul.com/%EB%AA%A8%EB%93%A0-%EC%B7%A8%ED%96%A5-%EA%B3%81%EC%97%90-29cm/](https://typographyseoul.com/%EB%AA%A8%EB%93%A0-%EC%B7%A8%ED%96%A5-%EA%B3%81%EC%97%90-29cm/)  
> 5. ‎입소문: 맛집 추천 매거진 앱 - App Store, [https://apps.apple.com/us/app/%EC%9E%85%EC%86%8C%EB%AC%B8-%EB%A7%9B%EC%A7%91-%EC%B6%94%EC%B2%9C-%EB%A7%A4%EA%B1%B0%EC%A7%84/id6779589353?l=ko](https://apps.apple.com/us/app/%EC%9E%85%EC%86%8C%EB%AC%B8-%EB%A7%9B%EC%A7%91-%EC%B6%94%EC%B2%9C-%EB%A7%A4%EA%B1%B0%EC%A7%84/id6779589353?l=ko)  
> 6. 패션포스트, [http://fpost.co.kr/](http://fpost.co.kr/)  
> 7. [https://ditoday.com/project/eql-ui-ux-%EC%A0%84%EB%A9%B4-%EB%A6%AC%EB%89%B4%EC%96%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/](https://ditoday.com/project/eql-ui-ux-%EC%A0%84%EB%A9%B4-%EB%A6%AC%EB%89%B4%EC%96%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/)  
> 8. [https://designcompass.org/2026/10/09/29cm-editorial-typeface/](https://designcompass.org/2026/10/09/29cm-editorial-typeface/)  
> 9. W컨셉 DESIGN.md — 색상·타이포그래피·컴포넌트, [https://oh-my-design.kr/ko/design-systems/wconcept](https://oh-my-design.kr/ko/design-systems/wconcept)  
> 10. Website design inspiration for coding agents - swaggin, [https://swaggin.dev/gallery/](https://swaggin.dev/gallery/)  
> 11. Designing With Ambiguity, Part I: Establishing An Experience And, [https://medium.com/ssense-tech/designing-with-ambiguity-part-i-establishing-an-experience-and-design-principles-8a93a4157fe9](https://medium.com/ssense-tech/designing-with-ambiguity-part-i-establishing-an-experience-and-design-principles-8a93a4157fe9)  
> 12. Zara, is everything okay? Sincerely, A lost buyer. \| by Nida Shah, [https://medium.com/@nidashah14/zara-is-everything-okay-sincerely-a-lost-buyer-bdf41c3fd811](https://medium.com/@nidashah14/zara-is-everything-okay-sincerely-a-lost-buyer-bdf41c3fd811)  
> 13. Mobile UX Design Examples from Apps that Convert (2026) - Eleken, [https://www.eleken.co/blog-posts/mobile-ux-design-examples](https://www.eleken.co/blog-posts/mobile-ux-design-examples)  
> 14. 29CM, 브랜드 메시지·전용 서체 공개…취향 큐레이션 정체성 강화, [https://www.news1.kr/industry/distribution/6312251](https://www.news1.kr/industry/distribution/6312251)  
> 15. [unknown_url](http://docs.google.com/unknown_url)  
> 16. 타이포그래피, 웹에서 어떻게 활용할까? - 슬로워크, [https://slowalk.com/2220](https://slowalk.com/2220)  
> 17. Noto Serif KR — Font Details & License \| Fontsource, [https://fontsource.org/fonts/noto-serif-kr/about](https://fontsource.org/fonts/noto-serif-kr/about)  
> 18. [무료폰트] 네이버 마루 부리 글꼴 – 메론커피의 하고 싶은 거 다 해, [https://meloncoffee.com/%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A7%88%EB%A3%A8-%EB%B6%80%EB%A6%AC-%EA%B8%80%EA%BC%B4/](https://meloncoffee.com/%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A7%88%EB%A3%A8-%EB%B6%80%EB%A6%AC-%EA%B8%80%EA%BC%B4/)  
> 19. [한글] KoPubWorld - 상업용 무료폰트, 바로 다운로드 ⬇︎, [https://angryfire.kr/entry/%ED%95%9C%EA%B8%80-KoPubWorld-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%B0%94%EB%A1%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%E2%AC%87%EF%B8%8E](https://angryfire.kr/entry/%ED%95%9C%EA%B8%80-KoPubWorld-%EC%83%81%EC%97%85%EC%9A%A9-%EB%AC%B4%EB%A3%8C%ED%8F%B0%ED%8A%B8-%EB%B0%94%EB%A1%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%E2%AC%87%EF%B8%8E)  
> 20. Noto Serif KR Font — Free Download & Preview, [https://everythingfonts.com/font/noto-serif-kr](https://everythingfonts.com/font/noto-serif-kr)  
> 21. 마루 부리 - 폰트 아카이브, [https://fonts.taedonn.com/post/Maru+Buri](https://fonts.taedonn.com/post/Maru+Buri)  
> 22. KoPub 서체 - 나무위키, [https://namu.wiki/w/KoPub%20%EC%84%9C%EC%B2%B4](https://namu.wiki/w/KoPub%20%EC%84%9C%EC%B2%B4)  
> 23. 시각화·인포그래픽에서 폰트 고르는 법 — 무료 추천 폰트 총정리, [https://insight-data-lab.com/entry/%EC%8B%9C%EA%B0%81%ED%99%94%C2%B7%EC%9D%B8%ED%8F%AC%EA%B7%B8%EB%9E%98%ED%94%BD%EC%97%90%EC%84%9C-%ED%8F%B0%ED%8A%B8-%EA%B3%A0%EB%A5%B4%EB%8A%94-%EB%B2%95-%E2%80%94-%EB%AC%B4%EB%A3%8C-%EC%B6%94%EC%B2%9C-%ED%8F%B0%ED%8A%B8-%EC%B4%9D%EC%A0%95%EB%A6%AC](https://insight-data-lab.com/entry/%EC%8B%9C%EA%B0%81%ED%99%94%C2%B7%EC%9D%B8%ED%8F%AC%EA%B7%B8%EB%9E%98%ED%94%BD%EC%97%90%EC%84%9C-%ED%8F%B0%ED%8A%B8-%EA%B3%A0%EB%A5%B4%EB%8A%94-%EB%B2%95-%E2%80%94-%EB%AC%B4%EB%A3%8C-%EC%B6%94%EC%B2%9C-%ED%8F%B0%ED%8A%B8-%EC%B4%9D%EC%A0%95%EB%A6%AC)  
> 24. 건설현장 무료 계산기 번역기 똑똑도구, [https://smartconstructiontool.com/icons](https://smartconstructiontool.com/icons)  
> 25. [2026년판]Notion 아이콘 설정 방법 및 선택 방법｜무료로 사용할 수, [https://note.com/easy_wand/n/nd283786449ae?hl=ko](https://note.com/easy_wand/n/nd283786449ae?hl=ko)  
> 26. 피그마 무료 아이콘 플러그인 추천 4 - 챌린즈온 브랜딩 아카데미, [https://challenzonedu.com/%ED%94%BC%EA%B7%B8%EB%A7%88-%EB%AC%B4%EB%A3%8C-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%B6%94%EC%B2%9C-4/](https://challenzonedu.com/%ED%94%BC%EA%B7%B8%EB%A7%88-%EB%AC%B4%EB%A3%8C-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%B6%94%EC%B2%9C-4/)  
> 27. Zara Swimwear Website Usability Review \| PDF - Scribd, [https://www.scribd.com/document/640253822/Zara-Usability-Ashley-Prince](https://www.scribd.com/document/640253822/Zara-Usability-Ashley-Prince)  
> 28. 29CM, 브랜드 메시지·전용 서체 공개…취향 큐레이션 정체성 강화, [https://www.etnews.com/20261007000099](https://www.etnews.com/20261007000099)  
> 29. '모든 취향 곁에' 29CM, 새 브랜드 메시지·전용 서체 공개 - 뉴시스, [https://mobile.newsis.com/view/NISX20261007_0003817053](https://mobile.newsis.com/view/NISX20261007_0003817053)  
> 30. 29CM, 새 태그라인 모든 취향 곁에 공개…전용 서체도 선보여 - 한국경제, [https://www.hankyung.com/article/202610076939g](https://www.hankyung.com/article/202610076939g)
