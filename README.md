# Chris Cheng — 個人履歷網站

程資閔（Chris Cheng）的個人 Portfolio，使用 Vue 3 + Vite + TypeScript 建置。

## 技術棧

| 項目 | 套件 | 精確版本 |
|---|---|---|
| 框架 | vue | 3.5.33 |
| 建置工具 | vite | 4.5.14（固定 v4，v5/v8 macOS native binding 問題）|
| 型別系統 | typescript | 5.3.3（固定 5.3.x）|
| Vue 型別 | vue-tsc | 1.8.27 |
| Vite 外掛 | @vitejs/plugin-vue | 4.6.2 |
| Composables | @vueuse/core | 14.2.1 |
| 樣式 | Scoped CSS + 全域 CSS 變數 | — |
| 圖示 | Font Awesome 6 CDN | — |
| 部署 | GitHub Pages（`/cc-portfolio/`）| — |

### 測試工具

| 套件 | 版本 | 用途 |
|---|---|---|
| vitest | 0.34.6 | 測試 runner（Vite-native） |
| @vue/test-utils | 2.x | Vue 元件掛載與互動 |
| @vitest/coverage-v8 | 0.34.6 | 覆蓋率報告 |
| happy-dom | 20.x | 瀏覽器環境模擬 |

## 開發指令

```bash
npm run dev           # 本地開發伺服器
npm run build         # 型別檢查 + 生產 build
npm run test          # 監看模式執行測試
npm run test:run      # 單次執行所有測試
npm run test:coverage # 執行測試並輸出覆蓋率報告
```

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
│   ├── skills/
│   │   ├── SkillsSection.vue
│   │   ├── SkillGroup.vue
│   │   ├── GitHubGraph.vue    # GitHub 貢獻圖（jogruber API）
│   │   ├── ContribSvg.vue     # 貢獻圖 SVG 渲染元件
│   │   └── github.types.ts    # Contribution / ContribResponse 型別
│   ├── visual/
│   │   ├── VisualSection.vue
│   │   ├── VisualCarousel.vue
│   │   ├── useCarousel.ts
│   │   └── useCarousel.test.ts  # 單元測試（100% coverage）
│   └── contact/ContactSection.vue
├── shared/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteNav.vue        # 透明 nav，僅 logo
│   │   │   ├── SiteFooter.vue
│   │   │   └── PageProgress.vue   # 右側 6 個導覽點
│   │   └── ui/
│   │       ├── GhostNumber.vue    # 背景大數字 01–06
│   │       └── SectionTitle.vue   # 標題 + 黃色螢光筆底線
│   ├── composables/
│   │   └── useRevealOnScroll.ts   # IntersectionObserver 進場（@vueuse/core）
│   ├── data/resume.ts             # 所有履歷內容（單一資料來源）
│   └── types/resume.ts            # TypeScript 型別定義（含 CardBg union）
├── style/
│   ├── variables.css              # CSS 自訂屬性（顏色、字級、間距、卡片漸層）
│   └── global.css                 # 全域樣式、共用元件（.chip、.tag 等）
└── App.vue                        # 全域 ghost 3D tilt 效果
```

## 設計系統

### CSS 變數（variables.css）

```css
/* 色彩 */
--black:       #111111
--white:       #ffffff
--yellow:      #F5C518   /* 主色調 */
--yellow-tint: #FFFDE7   /* hover 背景 */
--cream:       #F8F6F1   /* 奶油背景 */
--gray:        #888888
--gray2:       #bbbbbb
--border:      #e5e5e5
--text-secondary: #333333
--status-green:   #22c55e

/* 版面 */
--nav-h:        52px
--nav-px:       60px     /* 手機: 24px */
--section-px:   40px     /* 手機: 24px */
--section-py:   100px    /* 手機: 80px */

/* 專案卡片漸層（bg-web / bg-app / bg-webapp / bg-seo / bg-python）*/
--card-web-start / --card-web-end
--card-app-start / --card-app-end
...
```

### 色彩節奏

Hero（白）→ About（奶油）→ Exp（白）→ Skills（奶油）→ Visual（白）→ Contact（黑）

### 型別安全

`ProjectCard.bg` 使用 `CardBg` union type，TypeScript 編譯期即可攔截拼字錯誤：

```ts
export type CardBg = 'bg-web' | 'bg-app' | 'bg-webapp' | 'bg-seo' | 'bg-python'
```

## 注意事項

- Vite 8 / Vite 5 在 macOS 上因 rolldown/rollup native binding code signature 問題無法 build，已固定使用 Vite 4
- 圖片資源放在 `public/images/`，透過 `import.meta.env.BASE_URL` 拼接路徑
- GitHub 貢獻圖使用第三方 API（`github-contributions-api.jogruber.de`），無需 token，但需要網路連線
- `vitest` 使用 Vitest 0.34（Vite 4 相容版），搭配 `happy-dom` 代替 jsdom
