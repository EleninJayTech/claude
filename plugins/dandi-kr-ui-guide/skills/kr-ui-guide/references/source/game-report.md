> **원문 보존본** — kr-ui-guide가 게임 UI 사례·근거 조회용으로 싣는 리서치 보고서다(사용자 조사, 한국 게임 시장 플랫폼별 UI/UX). 내보내기 흔적(이스케이프·HTML 공백 엔티티)만 걷어냈고 내용은 고치지 않았다. 단어 뒤 숫자는 각주 번호다. 규칙으로 쓸 것은 `game.md`, 확인 안 된 것은 `open-questions.md`다 — 6장(AI UX 리서치)은 설계 기준이 아니라 참고용이다. 2026-09-17 편입 검증에서 5.2의 '유료 전리품 권한'·'강제 파티' 서술은 인용 출처와 맞지 않았다(`open-questions.md`).

# **한국 게임 시장의 UI/UX 디자인 심층 분석: 플랫폼별 특성과 유저 선호도를 중심으로**

## **1. 핵심 요약**

한국 게임 시장은 전 세계적으로 가장 고도화된 유저 피드백 커뮤니티와 하드코어 플레이 문화를 보유한 곳으로, UI/UX 디자인의 완성도가 게임의 흥행과 수명을 좌우하는 핵심 지표로 작용한다. 본 보고서는 모바일, 태블릿, PC 및 콘솔을 아우르는 크로스플랫폼 환경에서 한국 게이머들이 선호하는 UI/UX 패턴과 그 기저에 깔린 심리학적, 인지적 원인을 심층 분석한다. 한국 게이머들은 '압축된 정보 밀도'와 '직관적인 행동 유도(Affordance)'를 동시에 요구하며, 불필요한 조작(Depth)을 최소화하는 '소탕' 등의 빠른 템포 UI에 열광한다. 최근 2024~2026년 트렌드로는 넥슨의 '인사이트 파인더' 사례와 같이 인공지능(AI)을 활용한 UX 리서치의 고도화 및 조직 내 '맥락 자본' 축적이 두드러진다. 반면, 플랫폼의 물리적 제약을 무시한 단순 이식이나, 시각적 연출에 치중하여 전투 조작의 심도를 얕게 만든 사례들은 커뮤니티의 거센 비판을 받았다. 본 보고서는 이러한 성공과 실패 사례를 통해 실무에 적용 가능한 플랫폼별 UI/UX 설계 원칙을 제시한다.

## **2. 플랫폼별 환경 분석: 입력 방식에 따른 UI 원칙과 한국 유저 반응**

한국 게이머들은 단일 플랫폼에 머물지 않고 기기 간 경계를 넘나들며 게임을 소비한다. 이러한 다중 플랫폼 환경에서 입력 방식(Input Method)의 물리적 차이는 곧 사용자 경험(UX)의 질적 차이로 직결된다. 각 플랫폼이 가지는 인지공학적 특성과 한국 유저들의 반응을 분석하면 다음과 같다.

### **2.1. 모바일 환경: 파지법의 인지공학적 접근과 화면 전환의 유연성**

모바일 플랫폼은 터치스크린이라는 물리적 한계와 휴대성이라는 압도적인 장점을 동시에 지닌다. 한국의 모바일 게임 플레이어들은 대중교통 등 좁은 공간에서의 '한 손 조작(세로 모드)'과, 자택이나 휴식 공간에서 높은 몰입감을 요하는 '양손 조작(가로 모드)'을 수시로 오가는 특성을 보인다. 과거에는 가로형 MMORPG나 액션 게임이 주류를 이루었으나, 숏폼 콘텐츠의 유행과 멀티태스킹의 일상화로 인해 한 손으로 가볍게 즐길 수 있는 세로형 UI의 수요가 급증했다.

이러한 맥락에서 넥슨 데브캣 스튜디오의 <마비노기 모바일>은 모바일 UI/UX의 새로운 패러다임을 제시한 핵심 사례로 평가받는다. 해당 타이틀은 게임 플레이 중 기기를 회전시키는 것만으로 가로 모드와 세로 모드가 즉각적이고 끊김 없이 전환되는 반응형(Responsive) 시스템을 구축했다1. 세로 모드에서는 스마트폰을 한 손으로 쥐었을 때 엄지손가락이 닿는 하단 영역에 채팅, 감정 표현, 인벤토리 정리 등 커뮤니케이션과 일상적인 조작에 최적화된 UI가 배열된다3. 반면, 기기를 눕혀 가로 모드로 전환하면 넓은 시야가 필요한 전투 및 탐험 상황에 맞게 스킬 패드와 나침반, 미니맵이 즉각적으로 재배치되어 물리적 환경에 따른 유연한 대처가 가능하다3. 특히 게임 진행 중 기기의 홈 버튼을 눌러 앱을 빠져나갈 때, 게임 화면이 멈추거나 튕기는 대신 PIP(Picture-in-Picture) 모드로 전환되어 백그라운드에서도 시각적 피드백을 유지하는 점은 유저 접근성을 극대화한 UX 설계로 커뮤니티의 큰 호평을 받았다1. 이는 모바일 기기의 하드웨어적 특성을 소프트웨어 UI가 완벽히 보조하여 사용자 경험의 단절을 막아낸 우수 사례다.

어린이 및 캐주얼 유저층을 대상으로 한 모바일 게임 UI 설계에 있어서도 인지심리학적 지각 차원의 연구가 활발히 진행되고 있다. 한국게임학회 논문지에 게재된 연구에 따르면, 시각적 주의력이 상대적으로 분산되기 쉬운 모바일 환경에서는 사용자의 직관적인 경험(UX)을 유도하기 위해 색상 대비와 버튼의 크기(Hitbox)를 극대화하는 어포던스(Affordance) 설계가 필수적이다6.

### **2.2. 태블릿 및 패드 환경: 해상도 파편화와 조작 동선의 재설계**

태블릿은 모바일 스마트폰과 PC의 중간 지점에 위치하며, 큰 화면으로 인한 '조작 동선의 낭비'가 가장 큰 UX 저해 요소로 꼽힌다. 한국 유저들은 태블릿으로 플레이할 때 화면 중앙부에 UI가 집중될 경우, 양손으로 기기를 파지한 상태에서 엄지손가락이 닿는 '안전 영역(Thumb Zone)'을 벗어나게 되어 극심한 조작 피로감을 느낀다. 따라서 성공적인 크로스플랫폼 게임들은 기기의 폼팩터가 태블릿임을 감지할 경우, 모바일에서는 중앙에 집중되었던 HUD(Head-Up Display)를 양측면 하단으로 분산시키는 가변 레이아웃을 채택하고 있다. 또한, 스타일러스 펜을 활용하는 유저들을 위해 미세한 드래그 앤 드롭이나 정밀 터치가 가능하도록 인벤토리 슬롯의 크기와 스크롤 감도를 세밀하게 조정하는 것이 태블릿 UX의 핵심 요구사항으로 자리 잡고 있다.

### **2.3. PC 환경: 마우스·키보드 기반의 고밀도 정보 처리와 단축키 경제학**

PC방 문화에서 기인한 한국 게이머의 PC 환경 선호도는 '높은 물리적 조작 속도(APM, Actions Per Minute)'와 '다중 정보의 동시 처리 능력'으로 요약된다. 마우스와 키보드는 현존하는 가장 정밀하고 다채로운 입력 장치이며, 하드코어 PC 유저들은 화면 내에 쿨타임, 버프/디버프 지속 시간, 미니맵, 파티원 체력, 적의 캐스팅 바 등의 방대한 정보가 한눈에 파악되기를 원한다. PC UI는 터치 기반의 모바일과 달리 '숨김(Hidden) 메뉴'나 '햄버거 버튼'보다는 직관적으로 '펼쳐진(Expanded) 메뉴'가 선호된다.

특히 단축키 커스터마이징의 자율성은 PC 플랫폼에서 UX 평가의 핵심 척도가 된다. 키보드의 배열을 활용해 사용자가 콤보 스킬이나 소비 아이템을 자신의 신체적 특성과 습관에 맞게 전면 재배치할 수 있어야 한다. 더 나아가, 듀얼 모니터 등 멀티 모니터 환경이 보편화된 한국에서는 게임 내 인벤토리 창이나 경매장, 길드 채팅창을 떼어내어 보조 모니터로 옮길 수 있는 모듈형 UI(Modular UI) 지원 여부가 게임의 편의성을 가르는 중요한 지표로 부상하고 있다.

### **2.4. 크로스플랫폼 환경: 입력 방식의 실시간 동기화와 컨트롤러 최적화**

모바일, PC, 콘솔을 아우르는 크로스플랫폼 게임이 산업의 표준으로 자리 잡으면서, '입력 방식에 따른 실시간 UI 및 UX 변경'이 필수적인 기술적 과제로 대두되었다. 시프트업의 AAA급 콘솔/PC 타이틀 <스텔라 블레이드>는 플레이어가 사용하는 입력 장치(키보드/마우스 또는 다양한 종류의 게임패드)에 따라 UI 프롬프트가 실시간으로 매끄럽게 변경되며, 어떤 방식을 선택하든 최적화된 경험을 제공하는 시스템을 구축했다7.

특히 주목받은 부분은 햅틱 피드백(Haptic Feedback)과 적응형 트리거(Adaptive Trigger)와 같은 감각적 UX의 플랫폼 확장이다. 시프트업은 PS5 듀얼센스의 핵심 기능인 세밀한 진동과 트리거 저항감을 PC 플랫폼에서도 온전히 경험할 수 있도록 기술적 지원을 아끼지 않았다7. 이는 단순한 플랫폼 포팅(Porting)을 넘어, PC라는 생태계에 최적화된 완전한 버전을 만들겠다는 개발사의 의지로 해석되어 한국 커뮤니티에서 매우 긍정적인 평가를 받았다7. 다만, 게임 자체가 듀얼센스의 터치패드 조작 등 특정 컨트롤러에 과도하게 최적화되어 있다 보니, 타사 서드파티 컨트롤러를 사용하는 PC 유저의 경우 UX 차원에서 약간의 불편함과 괴리감을 느끼는 현상도 발생하여 크로스플랫폼 파편화의 한계를 시사하기도 했다7. 민트로켓의 <데이브 더 다이버> 역시 PC와 콘솔에서 호평받은 복합 장르의 조작감을 모바일 환경으로 이식할 때, 버튼 배치와 크기 최적화를 통해 원작의 재미를 모바일 터치 환경에서도 성공적으로 구현해 냈다9.

## **3. 장르별 게임 UI/UX 특징 및 대표 사례**

장르에 따라 유저들이 요구하는 인지 부하(Cognitive Load)의 수준, 인터랙션의 빈도, 화면 내 정보의 우선순위가 크게 다르기 때문에 성공적인 게임들은 철저히 해당 장르의 문법에 맞춘 UI를 선보인다. 아래 표는 한국 시장에서 두각을 나타낸 장르별 게임들의 호평받은 UI/UX 요소와 유저 반응을 정리한 것이다.


| 게임명 (개발사) | 주력 플랫폼 | 장르 | 호평받은 UI/UX 요소 | 유저 반응 근거 및 특징 | 출처 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **마비노기 모바일** (넥슨) | 모바일 / PC | MMORPG | 무단절 가로/세로 화면 전환 및 PIP 모드 | 기기 회전 시 카메라 워킹과 UI 패널이 끊김 없이 유기적으로 재배치됨. 세로 모드는 커뮤니티 상호작용에, 가로 모드는 액션에 최적화되어 물리적 환경에 따른 높은 편의성 제공. | 1 |
| **블루 아카이브** (넥슨게임즈) | 모바일 / PC | 수집형 RPG (서브컬처) | 미니멀리즘 플랫(Flat) 디자인 및 감성적 터치 인터랙션 | 대중교통 등 공개된 장소에서 '서브컬처 게임'을 플레이하는 것에 대한 심리적 저항감을 낮춘 세련된 인터페이스. 캐릭터(학생)와의 교감을 극대화하는 섬세한 터치 반응. | 11 |
| **스텔라 블레이드** (시프트업) | PS5 / PC | AAA 액션 어드벤처 | 입력 디바이스 실시간 감지 UI 및 햅틱 피드백 연동 | 듀얼센스의 햅틱 진동을 UI 내비게이션 및 전투 타격감과 깊이 연동함. PC 버전에서도 이를 온전히 지원하여 감각적 경험을 극대화했으며, 자유로운 키 리맵핑(Remapping)을 지원함. | 7 |
| **데이브 더 다이버** (민트로켓) | PC / 콘솔 / 모바일 | 하이브리드 어드벤처 & 타이쿤 | 장르 복합적 UI의 터치스크린 최적화 | 어드벤처와 식당 경영이라는 이질적이고 복잡한 시스템을 모바일 환경에 맞게 버튼 크기와 배치를 직관적으로 재설계하여 원작 특유의 손맛을 성공적으로 유지함. | 9 |
| **젠레스 존 제로** (호요버스) | PC / 모바일 | 액션 RPG | 시각적 스케일을 살린 스타일리시 다이내믹 HUD | 복잡한 고유명사나 트랩 없이 심플하게 구성된 UI 텍스트. 전투 시 패링 및 교대 타이밍을 시각적 '빛남(Flashing)' 연출로 직관적으로 알려주어 입문 장벽을 대폭 낮춤. | 14 |

## **4. 한국 시장 특유의 UI/UX 선호 패턴 정리**

한국 게이머들의 UI/UX 선호도는 특유의 '효율성 추구(빠른 템포)'와 '높은 정보 해독력'이라는 두 가지 거대한 축을 바탕으로 형성된다. 이는 게임을 단순한 킬링타임용 유희를 넘어, 성취와 경쟁, 그리고 시간 대비 효율(가성비)을 극도로 따지는 문화적 배경과 맞닿아 있다.

### **4.1. "묻지도 따지지도 않는" 압축된 편의성: 소탕과 자동화 UI의 진화**

수집형 RPG나 MMORPG의 반복적인 파밍(Grinding) 구간에서 한국 유저들이 가장 선호하는 것은 '조작의 완전한 축약'이다. 과거에는 캐릭터가 자동으로 스킬을 사용하며 싸우는 것을 시각적으로 관전하는 '자동 전투(Auto-battle)'가 주류였으나, 최근에는 전투 과정 자체를 생략하고 결과만 즉시 제공하는 '소탕(Sweep)' 시스템의 UI 깊이(Depth)가 게임의 편의성을 평가하는 절대적 기준이 되었다.

호평받는 최신 게임들의 UI를 분석해보면, 소탕 횟수를 유저가 일일이 +나 - 버튼을 눌러 선택하게 만드는 스크롤이나 넘버 패드를 과감히 삭제했다. 그 대신 화면 중앙에 큼직한 [체력으로 소탕] 버튼 하나와 좌측에 [자동 소탕] 체크박스만을 배치하는 극단적인 미니멀리즘을 채택한다15. 유저가 [자동 소탕]을 체크하고 버튼을 누르면, 보유한 행동력(체력)이 모두 소진되거나 원하는 아이템을 획득할 때까지 시스템이 "묻지도 따지지도 않고" 백그라운드에서 모든 과정을 자동으로 반복 진행한다15. 이러한 UX 설계는 유저가 메뉴를 탐색하고 설정하는 뎁스를 1단계로 줄여 인지적 피로도를 급감시키며, 게임의 루프 템포를 극단적으로 끌어올려 '쾌적하다'는 찬사를 이끌어낸다.

### **4.2. 한글 폰트의 가독성과 로컬라이제이션의 세밀함**

게임 UI 디자인에서 타이포그래피(Typography)는 정보 전달의 핵심이자 시각적 완성도를 결정짓는 요소다. 한글은 영문 알파벳과 달리 초성, 중성, 종성이 결합하여 하나의 네모꼴 블록을 형성하는 복잡한 구조를 띄고 있어, 자간(Kerning)과 행간(Leading)의 미세한 확보가 UI의 깔끔함을 결정짓는다. 글로벌 게임이 한국에 서비스될 때 가장 먼저 비판받는 요소 중 하나가 바로 기본 시스템 폰트(굴림체, 돋움체 등)를 무비판적으로 사용하여 분위기를 해치는 경우다.

한국 게이머들은 미려한 곡선과 명확한 가독성을 자랑하는 'Pretendard(프리텐다드)'나 구글의 'Noto Sans KR(본고딕)'과 같은 산세리프 계열의 폰트를 게임 UI에 적용했을 때 "인터페이스가 깔끔하고 세련되었다"고 평가한다16. 특색 있는 인디 게임이나 캐주얼 게임의 경우 배달의민족 '한나체'와 같이 개성 있는 무료 폰트가 긍정적 경험을 주기도 하지만16, 하드코어 RPG나 방대한 텍스트를 읽어야 하는 장르에서는 오로지 가독성과 눈의 피로도 저하에 초점을 맞춘 'Belong Sans', '탈', 'Noh 소리체 Pro' 등의 전문 폰트가 선호된다17. 단순한 텍스트 번역의 질을 넘어, 문장이 UI 박스를 벗어나지 않고 모바일의 좁은 해상도에서도 폰트 렌더링이 깨지지 않는 기술적 로컬라이제이션의 완성도가 한국 유저들에게는 게임의 첫인상을 결정짓는 척도다.

### **4.3. '부끄럽지 않은' 감성적 서브컬처 UI**

서브컬처(수집형 가챠) 장르에서 UI는 단순히 기능을 실행하는 판넬이 아니라, 세계관을 전달하고 캐릭터와의 교감을 형성하는 캔버스다. 넥슨게임즈의 김용하 PD가 총괄한 <블루 아카이브>는 청량한 분위기의 세계관(학원도시 샬레)을 표현하기 위해 기존의 복잡하고 어두운 판타지풍 UI를 버리고, 하얀색과 파란색 중심의 밝은 플랫(Flat) 디자인을 채택했다11. 과거에는 대중교통 등 공개된 장소에서 이른바 '오타쿠 게임'을 플레이할 때 주변의 시선을 의식하여 부끄러움을 느끼는 경우가 많았으나, 세련되고 현대적인 감각의 UI 디자인 덕분에 유저들이 당당하게 게임을 즐길 수 있는 환경이 조성되었다13. 또한, 화면을 터치할 때마다 캐릭터가 반응하는 시각적/청각적 피드백은 '만드는 사람의 터치가 느껴지는' 인간적 감성을 부여하며, 단순한 시스템적 UI를 넘어 캐릭터와 유저 간의 감정적 유대(Parasocial Interaction)를 강화하는 UX로 극찬받고 있다12.

## **5. 실패 및 비판 사례와 그 교훈**

모든 UI/UX 시도가 성공적인 것은 아니다. 글로벌 스탠다드나 크로스플랫폼의 효율성을 명목으로 한국 유저들의 특성을 무시하거나, 플랫폼별 본질적인 제약을 간과한 설계는 즉각적이고 가혹한 비판에 직면한다.

### **5.1. 시각적 화려함에 매몰된 얕은 조작감: <젠레스 존 제로>의 전투 UI 한계**

호요버스의 신작 <젠레스 존 제로(ZZZ)>는 콘솔 감각의 스타일리시한 전투 연출과 고품질의 그래픽, 고유명사 트랩을 배제한 직관적인 텍스트 UI 전개로 초기 많은 기대를 모았다14. 특히 전투 중 몬스터가 공격할 때 UI에 시각적인 '빛남(Flashing)' 효과를 주어 패링(교대) 타이밍을 알려주는 시스템은 액션 게임 초보자들의 입문 장벽을 대폭 낮추는 데 기여했다14.

그러나 하드코어 액션과 정교한 컨트롤 조합을 기대했던 한국의 PC/콘솔 게이머들 사이에서는 이러한 '친절한 UI'가 오히려 전투 UX의 치명적인 단점으로 작용한다는 비판이 제기되었다. 캐릭터 교체 버튼 하나만 눌러도 화려한 연출이 알아서 재생되는 단조로운 시스템은, 뇌지컬(전략적 두뇌 플레이)과 동체시력을 요구하던 기존 액션 게임의 깊이를 상실하게 만들었다14. 한국 커뮤니티 유저들은 "빛날 때 딸깍(단순 클릭) 버튼만 누르면 알아서 다 해주는 것을 '차세대 액션'이라 부를 수 있는가", "수백 번 똑같은 연출만 보게 되어 금방 질린다"며 비판의 목소리를 높였다14. 과거 픽셀 그래픽의 모바일 게임인 <크루세이더 퀘스트>조차 블록을 조합하는 전략적 UX를 제공했던 것에 비해, ZZZ는 연출의 화려함에 함몰되어 유저가 능동적으로 개입할 수 있는 컨트롤의 유효성(손맛)을 앗아갔다는 것이다14. 이는 모바일 터치 환경의 편의성을 위해 전투 조작 UI를 과도하게 단순화한 결과, PC 환경에서는 타격감과 조작의 성취감을 잃게 된 크로스플랫폼 UX의 대표적인 딜레마를 보여준다14.

### **5.2. 모바일 UI의 PC 강제 이식과 과금 UX의 실패: <디아블로 이모탈>**

<디아블로 이모탈>은 블리자드의 상징적인 핵앤슬래시(Hack & Slash) IP를 크로스플랫폼으로 옮겨오며 전설 장비 파밍 등 핵심 요소는 계승했으나, PC 환경을 고려하지 않은 강압적인 UI 이식으로 큰 비판을 받았다18. PC 클라이언트를 실행했음에도 불구하고, 화면의 절반을 차지하는 모바일용 거대 버튼, 마우스 휠 대신 클릭 후 강제로 끌어당겨야(Drag & Swipe) 작동하는 인벤토리 스크롤 등은 마우스/키보드 환경의 유저들에게 극심한 불쾌감을 주었다.

더욱 치명적인 것은 과금 모델(BM)을 게임 내 UI에 억지로 녹여내려는 과정에서 발생한 UX의 훼손이다. 한국 게이머들이 극도로 피로감을 느끼는 '숙제(일일 퀘스트 강제)' 중심의 로비 UI 동선과 파티 플레이 강제 시스템은 몹을 쓸어버리는 본연의 재미를 저해했다18. 특히 악명 높은 뽑기(가챠) 시스템을 노골적으로 드러내는 대신, 약 3천 원을 지불해야 던전 클리어 시 보상을 얻을 수 있는 '전리품(Loot) 권한'이라는 기형적인 UI로 교묘하게 포장한 것은 유저 기만으로 받아들여졌다18. 이처럼 과금의 천장이 없는 하드코어한 BM을 불편한 강제 파티 시스템 UI에 결합시킨 결과, 커뮤니티에서는 "폭망했다", "PC로 하기엔 최적화가 엉망이고 모바일로 하기엔 손에 화상을 입을 것 같다"는 원색적인 비난과 함께 대규모 이탈이 발생했다18.

## **6. 2024~2026 트렌드와 향후 전망: AI 기반 UX 리서치와 맥락 자본**

2024년에서 2026년에 이르는 기간 동안 한국 게임 업계의 UI/UX 부문에서 가장 폭발적인 변화를 겪고 있는 영역은 표면적인 그래픽 트렌드가 아니라, 유저 행동 뒤에 숨겨진 '데이터'와 인공지능(AI)을 활용한 '사용자 경험 분석 파이프라인의 혁신'이다.

### **6.1. 넥슨 '인사이트 파인더(Insight Finder)': 리서치 병목의 타파**

2026년 6월 개최된 넥슨 개발자 콘퍼런스(NDC 26)에서 가장 화제가 된 세션 중 하나는 넥슨코리아 게임UX분석팀 이세왕 연구원이 발표한 '인사이트 파인더(Insight Finder)'였다19. 이 시스템은 거대한 AI 전환기(AX)에 게임사가 유저 피드백을 어떻게 자산화해야 하는지를 명확히 보여준다.

게임은 본질적으로 비선형적(Non-linear)인 매체다. 동일한 UI를 내놓아도 하루에 30분 접속하는 라이트 유저와 10시간을 파고드는 하드코어 유저는 전혀 다른 경험을 한다19. 과거에는 특정 던전 UI에서 유저가 이탈했다는 로그(행동 데이터)만 남을 뿐, 그것이 조작이 불편해서인지 난이도가 높아서인지 그 '이유(Why)'를 알기 위해서는 방대한 유저 리서치가 필수적이었다19. 그러나 설문 하나를 수집해 노이즈를 걷어내고, 리버스 코딩을 하고, 교차 집계와 통계 검정을 거쳐 보고서를 작성하기까지 무려 2~3주의 시간이 소요되는 만성적인 병목(Bottleneck) 현상이 존재했다19.

넥슨은 인사이트 파인더를 통해 3주가 걸리던 분석 작업을 단 '30분'으로 단축하는 데 성공했다19. 이 혁신의 핵심은 '사람과 AI가 할 일을 명확히 분리'한 점에 있다19. 단순히 챗GPT 같은 범용 AI에 통계 데이터를 밀어 넣으면, AI는 통계적 방법론을 무시한 채 그럴듯한 환각(Hallucination) 오류를 발생시킨다19. 이를 방지하기 위해 넥슨은 R이나 SPSS처럼 정밀하게 맞아떨어져야 하는 학술적 통계 검정, 유의성 판단, 데이터 정제 등은 기존의 신뢰도 높은 결정론적(Deterministic) 알고리즘 파이프라인이 전담하게 두었다19. 반면, AI에게는 사람의 언어를 다루는 영역—설문 문항의 리버스 코딩, 오타 및 누락 점검, 복잡한 통계 결과표를 사람이 이해하기 쉬운 자연어로 해석하고 요약하는 작업—만을 맡겼다19.

### **6.2. 맥락 자본(Contextual Capital)의 축적과 애자일 UX**

중간중간 사람이 개입해 판단을 내려야만 진행되던 프로세스에서 병목을 제거하기 위해, 넥슨은 시스템이 AI에게 완전한 전처리 데이터와 맥락(가이드라인)을 사전에 공급하도록 설계했다19. AI가 도출한 모든 해석에는 원본 정형 데이터가 출처로 명기되어, 기획자나 PD가 최종 의사결정을 내릴 때 오류 여부를 언제든 검증할 수 있게 했다19.

이러한 고도화된 AI 리서치 시스템은 단일 프로젝트의 분석 속도를 높인 것을 넘어, 분석이 끝난 뒤 사라지던 귀중한 인사이트들을 조직 내에 영구적으로 보존하는 '맥락 자본(Contextual Capital)'의 축적을 가능하게 했다19. 6개월 전 다른 부서가 비슷한 UI 개편 여론 조사를 진행했다는 사실을 모른 채 똑같은 질문을 반복하던 과거의 비효율을 없애고19, 모든 데이터를 검색하고 연결할 수 있는 거대한 사내 디자인 시스템/가이드로 발전시킨 것이다25. 이는 결국 궁금증이 생긴 기획자가 곧바로 질문하고 피드백을 받아 다음 패치에 UI를 개선하는 진정한 의미의 '애자일(Agile) UX' 생태계를 한국 게임업계에 안착시키는 신호탄이 되었다.

관련하여 학계에서도 생성형 AI 기반 플랫폼 서비스가 사용자에게 제공하는 UX 어포던스와 그것이 지속적인 사용 의도에 미치는 상관관계를 분석하는 등, AI와 UX의 결합에 대한 인지과학적 연구가 디지털콘텐츠학회 등을 통해 활발히 이루어지고 있다26.

### **6.3. 역설적 트렌드: 인간의 감성과 직관의 귀환**

AI가 수만 건의 피드백을 수십 분 만에 분석해 내는 고도의 이성적 트렌드 이면에는 역설적으로 '창작자의 인간적 터치'가 더욱 각광받는 트렌드가 공존한다. 데이터가 알려주지 못하는 미세한 애니메이션의 타이밍, 화면을 터치했을 때 퍼져나가는 파티클의 감각, 캐릭터가 유저의 조작에 반응하여 미소 짓는 타이밍 등은 철저히 디자이너와 기획자의 직관적 영역에 속한다. 넥슨게임즈 <블루 아카이브>의 개발진이 언급했듯, AI가 할 수 없는 '인간의 영역'에서 감성적 퀄리티를 어떻게 극대화할 것인지가 결국 동일 장르 내에서 유저들의 마음을 사로잡고 수익성을 증명하는 핵심 무기가 되고 있다12.

## **7. 실무 적용 체크리스트 (한국 유저 타겟팅 가이드)**

한국 게이머를 대상으로 성공적이고 비판받지 않는 게임 UI/UX를 설계하기 위해 기획자 및 디자이너가 플랫폼별로 반드시 점검해야 할 항목은 다음과 같다.

### **공통 및 크로스플랫폼 설계**

* [ ] **조작 뎁스(Depth)의 극단적 축약:** 반복 파밍 콘텐츠(던전 소탕, 일괄 수령 등)에서 유저가 횟수를 지정하거나 확인 버튼을 여러 번 누르지 않고, [보유 재화 모두 소모] 단일 버튼으로 모든 행동을 즉시 끝낼 수 있는가?  
* [ ] **가독성 폰트 적용 및 기술적 로컬라이제이션:** UI 내에 적용된 한글 텍스트가 깨짐 현상 없이 출력되는가? Pretendard, Noto Sans KR, Belong Sans 등 검증된 폰트를 사용하여 모바일의 작은 화면에서도 가독성을 확보했는가?  
* [ ] **입력 디바이스 동적 감지:** 키보드/마우스에서 게임패드로, 혹은 터치스크린으로 전환할 때 프레임 드랍 없이 UI 프롬프트와 내비게이션 룰이 실시간으로 교체되는가?

### **모바일 및 태블릿 환경 특화**

* [ ] **무단절 가로/세로 전환:** <마비노기 모바일> 사례처럼 물리적 기기 회전 시 앱이 멈추지 않고 채팅(세로) 중심 UI에서 전투(가로) 중심 UI로 자연스럽게 레이아웃이 재배치되는가?  
* [ ] **PIP(Picture-in-Picture) 지원:** 게임 중 모바일 기기의 홈 버튼을 누르거나 타 앱으로 전환할 때, 시각적 피드백이 단절되지 않도록 백그라운드 구동 상황을 띄워주는가?  
* [ ] **인체공학적 히트박스(Thumb Zone):** 태블릿 등 대화면 기기를 양손으로 파지했을 때, 자주 누르는 주요 액션 버튼이 양쪽 엄지손가락의 자연스러운 반경 내에 위치하는가?

### **PC 및 콘솔 환경 특화**

* [ ] **마우스/키보드 네이티브 UI 제공:** 모바일이나 콘솔의 십자키(D-Pad)용으로 설계된 거대한 타일형 버튼이나, 억지로 마우스로 드래그(Swipe)해야 하는 비직관적 조작계를 PC 버전에 그대로 방치하지 않았는가?  
* [ ] **단축키 커스터마이징의 완전성:** UI의 모든 창(인벤토리, 맵, 길드, 퀘스트 등)과 스킬 지정에 대해 유저가 어떠한 충돌 없이 자유롭게 단축키를 리맵핑할 수 있는가?  
* [ ] **햅틱 피드백의 플랫폼 확장:** <스텔라 블레이드>처럼 듀얼센스의 진동, 적응형 트리거 데이터를 콘솔뿐만 아니라 PC 클라이언트에서도 완벽하게 해석하여 감각적 경험을 제공하는가?  
* [ ] **전투 조작의 뇌지컬(Depth) 확보:** 맹목적인 시각적 화려함이나 원버튼 교대 시스템에 의존하여 PC/콘솔 하드코어 유저들이 원하는 '직접 컨트롤의 유효성'을 훼손하지 않았는가?

## **8. 참고 자료 목록 (인용 출처)**

본 보고서 작성에 인용 및 참고된 한국어 자료 출처는 다음과 같다.

> 1. https://www.gamemeca.com/news.php?ca=i&p=583  
>    [cite: 28]  
> 2. https://www.inven.co.kr/webzine/news/?news=302847  
>    [cite: 29]  
> 3. https://m.inven.co.kr/webzine/wznews.php?searchwhere=writer&svalue=%EC%96%91%EC%98%81%EC%84%9D&site=vb&idx=317488  
>    [cite: 30]  
> 4. https://dealsite.co.kr/articles/163343  
>    [cite: 31]  
> 5. https://www.businessplus.kr/news/articleView.html?idxno=113048  
>    [cite: 24]  
> 6. https://www.mt.co.kr/tech/2026/06/02/2026060216051868979  
>    [cite: 32]  
> 7. https://www.bloter.net/news/articleView.html?idxno=665807  
>    [cite: 33]  
> 8. https://m.ddaily.co.kr/page/view/2026051115053766780  
>    [cite: 34]  
> 9. https://tophet.tistory.com/124  
>    [cite: 15]  
> 10. https://www.sandollcloud.com/font-themes/300  
>     [cite: 17]  
> 11. https://www.inven.co.kr/webzine/news/?news=317953&site=iw2  
>     9  
> 12. https://m.inven.co.kr/webzine/wznews.php?idx=251144&iskin=maple  
>     [cite: 11]  
> 13. https://www.slideshare.net/slideshow/ss-132752302/132752302  
>     [cite: 35]  
> 14. https://www.inven.co.kr/webzine/news/?news=272619  
>     [cite: 18]  
> 15. https://www.inven.co.kr/webzine/news/?news=296978&site=zzz  
>     14  
> 16. https://www.inven.co.kr/webzine/news/?news=317553  
>     [cite: 25]  
> 17. https://www.inven.co.kr/webzine/news/?news=317513  
>     [cite: 19]  
> 18. https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11828584  
>     [cite: 26]  
> 19. https://www.gamemeca.com/view.php?gid=1776559  
>     [cite: 23]  
> 20. https://www.tgdaily.co.kr/news/articleView.html?idxno=405043  
>     [cite: 20]  
> 21. http://www.newstoon.co.kr/news/articleView.html?idxno=77967  
>     [cite: 21]  
> 22. https://www.gamemeca.com/en/view.php?gid=1776559  
>     [cite: 36]  
> 23. https://blog.nexon.com/post/3488629  
>     [cite: 37]  
> 24. https://www.gamevu.co.kr/news/articleView.html?idxno=58721  
>     [cite: 22]  
> 25. https://www.newscj.com/news/articleView.html?idxno=3409567  
>     [cite: 38]  
> 26. https://ndcreplay.nexon.com/NDC2018/sessions/NDC2018_0088.html  
>     [cite: 39]  
> 27. https://www.thisisgame.com/articles/213732  
>     [cite: 7]  
> 28. https://m.inven.co.kr/webzine/wznews.php?site=console&l=255741&p=3&idx=319411  
>     [cite: 8]  
> 29. https://m.riss.kr/search/detail/DetailView.do?p_mat_type=1a0202e37d52c72d&control_no=65625bba30f8a3687ecd42904f0c5d65  
>     [cite: 6]  
> 30. https://bk21four.cau.ac.kr/gsaim/bm/bm_1.php  
>     [cite: 27]  
> 31. https://www.inven.co.kr/webzine/news/?news=316991  
>     [cite: 12]  
> 32. https://v.daum.net/v/UnjJASHl5u  
>     [cite: 13]  
> 33. https://m.gameshot.net/common/con_view.php?code=GA68f6fd7cd7a58  
>     [cite: 40]  
> 34. https://96hb.tistory.com/51  
>     [cite: 16]  
> 35. https://www.inven.co.kr/webzine/news/?news=316577&site=esportsts  
>     [cite: 41]  
> 36. https://buckgu.tistory.com/241  
>     [cite: 1]  
> 37. https://onegameit.tistory.com/15  
>     [cite: 2]  
> 38. https://www.gamevu.co.kr/news/articleView.html?idxno=59122  
>     [cite: 10]  
> 39. https://www.gameple.co.kr/news/articleView.html?idxno=212168  
>     [cite: 3]  
> 40. https://photoneo.tistory.com/entry/%EB%A7%88%EB%B9%84%EB%85%B8%EA%B8%B0-%EB%AA%A8%EB%B0%94%EC%9D%BC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EC%84%B1%EC%9E%A5-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%B4%88%EB%B3%B4%EB%B6%80%ED%84%B0-%EC%83%81%EA%B8%89%EC%9E%90%EA%B9%8C%EC%A7%80  
>     [cite: 5]  
> 41. https://terran-scv.tistory.com/121  
>     [cite: 4]

#### **참고 자료**

> 1. 백 일흔 한 번째 게임 분석 : 마비노기 모바일(mabinogi mobile) - 벅구, [https://buckgu.tistory.com/241](https://buckgu.tistory.com/241)  
> 2. 마비노기 모바일, 세로모드 채팅 기능! 출시일 공개 - 원게임잇, [https://onegameit.tistory.com/15](https://onegameit.tistory.com/15)  
> 3. [체험기] 마비노기 모바일, UI로 되살린 '낭만' - 게임플, [https://www.gameple.co.kr/news/articleView.html?idxno=212168](https://www.gameple.co.kr/news/articleView.html?idxno=212168)  
> 4. 마비노기 모바일, 20년 감성 그대로 돌아오다! 기대 포인트 총정리, [https://terran-scv.tistory.com/121](https://terran-scv.tistory.com/121)  
> 5. 마비노기 모바일 효율적인 성장 가이드: 초보부터 상급자까지 - 훈수쟁이, [https://photoneo.tistory.com/entry/%EB%A7%88%EB%B9%84%EB%85%B8%EA%B8%B0-%EB%AA%A8%EB%B0%94%EC%9D%BC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EC%84%B1%EC%9E%A5-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%B4%88%EB%B3%B4%EB%B6%80%ED%84%B0-%EC%83%81%EA%B8%89%EC%9E%90%EA%B9%8C%EC%A7%80](https://photoneo.tistory.com/entry/%EB%A7%88%EB%B9%84%EB%85%B8%EA%B8%B0-%EB%AA%A8%EB%B0%94%EC%9D%BC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EC%84%B1%EC%9E%A5-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%B4%88%EB%B3%B4%EB%B6%80%ED%84%B0-%EC%83%81%EA%B8%89%EC%9E%90%EA%B9%8C%EC%A7%80)  
> 6. RISS 검색 - 국내학술지논문 상세보기, [https://m.riss.kr/search/detail/DetailView.do?p_mat_type=1a0202e37d52c72d&control_no=65625bba30f8a3687ecd42904f0c5d65](https://m.riss.kr/search/detail/DetailView.do?p_mat_type=1a0202e37d52c72d&control_no=65625bba30f8a3687ecd42904f0c5d65)  
> 7. [리뷰] PC에서 만개한 잠재력 - '스텔라 블레이드' 컴플리트 에디션, [https://www.thisisgame.com/articles/213732](https://www.thisisgame.com/articles/213732)  
> 8. 반지의 제왕: 북부 전쟁, 15년 만에 깜짝 리마스터 출시 | 콘솔 인벤, [https://m.inven.co.kr/webzine/wznews.php?site=console&l=255741&p=3&idx=319411](https://m.inven.co.kr/webzine/wznews.php?site=console&l=255741&p=3&idx=319411)  
> 9. 데이브 더 다이버 모바일 버전, 양대마켓 사전예약 개시 - 인벤, [https://www.inven.co.kr/webzine/news/?news=317953&site=iw2](https://www.inven.co.kr/webzine/news/?news=317953&site=iw2)  
> 10. 넥슨 '마비노기 모바일', “언어의 장벽 넘어 온기 전할 것” - 게임뷰, [https://www.gamevu.co.kr/news/articleView.html?idxno=59122](https://www.gamevu.co.kr/news/articleView.html?idxno=59122)  
> 11. [생생] 日 선출시한 김용하 PD 신작, '블루 아카이브' | 웹진 인벤, [https://m.inven.co.kr/webzine/wznews.php?idx=251144&iskin=maple](https://m.inven.co.kr/webzine/wznews.php?idx=251144&iskin=maple)  
> 12. [인터뷰] 유저와 함께 한 건강한 청춘의 이야기, 블루 아카이브의 4.5주년, [https://www.inven.co.kr/webzine/news/?news=316991](https://www.inven.co.kr/webzine/news/?news=316991)  
> 13. [인터뷰] 블붕이 소원 성취 "용하 형 영접해서 최대한 다 물어봄" - Daum, [https://v.daum.net/v/UnjJASHl5u](https://v.daum.net/v/UnjJASHl5u)  
> 14. [리뷰] 뉴 스타일과 농축된 차세대 액션, '젠레스 존 제로' | 웹진 인벤, [https://www.inven.co.kr/webzine/news/?news=296978&site=zzz](https://www.inven.co.kr/webzine/news/?news=296978&site=zzz)  
> 15. 중국 게임 - 일괄 소탕 기능의 진화, [https://tophet.tistory.com/124](https://tophet.tistory.com/124)  
> 16. [Unity] TextMeshPro(TMP) 한글 폰트 적용 가이드, [https://96hb.tistory.com/51](https://96hb.tistory.com/51)  
> 17. UI/UX 디자인을 위한 깔끔한 가독성 폰트 - 산돌구름, [https://www.sandollcloud.com/font-themes/300](https://www.sandollcloud.com/font-themes/300)  
> 18. 디아블로 이모탈 리뷰 | 웹진 인벤, [https://www.inven.co.kr/webzine/news/?news=272619](https://www.inven.co.kr/webzine/news/?news=272619)  
> 19. [NDC26] 3주 걸리던 일을 30분만에, 넥슨의 리서치 분석 툴 '인사이트, [https://www.inven.co.kr/webzine/news/?news=317513](https://www.inven.co.kr/webzine/news/?news=317513)  
> 20. 한눈에 보는 NDC 2026 AI 세션... '개발 현장을 파고들다' - 더게임스, [https://www.tgdaily.co.kr/news/articleView.html?idxno=405043](https://www.tgdaily.co.kr/news/articleView.html?idxno=405043)  
> 21. [NDC 2026] 넥슨 이세왕 연구원 “인사이트 파인더, 3주→30분”, [http://www.newstoon.co.kr/news/articleView.html?idxno=77967](http://www.newstoon.co.kr/news/articleView.html?idxno=77967)  
> 22. [NDC26] 넥슨 이세왕 UX 분석 담당, "유저 리서치, 사람과 AI가 할 일, [https://www.gamevu.co.kr/news/articleView.html?idxno=58721](https://www.gamevu.co.kr/news/articleView.html?idxno=58721)  
> 23. [NDC 26] 넥슨 UX 분석팀 “유저 리서치, AI 무작정 도입하면 안 된다”, [https://www.gamemeca.com/view.php?gid=1776559](https://www.gamemeca.com/view.php?gid=1776559)  
> 24. [게임+]넥슨 NDC 2026, 넥슨과 크래프톤의 AX 대응 대담, [https://www.businessplus.kr/news/articleView.html?idxno=113048](https://www.businessplus.kr/news/articleView.html?idxno=113048)  
> 25. [NDC26] AI 시대, 넥슨은 데이터로 무엇을 준비하는가 | 웹진 인벤, [https://www.inven.co.kr/webzine/news/?news=317553](https://www.inven.co.kr/webzine/news/?news=317553)  
> 26. UI 디자인 어포던스 속성이 사용자 태도에 미치는 영향의 메타분석 연구, [https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11828584](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11828584)  
> 27. 인공지능 - 콘텐츠 미래산업 교육연구단 사업 성과, [https://bk21four.cau.ac.kr/gsaim/bm/bm_1.php](https://bk21four.cau.ac.kr/gsaim/bm/bm_1.php)  
> 28. 게임 뉴스 583 페이지 - 게임메카, [https://www.gamemeca.com/news.php?ca=i&p=583](https://www.gamemeca.com/news.php?ca=i&p=583)  
> 29. 6년만에 공개 전환, 넥슨 개발자 컨퍼런스(NDC) 발표자 모집 시작 - 인벤, [https://www.inven.co.kr/webzine/news/?news=302847](https://www.inven.co.kr/webzine/news/?news=302847)  
> 30. 게임 개발 51개 세션! '2026 넥슨 개발자 콘퍼런스' 16일 개막 - 인벤, [https://m.inven.co.kr/webzine/wznews.php?searchwhere=writer&svalue=%EC%96%91%EC%98%81%EC%84%9D&site=vb&idx=317488](https://m.inven.co.kr/webzine/wznews.php?searchwhere=writer&svalue=%EC%96%91%EC%98%81%EC%84%9D&site=vb&idx=317488)  
> 31. 게임에 집중한 넥슨 AI전략…NDC서 전환 방향 확인 - 딜사이트, [https://dealsite.co.kr/articles/163343](https://dealsite.co.kr/articles/163343)  
> 32. AI 기술, 게임 개발에 접목은 이렇게…넥슨, 'NDC 26'서 공유, [https://www.mt.co.kr/tech/2026/06/02/2026060216051868979](https://www.mt.co.kr/tech/2026/06/02/2026060216051868979)  
> 33. 성공담 걷어낸 넥슨·크래프톤…AX 핵심은 '시행착오' [NDC26] - 블로터, [https://www.bloter.net/news/articleView.html?idxno=665807](https://www.bloter.net/news/articleView.html?idxno=665807)  
> 34. `NDC 2026`, 6월 판교서 개막…AI·게임 개발 노하우 공유 - 디지털데일리, [https://m.ddaily.co.kr/page/view/2026051115053766780](https://m.ddaily.co.kr/page/view/2026051115053766780)  
> 35. 모바일 게임기획 따라하며 배우기 | PDF - Slideshare, [https://www.slideshare.net/slideshow/ss-132752302/132752302](https://www.slideshare.net/slideshow/ss-132752302/132752302)  
> 36. [NDC 26] NEXON UX Analysis Team: "User research, do not blindly, [https://www.gamemeca.com/en/view.php?gid=1776559](https://www.gamemeca.com/en/view.php?gid=1776559)  
> 37. NDC26, 변화 속에서 답을 찾는 개발자들 - 넥슨태그, [https://blog.nexon.com/post/3488629](https://blog.nexon.com/post/3488629)  
> 38. “그럴듯한 오답이 더 위험”… 넥슨이 AI를 반만 믿는 이유 - 천지일보, [https://www.newscj.com/news/articleView.html?idxno=3409567](https://www.newscj.com/news/articleView.html?idxno=3409567)  
> 39. [마이크로 토크] 넥슨포럼이 인생의 취미로 - NDC Replay, [https://ndcreplay.nexon.com/NDC2018/sessions/NDC2018_0088.html](https://ndcreplay.nexon.com/NDC2018/sessions/NDC2018_0088.html)  
> 40. '마비노기 모바일', 5060세대부터 글로벌까지 노린다 - 게임샷, [https://m.gameshot.net/common/con_view.php?code=GA68f6fd7cd7a58](https://m.gameshot.net/common/con_view.php?code=GA68f6fd7cd7a58)  
> 41. [체험기] "진짜 다르다"… 미리 해본 문명7 대격변 패치 '시간의 시험', [https://www.inven.co.kr/webzine/news/?news=316577&site=esportsts](https://www.inven.co.kr/webzine/news/?news=316577&site=esportsts)
