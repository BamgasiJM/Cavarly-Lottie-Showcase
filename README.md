# Cavarly Lottie Showcase

> Motion Graphics Archive • Exported as Lottie Animation

Cavalry에서 제작한 모션 그래픽 작업물을 Lottie JSON 포맷으로 익스포트하여 웹에서 재생하는 아카이브 사이트입니다.
새로운 작업물이 완성될 때마다 지속적으로 추가할 수 있는 확장형 구조로 설계되었습니다.

🔗 **Live Demo**: [cavarly-lottie-showcase.vercel.app](https://cavarly-lottie-showcase.vercel.app)

---

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [디자인 스타일](#디자인-스타일)
- [컴포넌트 구성](#컴포넌트-구성)
- [시작하기](#시작하기)
- [애니메이션 추가 방법](#애니메이션-추가-방법)
- [빌드](#빌드)

---

## 프로젝트 개요

Cavalry에서 제작한 모션 그래픽 작업물을 Lottie 포맷으로 익스포트하고, 웹 브라우저에서 벡터 품질 그대로 재생하는 아카이브입니다.

**주요 특징**

- Cavalry 내장 Lottie 익스포트 기능을 통한 직접 출력
- 해상도 독립적인 벡터 애니메이션 재생 (`lottie-react` / SVG 렌더러)
- `src/data/animations.js`에 항목을 추가하는 것만으로 아카이브를 확장하는 구조

---

## 기술 스택

| 분류 | 라이브러리 / 도구 | 버전 |
|---|---|---|
| UI 프레임워크 | React | ^19.1.0 |
| 빌드 도구 | Vite | ^7.0.0 |
| Vite React 플러그인 | @vitejs/plugin-react | ^5.0.0 |
| 애니메이션 플레이어 | lottie-react | ^2.4.1 |

---

## 프로젝트 구조

```
Cavarly-Lottie-Showcase/
├── public/
│   └── lottie/                  # Lottie JSON 애니메이션 파일 보관소
│       └── *.json
├── src/
│   ├── components/
│   │   ├── Header.jsx           # 사이트 상단 masthead 영역
│   │   ├── Footer.jsx           # 사이트 하단 크레딧 영역
│   │   ├── Gallery.jsx          # 애니메이션 카드 목록 렌더링
│   │   └── LottieCard.jsx       # 개별 애니메이션 카드 (플레이어 포함)
│   ├── data/
│   │   └── animations.js        # 애니메이션 메타데이터 목록 (아카이브 데이터 소스)
│   ├── App.jsx                  # 루트 컴포넌트 (Header / Gallery / Footer 조립)
│   ├── main.jsx                 # 애플리케이션 진입점
│   └── styles.css               # 전역 스타일시트
├── index.html
├── vite.config.js
└── package.json
```

---

## 디자인 스타일

신문·출판물 레이아웃을 모티프로 한 에디토리얼 디자인 스타일을 적용하고 있습니다.

**색상 및 배경**

- 배경: 오프화이트 계열 베이지 (`#d9d9ce`) — 오래된 신문지 질감을 연상시키는 톤
- 텍스트 및 보더: 딥 블랙 (`#111`)
- 강조 색상: 붉은색 (`#cc0000`) — 각 카드의 Figure 번호에 사용

**타이포그래피**

| 역할 | 폰트 |
|---|---|
| 타이틀 (H1) | Playfair Display — 대형 serif 헤드라인 (`clamp(4rem, 10vw, 8rem)`) |
| 본문 | Lora — serif 계열 본문용 |
| UI / 레이블 | Inter — 범용 sans-serif |
| 메타 정보 / 코드성 텍스트 | JetBrains Mono — edition, figure, card title, footer 등 |

**레이아웃**

- 최대 너비 `1280px`, 중앙 정렬
- 카드는 수직으로 쌓이는 단일 컬럼 그리드 (`gap: 24px`)
- 각 카드 내부는 메타 정보(5fr) + Lottie 플레이어(7fr)의 2컬럼 분할 구조
- 모든 엘리먼트 `border-radius: 0` — 직선 기반의 인쇄물 미학 유지
- 카드 hover 시 `box-shadow: 4px 4px 0 #111` + `-2px -2px` translate — 오프셋 그림자 효과
- 768px 이하 모바일에서 카드 내부가 단일 컬럼으로 전환

---

## 컴포넌트 구성

### `Header.jsx`
사이트 최상단 masthead 영역입니다. 볼륨 번호와 연도(`VOL. 1 • 2026`)를 표시하는 에디션 라벨, 대형 Playfair Display 타이틀, 아카이브 설명 텍스트로 구성됩니다. 상하에 4px solid 보더를 적용해 신문 헤드라인 형식을 취합니다.

### `Footer.jsx`
사이트 최하단 크레딧 영역입니다. 연도와 아카이브 명칭을 JetBrains Mono 폰트로 표시합니다. 상단 4px solid 보더로 본문과 구분됩니다.

### `Gallery.jsx`
`src/data/animations.js`의 배열을 순회하며 `LottieCard` 컴포넌트를 렌더링합니다. 데이터 소스와 UI 렌더링을 분리하는 역할을 합니다.

### `LottieCard.jsx`
개별 애니메이션 항목을 표시하는 카드 컴포넌트입니다. `title`, `file`, `figure`, `description` props를 받습니다.

- `useEffect`로 `/lottie/{file}` 경로에서 JSON을 `fetch`하여 `lottie-react`의 `<Lottie animationData={...} loop />` 에 전달합니다
- 로딩 중에는 `"Loading Animation..."`, fetch 실패 시 `"No Animation Loaded"` 플레이스홀더를 표시합니다
- 카드 좌측 메타 영역에는 Figure 번호(붉은색)와 작업 설명이, 우측에는 Lottie 플레이어가 배치됩니다

---

## 시작하기

### 요구 사항

- Node.js 18 이상
- npm 9 이상

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/BamgasiJM/Cavarly-Lottie-Showcase.git
cd Cavarly-Lottie-Showcase

# 패키지 설치
npm install

# 개발 서버 실행 (로컬 네트워크 노출 포함)
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.
`vite --host` 옵션이 적용되어 있으므로 동일 네트워크의 다른 기기에서도 접속 가능합니다.

---

## 애니메이션 추가 방법

### 1. Lottie JSON 파일 배치

Cavalry의 렌더 패널에서 Lottie 포맷으로 익스포트한 `.json` 파일을 `public/lottie/` 폴더에 추가합니다.

```
public/lottie/
├── Basic_Primitives.json   ← 기존 파일
└── New_Work.json           ← 새로 추가
```

### 2. 데이터 소스에 등록

`src/data/animations.js`의 배열에 새 항목을 추가합니다.

```js
export const animations = [
  {
    title: "Basic Primitives",
    file: "Basic_Primitives.json",
    figure: "Fig. 1.1",
    description: "Basic geometric primitives created with Cavalry.",
  },
  {
    title: "New Work",          // 카드 상단 타이틀
    file: "New_Work.json",      // public/lottie/ 내 파일명
    figure: "Fig. 1.2",         // 붉은색으로 표시되는 figure 번호
    description: "작업 설명",
  },
];
```

`Gallery.jsx`가 이 배열을 자동으로 순회하므로 `animations.js` 수정 외에 다른 파일을 건드릴 필요가 없습니다.

---

## 빌드

```bash
npm run build
```

`dist/` 폴더에 정적 파일이 생성됩니다.

---

© BamgasiJM. All rights reserved.
