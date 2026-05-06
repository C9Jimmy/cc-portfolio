# CLAUDE.md — cc-portfolio 專案規則

## 專案概況

程資閔（Chris Cheng）個人履歷網站，設計參考 `docs/prototypes/v2.html`（存放於 Google Drive）。
Vue 3 + Vite 4 + TypeScript，部署於 GitHub Pages（base: `/cc-portfolio/`）。

## 環境版本

### 執行環境

| 項目 | 精確版本 | 備注 |
|---|---|---|
| Node.js | v24.14.0 | `.nvmrc` 已鎖定，`nvm use` 自動切換 |
| npm | 11.8.0 | 隨 Node 附帶 |

### 核心框架

| 套件 | 精確版本 | 備注 |
|---|---|---|
| vue | 3.5.33 | Composition API + `<script setup>` |
| vite | 4.5.14 | **固定 v4**，v5/v8 在 macOS 有 native binding 問題 |
| typescript | 5.3.3 | **固定 5.3.x**，v5.8+ 選項（`erasableSyntaxOnly` 等）與此不相容 |

### 開發工具

| 套件 | 精確版本 |
|---|---|
| @vitejs/plugin-vue | 4.6.2 |
| vue-tsc | 1.8.27 |
| @vue/tsconfig | 0.5.1 |
| @types/node | 20.19.39 |

### 執行時相依

| 套件 | 精確版本 | 用途 |
|---|---|---|
| @vueuse/core | 14.2.1 | composables 工具庫（useIntersectionObserver 等）|

### 測試工具（devDependencies，不進 dist）

| 套件 | 精確版本 | 備注 |
|---|---|---|
| vitest | 0.34.6 | **固定 0.34.x**，1.x/2.x 需要 Vite 5+ |
| @vue/test-utils | 2.x | Vue 元件掛載 |
| @vitest/coverage-v8 | 0.34.6 | 覆蓋率（需與 vitest 同版本）|
| happy-dom | 20.x | 瀏覽器環境（jsdom 29 與 vitest 0.34 不相容）|

## 開發規則

### 資料修改
- 所有履歷內容（工作經歷、專案、技能）只能改 `src/shared/data/resume.ts`
- 型別定義只能改 `src/shared/types/resume.ts`
- 不要在 `.vue` 元件裡 hardcode 文字內容

### 樣式規則
- CSS 自訂屬性定義在 `src/style/variables.css`，不要在元件裡硬寫顏色值
- 共用元件樣式（`.chip`、`.tag`、`.sec-title`）在 `src/style/global.css`
- Section 左右間距統一使用 `var(--section-px)`（不要 hardcode px 值）
- Hover 負 margin 效果用 `calc(-1 * var(--section-px))`，不要 hardcode `-60px`

### 圖片路徑
- 所有圖片放 `public/images/`
- 路徑必須用 `` `${import.meta.env.BASE_URL}images/檔名` ``，不要寫死 `/cc-portfolio/`

### 測試規則
- 測試檔放在 feature 資料夾旁（e.g. `useCarousel.test.ts` 緊鄰 `useCarousel.ts`）
- 測試設定在 `vitest.config.ts`（獨立，不改 `vite.config.ts`）
- 覆蓋率目標 80%+；純 composable 優先測試（不依賴 DOM）
- `npm run test:run` 單次執行；`npm run test:coverage` 輸出報告

### 不要動的東西
- `vite.config.ts` 的 `base: '/cc-portfolio/'` — 這是 GitHub Pages 必要設定
- `package.json` 的 Vite 版本（固定 v4，v5/v8 在 macOS 有 native binding 問題）
- `package.json` 的 vitest 版本（固定 0.34.x，1.x/2.x 需要 Vite 5+）
- `.github/workflows/deploy.yml` — CI/CD 設定

## CSS 設計約定

### 色彩節奏（各 section 背景順序）
```
Hero(white) → About(cream) → Exp(white) → Projects(white) →
Skills(cream) → Visual(white) → Contact(black)
```

### 波浪分隔線規則
- **只有** About（cream top wave）和 Footer（white wave inside dark bg）有波浪，其他 section 不加
- Cream section 在頂部加 `section::before` 白→奶油波浪
- 波浪 SVG 用 `left: -50%; width: 200%; background-size: 50% 100%; background-repeat: repeat-x` 無縫循環

### Ghost 大數字
- 元件：`<GhostNumber number="01" />`（或加 `:light="true"` for Contact 深色背景）
- 全域 3D tilt 在 `App.vue` 的 `onMounted` 處理，不要在各 section 重複實作
- 尺寸：桌面 `28vw`，手機 `50vw`；位置 `bottom: -0.15em`（桌面）/ `calc(-0.1em - 10px)`（手機），靠右對齊區塊邊框

### Favicon & Logo
- Favicon：`public/images/cc-icon-y.svg`（SVG，`type="image/svg+xml"`）
- SiteNav logo dot：同 `cc-icon-y.svg`，12×12px，無 border-radius
- Hero floaters 圓形：使用 `cc-icon-b.svg`

### Footer 規則
- 文字：`Copyleft © [what-year-is-this] Chris Cheng`（不動態顯示年份）
- 角色：`Frontend Engineer` 和 `UI/UX Designer`，中間加閃爍綠點（`#22c55e`，`blink 2s infinite`）
- 桌面：Primary · ● · Secondary（CSS `order` 排列）
- 手機：grid-template-areas `"dot primary" / "sep secondary"` 換行

### Contact 規則
- 高亮文字用 `ct-yl`：`background: var(--yellow); color: var(--black); padding: 0 8px`
- Email icon 顏色：`var(--yellow)`
- 社群圖示：無框線（純 icon）
- PDF 履歷路徑：`` `${base}chris-cheng-resume.pdf` ``

### Chip 樣式
- 一般：白底，黑字，border-radius: 3px（方形）
- 高亮（`.hi`）：黃底，黑字，粗體
- Exp 區塊的技術 tags 也使用同樣的 `.chip` class

## RWD 重點

| 項目 | 規則 |
|---|---|
| Section 最小高度 | 全部 section 手機用 `min-height: 100svh`（global.css） |
| Section padding | `var(--section-px)`，三個 breakpoint 自動處理 |
| Ghost 數字 | 手機 `font-size: 50vw; bottom: calc(-0.1em - 10px); transform: none; transition: none;` |
| Pigeon seal | 手機 `display: none` |
| Paper plane | 手機 `display: none` |
| Page progress dots | Hero section 隱藏（`v-show="!isOnHero"`）；Contact 深色背景時 active dot 改黃色 |
| GitHub 貢獻圖 | 桌面 53 週 / 手機 20 週（各自獨立 SVG，CSS 切換）|
| Hero floaters | 手機縮小 `scale(0.55)`，隱藏 f2/f3/f6/f7/f11 |
| Exp 行動版排列 | `exp-year` 隱藏，改在 `exp-main` 內 `exp-date-mobile` span 顯示（role→company→date→desc→chips）|
| About 照片 | 圓形 80px（桌面）/ 112px 置中（手機），黃色 border |

## Build 注意事項

```bash
# 型別檢查（使用 tsconfig.app.json，不用根目錄的 tsconfig.json）
node_modules/.bin/vue-tsc --noEmit -p tsconfig.app.json

# Build
npm run build
```
