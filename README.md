# Chris Cheng — Portfolio

程資閔（Chris Cheng）的個人 Portfolio。

🔗 [cc-portfolio](https://c9jimmy.github.io/cc-portfolio/)

## 技術棧

| 項目 | 套件 | 版本 |
|---|---|---|
| 框架 | vue | ^3.5.32 |
| 建置工具 | vite | ^4.5.5 |
| 型別系統 | typescript | ~5.3.2 |
| Composables | @vueuse/core | ^14.2.1 |
| 樣式 | Scoped CSS + CSS Custom Properties | — |
| 圖示 | Font Awesome 6 CDN | — |
| 部署 | GitHub Pages | — |

## 開發

```bash
npm install
npm run dev           # 本地開發伺服器
npm run build         # 型別檢查 + 生產 build
npm run test:run      # 執行測試
npm run test:coverage # 測試覆蓋率報告
```

## 專案結構

```
src/
├── features/        # 各頁面區塊（hero / about / exp / skills / visual / contact）
├── shared/
│   ├── components/  # 共用元件（SiteNav、PageProgress、GhostNumber 等）
│   ├── composables/ # useRevealOnScroll
│   ├── data/        # resume.ts — 所有履歷內容
│   └── types/       # TypeScript 型別定義
└── style/           # variables.css、global.css
```
