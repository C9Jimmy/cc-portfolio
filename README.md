# Chris Cheng — 個人履歷網站

程資閔（Chris Cheng）的個人 Portfolio，使用 Vue 3 + Vite + TypeScript 建置。

## 技術棧

| 項目 | 選擇 |
|---|---|
| 框架 | Vue 3 Composition API + `<script setup>` |
| 建置工具 | Vite 4（使用 rollup 3，避免 macOS native binding 問題）|
| 型別 | TypeScript 5.3 |
| 樣式 | Scoped CSS + 全域 CSS 變數 |
| 圖示 | Font Awesome 6（CDN，無 emoji） |
| 部署 | GitHub Pages（`/cc-portfolio/` base path）|

## 本機開發

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
# → http://localhost:5173/cc-portfolio/
```

## 建置與部署

```bash
# 型別檢查 + 建置
npm run build

# 預覽 production build
npm run preview
```

部署透過 `.github/workflows/deploy.yml` 自動執行，push 到 `main` 即觸發。

## 專案結構

```
src/
├── features/               # 各頁面區塊
│   ├── hero/               # Hero section（floaters + pigeon seal）
│   │   ├── HeroSection.vue
│   │   └── useHeroParallax.ts
│   ├── about/AboutSection.vue
│   ├── exp/
│   │   ├── ExpSection.vue
│   │   └── ExpRow.vue
│   ├── projects/
│   │   ├── ProjectsSection.vue
│   │   └── ProjectRow.vue
│   ├── skills/
│   │   ├── SkillsSection.vue
│   │   ├── SkillGroup.vue
│   │   └── GitHubGraph.vue  # GitHub 貢獻圖（jogruber API）
│   ├── visual/
│   │   ├── VisualSection.vue
│   │   ├── VisualCarousel.vue
│   │   └── useCarousel.ts
│   └── contact/ContactSection.vue
├── shared/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteNav.vue        # 透明 nav，僅 logo
│   │   │   ├── SiteFooter.vue
│   │   │   └── PageProgress.vue   # 右側 7 個導覽點
│   │   └── ui/
│   │       ├── GhostNumber.vue    # 背景大數字 01–07
│   │       └── SectionTitle.vue   # 標題 + 黃色螢光筆底線
│   ├── composables/
│   │   ├── useRevealOnScroll.ts   # IntersectionObserver 進場
│   │   └── useMouseParallax.ts
│   ├── data/resume.ts             # 所有履歷內容（單一資料來源）
│   └── types/resume.ts            # TypeScript 型別定義
├── style/
│   ├── variables.css              # CSS 自訂屬性（顏色、字級、間距）
│   └── global.css                 # 全域樣式、共用元件
└── App.vue                        # 全域 ghost 3D tilt 效果
```

## 設計系統

### CSS 變數（variables.css）

```css
--black:       #111111
--white:       #ffffff
--yellow:      #F5C518   /* 主色調 */
--yellow-tint: #FFFDE7   /* hover 背景 */
--cream:       #F8F6F1   /* 奶油背景 */
--gray:        #888888
--gray2:       #bbbbbb
--border:      #e5e5e5
--section-px:  240px     /* 桌面版左右間距（RWD 自動調整）*/
```

### 響應式間距（--section-px）

| 螢幕寬度 | --section-px |
|---|---|
| ≥ 1200px | 240px |
| 768–1199px | 60px |
| ≤ 767px | 24px |

所有 section padding、nav padding、hover 負 margin 效果均使用此變數。

### 色彩節奏

Hero（白）→ About（奶油）→ Exp（白）→ Projects（白）→ Skills（奶油）→ Visual（白）→ Contact（黑）

## 注意事項

- Vite 8 / Vite 5 在 macOS 上因 rolldown/rollup native binding code signature 問題無法 build，已固定使用 Vite 4
- 圖片資源放在 `public/images/`，透過 `import.meta.env.BASE_URL` 拼接路徑
- GitHub 貢獻圖使用第三方 API（`github-contributions-api.jogruber.de`），無需 token，但需要網路連線
