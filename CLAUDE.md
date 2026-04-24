# CLAUDE.md — cc-portfolio 專案規則

## 專案概況

程資閔（Chris Cheng）個人履歷網站，設計參考 `docs/prototypes/v2.html`（存放於 Google Drive）。
Vue 3 + Vite 4 + TypeScript，部署於 GitHub Pages（base: `/cc-portfolio/`）。

## 環境版本

| 項目 | 版本 | 備注 |
|---|---|---|
| Node.js | v24.14.0 | `.nvmrc` 已鎖定，`nvm use` 自動切換 |
| Vite | 4.5.x | 固定 v4，v5/v8 在 macOS 有 native binding 問題 |
| TypeScript | 5.3.x | 固定，v5.8+ 選項與 v4 不相容 |

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

### 不要動的東西
- `vite.config.ts` 的 `base: '/cc-portfolio/'` — 這是 GitHub Pages 必要設定
- `package.json` 的 Vite 版本（固定 v4，v5/v8 在 macOS 有 native binding 問題）
- `.github/workflows/deploy.yml` — CI/CD 設定

## CSS 設計約定

### 色彩節奏（各 section 背景順序）
```
Hero(white) → About(cream) → Exp(white) → Projects(white) →
Skills(cream) → Visual(white) → Contact(black)
```

### 波浪分隔線規則
- Cream section 在頂部加 `section::before` 白→奶油波浪
- Contact section 加 白→黑 波浪（`fill='%23ffffff'`）
- 波浪 SVG 用 `left: -50%; width: 200%; background-size: 50% 100%; background-repeat: repeat-x` 無縫循環

### Ghost 大數字
- 元件：`<GhostNumber number="01" />`（或加 `:light="true"` for Contact 深色背景）
- 全域 3D tilt 在 `App.vue` 的 `onMounted` 處理，不要在各 section 重複實作

### Chip 樣式
- 一般：白底，黑字，border-radius: 3px（方形）
- 高亮（`.hi`）：黃底，黑字，粗體
- Exp 區塊的技術 tags 也使用同樣的 `.chip` class

## RWD 重點

| 項目 | 規則 |
|---|---|
| Section padding | `var(--section-px)`，三個 breakpoint 自動處理 |
| Ghost 數字 | 手機 `transform: none; transition: none;`（不做 3D tilt）|
| Pigeon seal | 手機 `display: none` |
| Paper plane | 手機 `display: none` |
| Page progress dots | 手機 `display: none` |
| GitHub 貢獻圖 | 桌面 53 週 / 手機 20 週（各自獨立 SVG，CSS 切換）|

## Build 注意事項

```bash
# 型別檢查（使用 tsconfig.app.json，不用根目錄的 tsconfig.json）
node_modules/.bin/vue-tsc --noEmit -p tsconfig.app.json

# Build
npm run build
```
