> **원문 보존본** — kr-ui-styles 팩 `neo-brutal`이 사례·근거 조회용으로 싣는 리서치 보고서다(원문 제목은 「뉴트로·Y2K·네오 브루탈리즘」 — 한국식 뉴트로 열은 `kitsch` 팩이 흡수했고 이 팩은 글로벌 네오브루탈리즘 열을 쓴다). **Claude 딥 리서치 산출물**을 사용자가 2026-10-28 제공했다. 내보내기 흔적(이스케이프·단어 뒤 각주 번호·컴포넌트 표 hex 뒤에 붙은 각주 번호)만 걷어냈고 내용은 고치지 않았다 — 각주 번호를 뺐으므로 참고 자료 목록과의 대응은 사라졌다. 대비표 10행의 출처(33번)는 미확인 URL이어서 `neo-brutal.md`가 공식으로 재계산한 값을 쓴다(10행 전부 일치). 원문이 44×44px의 근거로 든 WCAG 2.2 SC 2.5.8은 24×24px 최소 기준이고 44×44는 SC 2.5.5다 — 보존본은 고치지 않았고 `neo-brutal.md`가 정정했다. 서체 라이선스 표는 `neo-brutal.md`가 2026-10-28 공식 원문으로 다시 판정했다 — 우아한형제들 배포본 2종은 공식 조항을 읽을 수 없어 [검증 필요]이고 팩은 Google Fonts OFL 수록본(Do Hyeon)을 쓴다. 팔레트는 디자인 시스템 프롬프트·미확인 URL이 출처라 팩은 강조색을 기본값으로 쓰지 않는다. 규칙으로 쓸 것은 `neo-brutal.md`·`neo-brutal.tokens.json`이 갖는다 — 여기 문장을 그대로 규칙으로 인용하지 않는다.

# 뉴트로·Y2K·네오 브루탈리즘 디지털 프로덕트 인터페이스 설계 사양서

## 판정: 2025~2026년 한국 시장에서의 유의미성

2025~2026년 기준 한국 디지털 프로덕트 인터페이스 환경에서 뉴트로·Y2K·네오 브루탈리즘 스타일의 실질적 유효성은 서비스 전체를 관통하는 기반 디자인 시스템이 아닌, 특정 타깃과 맥락에 전략적으로 편입되는 '부분(Partial)'적 흐름으로 판정된다. 국내 대다수 IT 기업과 엔터프라이즈 프로덕트는 토스(Toss)가 구축한 절제된 기능주의—블루-그레이 틴트 중립색, 단일 고채도 강조색, 16~20px 수준의 넉넉한 모서리 곡률, 다층 소프트 섀도—를 보편적 표준으로 삼고 있다. 극단적인 외곽선과 채도를 내세우는 브루탈리즘 문법은 일상적 정보 탐색 과정에서 시각적 인지 피로를 누적시키기 때문에 범용적인 코어 인터페이스로 확장되기에는 본질적인 제약이 따른다.  
그러나 10대와 20대 초반 사용자를 타깃으로 삼는 마이크로 서비스, 버티컬 커머스의 기획전, 크리에이터 이코노미, 메타버스 가상 오피스 영역에서는 2022년 글로벌 태동기 이후 지속적으로 소비되며 고유한 영역을 확보했다. 특히 규격화된 플랫 미니멀리즘에 단조로움을 느끼는 세대에게 강렬한 촉각적 상호작용과 시각적 개성을 부여하는 도구로서 그 가치가 입증되고 있다.  
국내 인터페이스 디자인 생태계에서 이 스타일은 전면 적용 모델과 부분적 프로모션 모델로 뚜렷하게 나뉜다. 서비스 UI 전체에 네오 브루탈리즘을 적용한 사례는 ZEP과 같이 픽셀 아트 세계관과 결합된 가상 플랫폼이나 기술 스튜디오의 디자인 쇼케이스(DUOLABS Betelgeuse 등)에 집중되어 있다. 반면 대규모 트래픽을 처리하는 커머스 및 금융 플랫폼에서는 서비스의 핵심 사용성을 해치지 않기 위해 토스 유스 홈, 29CM 스페셜 쇼케이스, 무신사 드롭 런칭 화면 등 브랜드 캠페인과 마케팅 랜딩 페이지에 국한하여 모듈 형태로 변주하는 방식을 취한다.  
국내에서 소비되는 양식은 서구권에서 유래한 '글로벌 네오 브루탈리즘'과 한국의 시대적 정서를 반영한 '한국식 뉴트로(K-Newtro/Y2K)'로 상호 분화되어 발전했다. 글로벌 네오 브루탈리즘이 1950년대 건축적 브루탈리즘의 솔직함과 1990년대 웹 초창기의 투박한 HTML 요소를 현대적 그리드 시스템 위에 재해석한 산물이라면, 한국식 뉴트로는 1970~1990년대 근대 골목길의 인쇄 활판, 아날로그 간판 타이포그래피, 2000년대 싸이월드 비트맵 감성이 결합된 정서적 키치(Kitsch) 미학에 가깝다.

| 구분 축 | 글로벌 네오 브루탈리즘 (Neo-Brutalism) | 한국식 뉴트로 (K-Newtro / Y2K) |
| :---- | :---- | :---- |
| **조형적 기원** | 건축적 브루탈리즘 구조 노출 및 90년대 초기 웹 원시성 | 7090 인쇄 활판 골목 간판 및 2000년대 도트 그래픽 |
| **핵심 조형 요소** | 2~4px 검은 테두리, 블러 0px 오프셋 하드 섀도, 기하학적 도형 | 픽셀 비트맵 아트, 레트로 스티커, 인쇄 핀 어긋남(Misregister) 질감 |
| **색채 전략** | 네온 옐로, 사이언, 마젠타 등 형광 원색 평면 블록 대조 | 빛바랜 원색, 웜그레이 및 세피아 틴트, 파스텔 Y2K 톤 |
| **디자인 정서** | 시스템 규격에 대한 위트 있는 반항, 기능적 솔직함, 팝아트 | 유년기 아날로그 향수(Nostalgia), B급 유머, 따뜻하고 친근한 키치 |
| **적용 영역** | SaaS 랜딩, 개발자 도구, 크리에이터 마켓플레이스 | 프로모션 팝업, 레트로 패션 기획전, 게이미피케이션 플랫폼 |

## 대표 사례: 국내외 서비스 적용 현황

국내 프로덕트는 브랜드의 차별화된 태도를 각인시키기 위해 Z세대의 접점 화면이나 특정 기획전에 한해 선별적으로 이 스타일을 배치하고 있으며, 해외 서비스는 프로덕트의 상거래 엔진과 워크플로우 전반에 네오 브루탈리즘 시스템을 깊숙이 안착시키고 있다.

| 서비스명 | 국적 | 업종 | 적용 화면 | 도입·개편 시기 | 출처 및 설계 특징 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **토스 유스 (Toss Youth)** | 국내 | 핀테크 / 청소년 금융 | 만 14세 미만 전용 '유스 홈' 대시보드, 유스카드 신청 인터페이스, 이벤트 | 2021년 12월 론칭 후 2024~2025년 지속 고도화 | 비바리퍼블리카 공식. 토스의 절제된 기능주의 틀 안에서 틴(Teen) 세그먼트를 위해 볼드한 외곽선과 레트로 토이 스티커 메타포를 국소 결합. |
| **29CM 스페셜 오더** | 국내 | 패션 / 라이프스타일 셀렉트숍 | 브랜드 쇼케이스 인터랙티브 뷰, Y2K 스트리트 패션 팝업 페이지 | 2023년부터 상시 캠페인 엔진으로 운영 | 무신사 29CM 공식. 비대칭 벤토 그리드와 포스터형 거대 타이포그래피, 하드 프레임을 결합해 패션 카탈로그의 지루함을 파괴. |
| **ZEP (젭)** | 국내 | 메타버스 / 가상 협업 플랫폼 | 서비스 코어 UI 전체 (사이드바 메뉴, HUD, 인게임 시스템 모달) | 2021년 11월 베타 이후 2024~2026년 상용화 | 슈퍼캣·제페토 합작사 공식. 2D 도트 맵 환경과 동기화된 비트맵 픽셀 UI, 고대비 단색 테두리 창, 레트로 OS 제어 인터페이스 구축. |
| **에픽 (EPIK)** | 국내 | AI 사진 편집 / 카메라 | 'AI 이어북(Yearbook)', 90s 레트로 프로필 생성 플로우 | 2023년 하반기 출시 후 2024~2025년 테마 확장 | 스노우 공식. 1990년대 미국 빈티지 졸업앨범 서식과 레트로 다이얼로그 박스 레이아웃을 컴포넌트화하여 바이럴 유도. |
| **배민문방구 기획전** | 국내 | 이커머스 / 배달 플랫폼 | 브랜드 굿즈 상세 뷰, 프로모션 마이크로사이트 | 2010년대 중반 정립 후 정기 업데이트 | 우아한형제들 공식. 근대 인쇄 활판 기반의 배민 고딕 서체와 만화풍 외곽선, 단색 면 분할을 결합한 K-뉴트로의 초기 원형. |
| **DUOLABS Betelgeuse** | 국내 | 소프트웨어 개발 / 디자인 시스템 | 기업 웹사이트 쇼케이스 및 공식 컴포넌트 라이브러리 | 2024~2026년 공개 및 배포 | 듀오랩스 공식 기술 리포트. 국내 환경에 맞춰 버튼, 폼 인풋, 카드 컴포넌트를 네오 브루탈리즘 규격으로 모듈화한 디자인 시스템. |
| **검로드 (Gumroad)** | 해외 (미국) | 크리에이터 디지털 커머스 | 마케팅 랜딩, 판매자 대시보드, 체크아웃 결제 모달 전체 | 2021년 전면 리뉴얼 후 2026년 현재 운영 | Gumroad 공식. 글로벌 네오 브루탈리즘 붐의 진원지. 3px 순검정 보더, 2~5px 하드 오프셋 섀도, 형광 핑크와 옐로 면을 제품 전체에 일관되게 적용. |
| **neobrutalism.dev** | 해외 (오픈소스) | 프론트엔드 UI 컴포넌트 시스템 | Shadcn UI 기반 React 웹 컴포넌트 시스템 전체 | 2023년 공개 이후 2025~2026년 지속 배포 | GitHub 오픈소스 프로젝트. Tailwind CSS 환경에서 블러 없는 그림자와 테두리 토큰을 체계화하여 글로벌 웹에 구현 표준 제시. |

## 기본 스타일과의 차이: 7축 비교

한국 디지털 프로덕트의 기본 표준인 토스 계열의 절제된 기능주의와 뉴트로·브루탈 스타일의 설계 매개변수를 7가지 시각 조형 축으로 상호 비교 분석한다.

| 설계 축 | 기본 스타일 (토스형 기능주의) | 뉴트로·브루탈 스타일 |
| :---- | :---- | :---- |
| **중립색 (Neutrals)** | 블루-그레이 틴트의 정밀한 다단계 스케일 (#191F28, #333D4B, #8B95A1, #F2F4F6). 계조의 은은한 감쇠로 정보 위계 확립. | 순검정과 순백, 웜 오프화이트 위주의 극단적 구성 (#000000, #FFFFFF, #FFFDF8). 중간 회색 조색을 배제하고 경계선으로 면 분할. |
| **강조색 구조 (Accents)** | 고채도 단일 강조색(Toss Blue #0064FF 등)을 CTA와 주요 인터랙션 상태에 절제하여 집중 배치. | 네온 옐로, 사이언, 핫핑크, 라임 등 2~3종의 고채도 단색 면을 컨테이너 배경과 카드 레이블에 동시 전개. |
| **타이포그래피 (Typography)** | Pretendard 단일 가변 서체. 자간 -0.02em, 정교한 광학 보정, 서술 가독성과 기능적 정렬 극대화. | 거대 디스플레이 볼드 산세리프(Syne, Archivo Black) 및 레트로 픽셀/복고 활판 서체(Neo둥근모, 배민체)의 전략적 혼용. |
| **라운딩 (Border Radius)** | 카드 16~20px, 버튼 8~12px. 부드럽고 유기적인 스퀴클(Squircle) 곡면으로 친근하고 안전한 감각 전달. | 원칙적 0px(날카로운 직각) 또는 기계적인 2~4px 마이크로 라운딩. 부드러운 곡률을 거부하고 물리적 각을 강조. |
| **깊이감 (Depth & Shadows)** | 다층 저채도 소프트 섀도 (rgba(0,0,0,0.04) 중심의 넓은 블러 반경). 자연광 환경의 부유감 시뮬레이션. | 블러 0px의 단색 오프셋 하드 섀도 (box-shadow: 4px 4px 0 0 #000). 판화 인쇄나 물리적 종이 블록이 겹친 평면적 깊이감. |
| **이미지·일러스트 (Assets)** | 정제된 3D 렌더링 아이콘, 은은한 서피스 그라디언트, 사실적인 고해상도 인물 및 제품 사진. | 외곽선 스티커 누끼, 레트로 8비트 픽셀 아트, 듀오톤/하프톤 망점 질감, 90년대 클립아트 및 OS 그래픽. |
| **레이아웃 밀도 (Density)** | 넉넉한 네거티브 스페이스(여백), 8pt 기반의 카드 독립 분리, 시각 인지 부하를 최소화하는 낮은 정보 밀도. | 고밀도 벤토 그리드(Bento Grid), 요소 간 과감한 중첩(Overlap), 두꺼운 보더의 집적으로 형성되는 긴장감 있는 정보 배치. |

## 색: 대표 팔레트 및 WCAG 접근성 대비

뉴트로·브루탈 스타일의 색채 체계는 부드러운 그라데이션이나 반투명 알파값을 배제하고, 구조적 흑백 뼈대 위에 2~3개의 고채도 단색 면을 얹는 범주적(Categorical) 분할 방식을 따른다. 모든 표면은 독립된 물리적 물체처럼 인식되어야 하며, 색상은 배경의 분위기를 만드는 것이 아니라 영역의 경계를 확정하는 구조재로 기능한다.  
다크모드 환경에서는 전통적인 회색 단계 감쇠 방식을 취하지 않는다. 캔버스 배경을 칠흑색(#121212 또는 #000000)으로 반전시키며, 모든 콤포넌트의 외곽선(Stroke)은 순검정에서 순백색(#FFFFFF) 또는 형광 네온 컬러(#FFE600)로 치환된다. 특히 그림자 요소는 검은색 오프셋 대신 고채도 액센트 컬러(box-shadow: 4px 4px 0 0 #FFE600)를 투사하여 어둠 속에서 발광하는 네온 간판의 촉각적 깊이감을 연출한다.

| 색상 토큰명 | Hex 코드 | 역할 및 용도 |
| :---- | :---- | :---- |
| **Structure Black** | #000000 | 모든 콤포넌트 외곽선(Border), 본문 텍스트, 하드 섀도 기본색 |
| **Canvas Off-White** | #FFFDF8 | 메인 페이지 배경 캔버스 (순백색 대비 시각 눈부심 완화) |
| **Surface White** | #FFFFFF | 카드 내부 컨테이너, 텍스트 인풋 필드 배경 |
| **Dark Canvas** | #121212 | 다크모드 메인 캔버스 표면 |
| **Primary Accent (Neo Yellow)** | #FFE600 | 메인 CTA 버튼 배경, 하이라이트 뱃지, 중요 카드 강조 |
| **Secondary Accent (Bright Cyan)** | #00F0FF | 보조 액션 버튼, 태그, 정보성 상태 블록 |
| **Tertiary Accent (Neon Pink)** | #FF69B4 | 이벤트 배너, 알림 레이블, 브랜드 포인트 |
| **Status Accent (Vibrant Lime)** | #4ADE80 | 성공 알림, 승인 상태 칩 |
| **Interactive Blue (Electric Blue)** | #3366FF | 키보드 접근성 포커스 링, 링크 호버 상태 |

상대 휘도(Relative Luminance) 산출 공식에 따라 측정된 텍스트-배경 조합의 WCAG 2.2 명도 대비값은 다음과 같다. 네오 브루탈리즘의 특성상 고채도 유채색 위에 글자를 얹을 때의 명도 관리가 인터페이스 생존성을 결정한다.

| 전경색 (Text / Icon) | 배경색 (Background) | 명도 대비비 | WCAG 2.2 기준 적합도 | 실무 적용 지침 |
| :---- | :---- | :---- | :---- | :---- |
| #000000 (Structure Black) | #FFFFFF (Surface White) | 21.00:1 | **AAA 통과** | 모든 일반 본문 및 데이터 테이블 기본값 |
| #000000 (Structure Black) | #FFFDF8 (Canvas Off-White) | 20.66:1 | **AAA 통과** | 페이지 전역 서술형 텍스트 표준 |
| #000000 (Structure Black) | #FFE600 (Neo Yellow) | 16.57:1 | **AAA 통과** | 옐로 버튼 내부의 텍스트 및 아이콘 |
| #000000 (Structure Black) | #00F0FF (Bright Cyan) | 14.91:1 | **AAA 통과** | 사이언 정보 칩 텍스트 |
| #000000 (Structure Black) | #4ADE80 (Vibrant Lime) | 12.05:1 | **AAA 통과** | 라임 뱃지 텍스트 |
| #000000 (Structure Black) | #FF69B4 (Neon Pink) | 7.93:1 | **AAA 통과** | 핑크 태그 텍스트 |
| #FFFFFF (Surface White) | #3366FF (Electric Blue) | 4.68:1 | **AA 통과** | 블루 버튼 내 화이트 텍스트 허용 |
| #000000 (Structure Black) | #3366FF (Electric Blue) | 4.49:1 | **부분 미달** | 18pt 이상 대형 텍스트만 통과 (본문 사용 금지) |
| #FFFFFF (Surface White) | #FFE600 (Neo Yellow) | 1.27:1 | **FAIL (심각한 위반)** | 절대 사용 금지 (실무 다빈도 디자인 오류) |
| #FFFFFF (Surface White) | #FF69B4 (Neon Pink) | 2.65:1 | **FAIL (심각한 위반)** | 절대 사용 금지 (시각 식별 불가) |

## 타이포: 서체 시스템 및 활자 스케일 규격

뉴트로·브루탈 타이포그래피는 '시각적 선언으로서의 포스터형 디스플레이'와 '정보 전달을 위한 고신뢰 시스템 본문'의 의도적 단절과 이원화를 근간으로 삼는다. 제목 텍스트는 인터페이스의 공간을 물리적으로 점유하는 그래픽 블록처럼 취급되며, 일반적인 본문 텍스트는 사용자에게 익숙한 현대적 고딕 서체를 통해 가독성을 보장해야 한다.  
국내 실무 환경에서는 헤드라인을 담당하는 한글 복고체 및 영문 디스플레이 서체와 운영 화면을 지탱하는 본문용 본고딕/Pretendard를 명확히 분리하여 바인딩한다.

| 서체명 | 언어 구분 | 권장 적용 역할 | 라이선스 종류 | 공식 원문 URL |
| :---- | :---- | :---- | :---- | :---- |
| **Neo둥근모 (NeoDunggeunmo)** | 한글 / 영문 | Y2K 레트로 픽셀 헤드라인, 메타버스 HUD, 뱃지 | SIL Open Font License 1.1 (상업적 무료, 단독 판매 금지) | https://neodgm.dalgona.dev |
| **배민 한나는 열한살체** | 한글 / 영문 | K-뉴트로 키치 타이틀, 프로모션 대형 헤더 | 우아한형제들 자유 라이선스 (상업적 무료, 단독 판매 금지) | https://www.woowahan.com/fonts |
| **배민 도현체** | 한글 / 영문 | 볼드한 한글 인쇄 간판풍 제목, 숫자 데이터 강조 | 우아한형제들 자유 라이선스 (상업적 무료, 단독 판매 금지) | https://www.woowahan.com/fonts |
| **Syne / Archivo Black** | 영문 전용 | 글로벌 네오 브루탈리즘 영문 헤드라인 및 배너 | SIL Open Font License 1.1 | https://fonts.google.com |
| **Pretendard** | 한글 / 영문 | 기능성 본문, 데이터 그리드, 인풋 입력값, 툴팁 | SIL Open Font License 1.1 | https://github.com/orioncactus/pretendard |

계층 간의 시각적 긴장감을 형성하기 위해 디스플레이 타이틀과 본문 간의 크기 대비 비율은 최소 2.5:1 이상으로 과감하게 벌려야 한다. 제목은 시선의 앵커 역할을 맡고 본문은 여유로운 행간을 확보하여 굵은 외곽선이 주는 압박감을 상쇄한다.

| 텍스트 역할 | 크기 (px) | 굵기 (Weight) | 행간 (Line-height) | 자간 (Letter-spacing) | 추천 패밀리 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Display Hero** | 56~64px | 800~900 (Extra Bold/Black) | 110% (1.1) | -0.04em | Syne, 배민 도현체 |
| **Title H1** | 36~40px | 800 (Bold) | 120% (1.2) | -0.03em | 배민 한나는열한살체, Syne12 |
| **Title H2 (Section)** | 24~28px | 700 (Bold) | 130% (1.3) | -0.02em | Pretendard Bold, Neo둥근모 |
| **Body Large** | 18px | 500 (Medium) | 160% (1.6) | 0.00em | Pretendard12 |
| **Body Regular** | 15~16px | 400 (Regular) | 165% (1.65) | 0.00em | Pretendard12 |
| **Caption / Badge** | 12~13px | 700 (Bold) | 130% (1.3) | +0.02em | Pretendard, Space Grotesk |

## 레이아웃 및 컴포넌트 설계 명세

네오 브루탈리즘 컴포넌트는 모든 상태에서 자신의 외곽 테두리와 오프셋 그림자를 통해 물리적 존재감을 드러낸다. 부드럽게 배경에 묻히는 카드는 배제되며, 독립적인 판화 스탬프가 얹힌 것과 같은 구조적 명확성을 확립해야 한다.  
그리드 시스템은 8pt 배수 체계를 엄격히 따르되, 두꺼운 외곽선이 유발하는 시각적 무게를 해소하기 위해 카드 내부 패딩은 기본 24px, 섹션 간격은 48~64px의 넉넉한 여백을 배정한다. 테두리와 여백이 충돌하지 않도록 컴포넌트 박스 모델은 반드시 box-sizing: border-box로 고정한다.

| 컴포넌트 | 테두리 (Border) | 코너 반경 (Radius) | 오프셋 하드 섀도 (Shadow) | 배경 및 상태 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **Standard Card** | 3px solid #000000 | 0px (원칙) / 2px | 5px 5px 0 0 #000000 | #FFFFFF 또는 #FFFDF8 배경 |
| **Featured Card** | 3px solid #000000 | 0px | 8px 8px 0 0 #000000 | #FFE600 단색 면, 마진 16px 이상 분리 |
| **Primary CTA Button** | 3px solid #000000 | 0px | 4px 4px 0 0 #000000 | #FFE600 배경, 클릭 시 그림자 소멸 |
| **Secondary Button** | 2px solid #000000 | 0px | 3px 3px 0 0 #000000 | #FFFFFF 배경, 클릭 시 3px 평행 이동 |
| **Input / Form Field** | 2px solid #000000 | 0px | 3px 3px 0 0 #000000 | #FFFFFF 배경, 내부 그림자 절대 금지 |
| **Navigation Bar** | 하단 3px solid #000000 | 0px | 그림자 없음 또는 0 4px 0 0 #000 | #FFFFFF 배경, 면 분할 보더 역할 |

두꺼운 외곽선과 블러 없는 그림자를 사용할 때 발생하는 대표적인 결함은 모바일 터치 타깃 침범과 웹 접근성 포커스 링 차폐 현상이다.  
모바일 화면에서 물리적 버튼 높이가 36px이더라도 실제 터치 감지 영역은 WCAG 2.2 SC 2.5.8 규정에 따라 최소 44×44px(권장 48×48px) 이상을 확보해야 한다. 특히 우하단으로 돌출된 4px 그림자는 브라우저에 따라 히트박스 판정에서 제외될 수 있으므로, 투명 가상 요소(::after)를 상하좌우로 확장 배치하여 오프셋 영역까지 포함하는 안전한 터치 바운딩 박스를 구현해야 한다.  
웹 접근성 기준(WCAG 2.2 SC 2.4.7 및 2.4.11) 충족을 위한 포커스 표시 처리 역시 필수적이다. 컴포넌트에 이미 3px 두께의 검은 외곽선이 존재하는 상태에서 브라우저 기본 포커스 링을 호출하면, 검은 링이 기존 테두리에 흡수되어 현재 초점 위치를 시각적으로 분별할 수 없게 된다. 따라서 포커스 상태에서는 외곽선과 3px 이상의 명확한 물리적 간격을 두고 분리되는 고채도 보색 링(outline: 3px solid #3366FF; outline-offset: 3px;)을 선언하여 인디케이터가 차폐되지 않도록 설계해야 한다.

## 이미지·일러스트·아이콘 에셋 가이드

일반적인 기능주의 인터페이스가 매끄러운 3D 렌더링과 자연스러운 명암 표현을 추구하는 것과 달리, 뉴트로·브루탈리즘은 물리 인쇄 공정의 아날로그적 불완전성과 90년대 초기 디지털 그래픽의 거친 질감을 정밀하게 모사한다.  
사진 이미지는 사각형 프레임에 갇힌 일반적인 크롭 방식을 탈피하여 피사체의 경계를 따는 스티커 누끼(Sticker cut-out) 처리를 적극적으로 활용하며, 피사체 외곽에 2~3px 두께의 흰색 또는 검은색 단색 아웃라인을 덧대어 종이 인쇄물과 같은 촉각성을 부여한다. 톤 보정은 고대비 흑백 처리나 스크린 인쇄의 망점 질감을 살린 하프톤(Halftone), 또는 단 두 가지 색상의 잉크로 겹쳐 찍은 듯한 듀오톤(Duotone) 기법을 사용해 포스터와 같은 통일감을 확립한다.  
일러스트레이션은 복잡한 사실주의를 철저히 배제하고 8비트/16비트 도트 픽셀 그래픽이나 90년대 클립아트를 연상시키는 기하학적 도형의 결합을 지향한다. 특히 만화적인 선 드로잉이나 인쇄 핀이 어긋난 듯한 '의도된 오프셋 미스레지스터' 연출을 통해 디지털 인터페이스에 인간적이고 유쾌한 결함을 주입한다. 아이콘은 면을 채우는 방식 대신 2.5px에서 3px 두께의 균일한 검정 스트로크 중심의 라인 아이콘을 채택하며, 끝단과 꺾임은 둥글리지 않고 직각으로 마감된 스퀘어 캡(Square Cap)과 마이터 조인(Miter Join)을 유지한다.

| 자산 라이브러리명 | 그래픽 유형 | 주요 특징 | 라이선스 형태 | 공식 출처 URL |
| :---- | :---- | :---- | :---- | :---- |
| **Pixelarticons** | 픽셀 아트 아이콘 | 400종 이상의 8비트/레트로 OS 스타일 비트맵 아이콘 | MIT License (상업적 이용 및 수정 자유) | https://github.com/halfmage/pixelarticons |
| **Lucide Icons** | 벡터 라인 아이콘 | 스트로크 두께(Stroke-width)를 2.5~3px로 제어 가능한 기하학적 아이콘 | ISC License (상업적 무료 프로젝트 활용) | https://lucide.dev |
| **Open Doodles** | 벡터 일러스트 | 거칠고 자유분방한 손그림 및 카툰풍 스케치 에셋 | CC0 1.0 Universal (퍼블릭 도메인, 출처 표기 불필요) | https://www.opendoodles.com |

## 모션 및 인터랙션 시스템

뉴트로·브루탈 인터랙션의 핵심 철학은 아케이드 오락실의 물리 버튼을 누르거나 기계식 스위치를 조작할 때 발생하는 즉발적이고 물리적인 피드백이다. 현대 웹의 과도하게 완만한 감속 모션(Slow ease-out) 대신, 손가락 끝의 압력이 컴포넌트에 즉각 도달하는 듯한 컬랩싱 섀도(Collapsing Shadow) 메커니즘을 시그니처 상호작용으로 삼는다.  
컬랩싱 섀도 인터랙션은 평상시 우하단 45도 방향으로 돌출되어 있던 오프셋 그림자가 클릭(Active) 시 0으로 압축되면서, 동시에 컴포넌트 본체가 그림자가 있던 위치로 동일한 오프셋 픽셀만큼 평행 이동(transform: translate(x, y))하는 구조다. 마우스 호버(Hover) 상태에서는 요소가 미세하게 공중으로 떠오르는 느낌을 주기 위해 반대 방향으로 1px 이동하며 그림자를 1px 확장하고, 액티브 상태에서는 40ms 이내로 즉각 함몰되어 기계적인 타건감을 완성한다.  
마이크로 인터랙션의 지속 시간(Duration)은 40ms에서 80ms 사이의 극단적인 단축값을 유지하여 지연 없는 반응성을 제공한다. 모달이나 바텀시트와 같은 거대 레이아웃 전환 시에도 150ms를 초과하지 않도록 통제한다. 이징 곡선은 감속 구간을 거의 두지 않는 즉발 정지 곡선(cubic-bezier(0, 0, 0.2, 1))을 적용하며, 픽셀 아트나 레트로 OS 콘셉트의 특수 모달을 전개할 때는 프레임이 단계적으로 뚝뚝 끊어지는 스텝 함수(steps(2, jump-none))를 사용하여 90년대 CRT 모니터의 렌더링 딜레이를 유머러스하게 구현한다.  
이러한 급격한 위치 이동과 끊어지는 프레임 연출은 전정신경계 질환자나 모션 멀미를 겪는 사용자에게 현기증을 유발할 수 있다. 따라서 웹 접근성 가이드라인(WCAG 2.2 SC 2.3.3)에 따라 운영체제의 prefers-reduced-motion: reduce 미디어 쿼리가 활성화된 클라이언트에서는 모든 translate 위치 이동과 스텝 애니메이션을 전면 비활성화하고, 단순 색상 반전이나 보더 두께의 순간 전환으로 인터랙션 피드백을 대체해야 한다.

## 적합 분야와 부적합 분야 분석

브루탈리즘의 강렬한 조형 언어는 브랜드의 태도와 독창성을 각인시키는 도구로 우수하지만, 인지적 에너지 소비가 극심하여 프로덕트의 목적과 정보 성격에 따라 성패가 극명하게 갈린다.  
가장 이상적인 적합 분야는 Z세대를 핵심 고객으로 삼는 스트리트 패션 셀렉트숍, 한정판 스니커즈 드롭 커머스, 바이럴 이벤트 프로모션이다. 상품 자체가 문화적 유행과 개성을 소비하는 매개체일 때, 규격화된 카드 템플릿보다 의도적으로 거칠고 감각적인 벤토 그리드 레이아웃이 제품의 희소성과 힙한 브랜드 이미지를 비약적으로 끌어올린다. 창작자를 위한 디지털 자산 마켓플레이스(Gumroad)나 개발자 생산성 도구 역시 훌륭한 적합 도메인이다. 이 분야의 유저들은 주류 기업의 정형화된 SaaS에 반감을 갖고 대안적인 문화를 지지하는 경향이 강하므로, 날것의 솔직함을 드러내는 인터페이스가 강력한 정서적 유대감을 형성한다. 또한 2D 도트 기반의 메타버스나 게이미피케이션 플랫폼(ZEP)에서는 가상 세계관과의 시각적 일체감을 부여하여 인터페이스가 게임 플레이의 자연스러운 연장선으로 체감된다.  
반대로 피해야 할 부적합 분야는 금융 코어 트랜잭션 화면, 고밀도 B2B 엔터프라이즈 SaaS, 공공 행정 및 헬스케어 시스템이다. 뱅킹의 계좌 이체, 대출 심사, 자산 운용 대시보드와 같은 환경에서 사용자가 가장 절실하게 요구하는 가치는 무조건적인 '안정성', '신뢰', '실수의 방지'다. 여기에 장난감 같은 외곽선과 튀는 원색 블록을 배치하면 사용자는 시스템이 가볍거나 불안정하다고 직관하여 중대한 금전적 결정을 주저하게 된다. 수백 개의 행과 열이 교차하는 B2B ERP나 CRM 데이터 테이블 역시 부적합하다. 모든 셀과 헤더에 2~3px의 검은 테두리가 중첩되면 격자 착시 현상(Grid Noise)이 폭발하여 사용자의 안구 피로도가 급상승하고 정밀한 데이터 판독 능력이 심각하게 저하된다. 공공 의료 및 행정 웹사이트는 고령층, 저시력자, 디지털 취약계층을 광범위하게 포용해야 하므로, 파괴적인 비대칭 구조와 고대비 형광 배색은 돌이킬 수 없는 인지 장벽으로 작용한다.

## 접근성 및 사용성 함정

네오 브루탈리즘을 실무 프로덕트에 도입할 때 디자이너와 엔지니어가 빈번하게 빠지는 치명적인 결함과 이를 제어하기 위한 수치적 방지 기준이다.  
첫 번째 함정은 고채도 배경 위에서의 텍스트 명도 대비 붕괴다. 디자이너들이 기존 플랫 UI의 관성에 따라 네온 옐로(#FFE600)나 핫핑크(#FF69B4) 버튼을 생성하면서 습관적으로 흰색(#FFFFFF) 텍스트를 배치하는 경우가 많다. 흰색과 네온 옐로의 명도 대비비는 1.27:1에 불과하여 WCAG 최소 기준인 4.5:1에 한참 미치지 못하고 글자가 완전히 증발한다. 밝은 고채도 면 위에는 오직 순검정(#000000) 텍스트만 렌더링되도록 디자인 시스템 토큰 수준에서 하드코딩해야 한다.  
두 번째 함정은 검은 테두리에 의한 키보드 포커스 인디케이터 은폐다. 콤포넌트 외곽에 이미 3px 이상의 순검정 테두리가 자리 잡고 있는 상태에서 브라우저 기본 포커스 링을 호출하면, 링이 기존 테두리에 겹쳐져 완전히 소멸하는 포커스 차폐 현상이 발생한다. 키보드 탐색 유저가 화면 내 초점 위치를 즉각 파악할 수 있도록, 기존 테두리 바깥으로 3px 이상의 오프셋 간격을 띄운 채 3:1 이상의 비텍스트 대비를 만족하는 고채도 블루(outline: 3px solid #3366FF; outline-offset: 3px;) 링을 명시해야 한다.  
세 번째 함정은 모바일 뷰포트 내 하드 섀도 중첩으로 인한 터치 간섭이다. 화면 폭이 좁은 모바일 환경에서 콤포넌트가 세로로 밀집될 때, 상단 카드나 버튼에서 우하단으로 5~8px 돌출된 하드 섀도가 바로 아래 링크나 입력 필드의 물리적 영역을 가리거나 시각적 경계를 교란하여 오조작을 유발한다. 미디어 쿼리를 통해 화면 폭 768px 미만에서는 그림자 오프셋을 최대 2px(box-shadow: 2px 2px 0 0 #000)로 축소하고, 인접한 콤포넌트 사이의 상하 마진을 최소 16px 이상 확보해야 한다.  
네 번째 함정은 과도한 시각적 장치 남발로 인한 정보 위계(Hierarchy)의 전면 붕괴다. 화면에 존재하는 모든 컨테이너, 태그, 버튼, 텍스트 상자에 균일하게 두꺼운 테두리와 하드 섀도를 부여하면 모든 요소가 시각적으로 동일한 볼륨으로 소리를 지르는 상태가 된다. 이는 사용자가 어디를 먼저 읽고 클릭해야 할지 판단할 수 없게 만든다. 단일 화면 내에서 하드 섀도를 갖는 강조 요소는 1개의 메인 CTA 버튼과 최대 2개의 중요 카드 영역으로 제한하는 '단일 뷰 3요소 원칙'을 수립하고, 나머지 보조 데이터 영역은 1px의 얇은 실선만 유지하거나 그림자를 완전히 제거해야 한다.

## 설계 토큰 초안: JSON 사양

W3C DTCG(Design Tokens Community Group) 표준 사양을 준수하여 작성된 설계 토큰 초안이다. Figma Tokens 플러그인 연동 및 Style Dictionary 빌드 파이프라인을 통해 CSS 커스텀 프로퍼티와 Tailwind 테마로 즉시 변환된다.

JSON  
{  
  "color": {  
    "structure": {  
      "black": { "value": "#000000", "type": "color" },  
      "white": { "value": "#FFFFFF", "type": "color" },  
      "off-white": { "value": "#FFFDF8", "type": "color" },  
      "dark-surface": { "value": "#121212", "type": "color" }  
    },  
    "accent": {  
      "yellow": { "value": "#FFE600", "type": "color" },  
      "cyan": { "value": "#00F0FF", "type": "color" },  
      "pink": { "value": "#FF69B4", "type": "color" },  
      "lime": { "value": "#4ADE80", "type": "color" },  
      "electric-blue": { "value": "#3366FF", "type": "color" }  
    }  
  },  
  "borderWidth": {  
    "none": { "value": "0px", "type": "borderWidth" },  
    "thin": { "value": "1px", "type": "borderWidth" },  
    "medium": { "value": "2px", "type": "borderWidth" },  
    "thick": { "value": "3px", "type": "borderWidth" },  
    "heavy": { "value": "4px", "type": "borderWidth" }  
  },  
  "borderRadius": {  
    "sharp": { "value": "0px", "type": "borderRadius" },  
    "micro": { "value": "2px", "type": "borderRadius" },  
    "soft": { "value": "4px", "type": "borderRadius" }  
  },  
  "boxShadow": {  
    "none": { "value": "0px 0px 0px 0px rgba(0,0,0,0)", "type": "boxShadow" },  
    "sm": {  
      "value": {  
        "x": "2px",  
        "y": "2px",  
        "blur": "0px",  
        "spread": "0px",  
        "color": "{color.structure.black.value}"  
      },  
      "type": "boxShadow"  
    },  
    "md": {  
      "value": {  
        "x": "4px",  
        "y": "4px",  
        "blur": "0px",  
        "spread": "0px",  
        "color": "{color.structure.black.value}"  
      },  
      "type": "boxShadow"  
    },  
    "lg": {  
      "value": {  
        "x": "8px",  
        "y": "8px",  
        "blur": "0px",  
        "spread": "0px",  
        "color": "{color.structure.black.value}"  
      },  
      "type": "boxShadow"  
    }  
  },  
  "spacing": {  
    "xs": { "value": "4px", "type": "spacing" },  
    "sm": { "value": "8px", "type": "spacing" },  
    "md": { "value": "16px", "type": "spacing" },  
    "lg": { "value": "24px", "type": "spacing" },  
    "xl": { "value": "32px", "type": "spacing" },  
    "2xl": { "value": "48px", "type": "spacing" },  
    "3xl": { "value": "64px", "type": "spacing" }  
  },  
  "typography": {  
    "fontFamilies": {  
      "display": { "value": "Syne, Archivo Black, sans-serif", "type": "fontFamilies" },  
      "retro": { "value": "NeoDunggeunmo, monospace", "type": "fontFamilies" },  
      "koreanKitsch": { "value": "BMDOHYEON, sans-serif", "type": "fontFamilies" },  
      "body": { "value": "Pretendard, -apple-system, sans-serif", "type": "fontFamilies" }  
    },  
    "fontSize": {  
      "displayHero": { "value": "56px", "type": "fontSizes" },  
      "h1": { "value": "36px", "type": "fontSizes" },  
      "h2": { "value": "24px", "type": "fontSizes" },  
      "body": { "value": "16px", "type": "fontSizes" },  
      "caption": { "value": "12px", "type": "fontSizes" }  
    }  
  },  
  "motion": {  
    "duration": {  
      "instant": { "value": "40ms", "type": "time" },  
      "snappy": { "value": "80ms", "type": "time" },  
      "layout": { "value": "150ms", "type": "time" }  
    },  
    "easing": {  
      "snap": { "value": "cubic-bezier(0, 0, 0.2, 1)", "type": "cubicBezier" },  
      "pixelSteps": { "value": "steps(2, jump-none)", "type": "string" }  
    }  
  }  
}

## 불확실하거나 의견이 갈리는 지점

프로덕트 실무 디자인 및 프론트엔드 엔지니어링 영역에서 여전히 합의에 도달하지 못하고 대립하는 3가지 쟁점이다.  
첫째, 모서리 곡률(Corner Radius)의 0px 고수론과 2~4px 마이크로 라운딩 절충론의 대립이다. 순수주의 진영은 건축적 브루탈리즘의 본질이 가공되지 않은 날것의 기하학적 각에 있으므로 모서리가 1px이라도 둥글어지면 본래의 급진적 조형 철학이 훼손된다고 주장한다. 반면 실무 절충주의 진영은 모바일 터치 환경에서 완전한 직각 카드는 손가락 조작 시 시각적인 거부감을 유발하므로 2~4px의 미세 곡률을 주입해야만 최신 모바일 OS와 어우러지는 현대적 사용성을 담보할 수 있다고 맞선다.  
둘째, 물리적 컬랩싱 섀도 인터랙션이 야기하는 레이아웃 흔들림(Layout Jitter) 논쟁이다. 버튼을 누를 때 요소가 우하단으로 몇 픽셀 이동하는 효과는 물리적 누름에 대한 직관적인 어포던스를 제공한다는 긍정론이 지배적이다. 그러나 터치 지점 아래에서 버튼 레이블이 물리적으로 미세하게 이동하면서 텍스트의 중심 앵커가 순간적으로 흔들리는 현상이 발생하는데, 이는 엄격한 타이포그래픽 안정성을 중시하는 엔지니어와 디자이너들 사이에서 불필요한 시각 노이즈로 비판받는다.  
셋째, 스타일의 지속 가능성(Design Longevity)과 일시적 유행(Fad) 간의 평가 충돌이다. 2021년 리뉴얼 당시 네오 브루탈리즘을 전면에 내세웠던 글로벌 디자인 도구 Figma가 2026년 공식 컨퍼런스(Config) 웹사이트에서 두꺼운 외곽선과 하드 섀도를 걷어내고 정갈한 미니멀리즘으로 회귀한 사례는 이 스타일이 브랜드 인지도 확보를 위한 일회성 마케팅 수단에 불과하다는 회의론에 힘을 싣는다. 그러나 Gumroad가 5년 넘게 프로덕트 전반의 코어 언어로 안착시켰고 neobrutalism.dev 등의 컴포넌트 생태계가 공고히 확장된 점을 고려할 때, 주류 미니멀리즘과 영구적으로 공존하는 강력한 대안적 디자인 패러다임으로 자리 잡았다는 반론 역시 팽팽히 맞서고 있다.

#### 참고 자료

> 1. 네오브루탈리즘 UI는 언제 효과적일까 · DUOLABS BLOG - 듀오랩스, [https://duolabs.co.kr/blog/%EB%84%A4%EC%98%A4%EB%B8%8C%EB%A3%A8%ED%83%88%EB%A6%AC%EC%A6%98-ui%EB%8A%94-%EC%96%B8%EC%A0%9C-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9D%BC%EA%B9%8C](https://duolabs.co.kr/blog/%EB%84%A4%EC%98%A4%EB%B8%8C%EB%A3%A8%ED%83%88%EB%A6%AC%EC%A6%98-ui%EB%8A%94-%EC%96%B8%EC%A0%9C-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9D%BC%EA%B9%8C)  
> 2. Neobrutalism Design System for Claude & Cursor - Skills UI, [https://skillsui.app/skills/neobrutalism](https://skillsui.app/skills/neobrutalism)  
> 3. Brutalism Web Design: Examples and the CSS Recipe, [https://theplusaddons.com/blog/neo-brutalism-web-design/](https://theplusaddons.com/blog/neo-brutalism-web-design/)  
> 4. [https://www.nngroup.com/articles/neobrutalism/](https://www.nngroup.com/articles/neobrutalism/)  
> 5. 네오 브루탈리즘 - 나무위키, [https://namu.wiki/w/%EB%84%A4%EC%98%A4%20%EB%B8%8C%EB%A3%A8%ED%83%88%EB%A6%AC%EC%A6%98](https://namu.wiki/w/%EB%84%A4%EC%98%A4%20%EB%B8%8C%EB%A3%A8%ED%83%88%EB%A6%AC%EC%A6%98)  
> 6. 마이 브랜드 리스트 - 29CM, [https://content.29cm.co.kr/mybrandlist/2026/07/2nd](https://content.29cm.co.kr/mybrandlist/2026/07/2nd)  
> 7. 제페토-슈퍼캣, 합작사 '젭' 설립.. “협업용 메타버스로 확장” - ZEP Blog, [https://blog.zep.us/zep-news-2/%EC%A0%9C%ED%8E%98%ED%86%A0-%EC%8A%88%ED%8D%BC%EC%BA%A3-%ED%95%A9%EC%9E%91%EC%82%AC-%EC%A0%AD-%EC%84%A4%EB%A6%BD-%ED%98%91%EC%97%85%EC%9A%A9-%EB%A9%94%ED%83%80%EB%B2%84/](https://blog.zep.us/zep-news-2/%EC%A0%9C%ED%8E%98%ED%86%A0-%EC%8A%88%ED%8D%BC%EC%BA%A3-%ED%95%A9%EC%9E%91%EC%82%AC-%EC%A0%AD-%EC%84%A4%EB%A6%BD-%ED%98%91%EC%97%85%EC%9A%A9-%EB%A9%94%ED%83%80%EB%B2%84/)  
> 8. 네오브루탈리즘(Neobrutalism) 뜻과 쓰임 — UI 가이드 - AI Creator Lab, [https://aicreatorlab.com/guide/ui/neobrutalism](https://aicreatorlab.com/guide/ui/neobrutalism)  
> 9. 2025년의 트렌드가 될까!? 네오 브루탈리즘이란 무엇인가? - note, [https://note.com/katsuaki_izawa/n/n2756a03566fd?hl=ko](https://note.com/katsuaki_izawa/n/n2756a03566fd?hl=ko)  
> 10. 만 14세 미만을 위한 전용 서비스 '유스 홈' - 토스, [https://toss.im/tossfeed/article/how-teens-get-toss](https://toss.im/tossfeed/article/how-teens-get-toss)  
> 11. 한글 무료폰트 추천 배달의 민족 서체를 알아보자(feat. 우아한 형제들), [https://freelifeyonging.tistory.com/67](https://freelifeyonging.tistory.com/67)  
> 12. Neo Brutalism in Web Design: A Guide to Bold, High-Contrast UI, [https://www.marcfriedmanportfolio.com/blog/neo-brutalism-design-guide/](https://www.marcfriedmanportfolio.com/blog/neo-brutalism-design-guide/)  
> 13. Brutalism SKILL | PDF | Typography | Page Layout - Scribd, [https://www.scribd.com/document/1046647504/Brutalism-SKILL](https://www.scribd.com/document/1046647504/Brutalism-SKILL)  
> 14. Neubrutalism — The Definitive Guide to Neubrutalist Web Design, [https://neubrutalism.com/](https://neubrutalism.com/)  
> 15. What Is Neo Brutalism UI Design? Principles & Examples, [https://www.onething.design/post/what-is-neo-brutalism-ui-design](https://www.onething.design/post/what-is-neo-brutalism-ui-design)  
> 16. NeoBrutalism Design System - UI Design Prompts, [https://uidesignprompts.com/prompts/neobrutalism](https://uidesignprompts.com/prompts/neobrutalism)  
> 17. [슈퍼마켓 10월 Vol.1] SK 그룹 회장도 이용한, AI 이어북 - 메일리, [https://maily.so/mading/posts/2qzpmm3jz4x](https://maily.so/mading/posts/2qzpmm3jz4x)  
> 18. Neo Brutalism Web Design: CSS Recipe, Examples, 2026 Verdict, [https://www.gleamstudio.design/blog-post/neo-brutalism](https://www.gleamstudio.design/blog-post/neo-brutalism)  
> 19. 새로워진 모임카드 발급하고, 레트로 감성 토이 카메라 받아요 - 토스뱅크, [https://www.tossbank.com/articles/moim-toycamera-event](https://www.tossbank.com/articles/moim-toycamera-event)  
> 20. 토스 유스카드 2025 완벽 가이드 - 발급부터 소득공제 까지!, [https://lifecheatkeys.com/%ED%86%A0%EC%8A%A4-%EC%9C%A0%EC%8A%A4%EC%B9%B4%EB%93%9C/](https://lifecheatkeys.com/%ED%86%A0%EC%8A%A4-%EC%9C%A0%EC%8A%A4%EC%B9%B4%EB%93%9C/)  
> 21. 토스의 도전, [https://toss.im/new-dimension/user-story](https://toss.im/new-dimension/user-story)  
> 22. 미래지향적인 디자인 골든구스 - 모든 취향 곁에, 29CM, [https://www.29cm.co.kr/content/showcase/1430](https://www.29cm.co.kr/content/showcase/1430)  
> 23. [메타버스 콘테스트 일지] ZEP 개발 환경 구축 - velog, [https://velog.io/@dev_grit/%EB%A9%94%ED%83%80%EB%B2%84%EC%8A%A4-%EC%BD%98%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%9D%BC%EC%A7%80-ZEP-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95](https://velog.io/@dev_grit/%EB%A9%94%ED%83%80%EB%B2%84%EC%8A%A4-%EC%BD%98%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%9D%BC%EC%A7%80-ZEP-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95)  
> 24. (주)우아한형제들 - 관심기업 - i-ONE JOB | 아이원잡, [https://www.ibkonejob.co.kr/jp/corpInfoDetailView.do?cmpSn=000001788](https://www.ibkonejob.co.kr/jp/corpInfoDetailView.do?cmpSn=000001788)  
> 25. 배민 한나체 Pro - 우아한형제들 무료 한글 폰트 | 폰트히어로, [https://fonts.sweethero.kr/ko/baemin-hanna-pro](https://fonts.sweethero.kr/ko/baemin-hanna-pro)  
> 26. UI 디자인 스타일 20가지 총정리 (플랫, 글래스모피즘, 뉴모피즘 등), [https://miny.tistory.com/30](https://miny.tistory.com/30)  
> 27. 네오브루탈리즘 스타일 UI를 사용하는 앱 아는 사람 있어?? - Reddit, [https://www.reddit.com/r/UI_Design/comments/1l0m2x8/does_anyone_know_any_apps_which_use_neobrutalism/?tl=ko](https://www.reddit.com/r/UI_Design/comments/1l0m2x8/does_anyone_know_any_apps_which_use_neobrutalism/?tl=ko)  
> 28. Button - Neobrutalism components, [https://www.neobrutalism.dev/docs/button](https://www.neobrutalism.dev/docs/button)  
> 29. Introduction - Neobrutalism components, [https://www.neobrutalism.dev/docs](https://www.neobrutalism.dev/docs)  
> 30. Button | Community Components | 21st, [https://21st.dev/@ekmas/components/button/button-demo](https://21st.dev/@ekmas/components/button/button-demo)  
> 31. NEO 네오둥근모체 폰트 사용가이드 - 글꼴창고, [https://portalnum.com/114](https://portalnum.com/114)  
> 32. 브루탈리즘 웹디자인: 일부러 '못생긴' 웹사이트가 매력적인 이유 🖥️, [https://www.jaenung.net/tree/5714](https://www.jaenung.net/tree/5714)  
> 33. [unknown_url](http://docs.google.com/unknown_url)  
> 34. Neo둥근모 - 무료 한글 폰트 - 산돌구름, [https://www.sandollcloud.com/free-font/15873/NeoDunggeunmo](https://www.sandollcloud.com/free-font/15873/NeoDunggeunmo)  
> 35. Brutalism to Neubrutalism: What it means for UX & A11y - Medium, [https://medium.com/design-bootcamp/brutalism-to-neubrutalism-what-it-means-for-ux-a11y-464b3bdfb248](https://medium.com/design-bootcamp/brutalism-to-neubrutalism-what-it-means-for-ux-a11y-464b3bdfb248)  
> 36. CSS Neobrutalism Designs: Free UI Code Snippets - FreeFrontend, [https://freefrontend.com/css-neobrutalism/](https://freefrontend.com/css-neobrutalism/)  
> 37. Neobrutalism components - Start making neobrutalism layouts today, [https://www.neobrutalism.dev/](https://www.neobrutalism.dev/)
