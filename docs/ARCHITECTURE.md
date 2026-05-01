# 架構說明

## 元件樹

```
App.vue
├── SiteNav.vue          # fixed 透明導覽列（僅 logo）
├── PageProgress.vue     # fixed 右側 7 個導覽點（IntersectionObserver）
├── main
│   ├── HeroSection.vue  # 01 — 主視覺
│   ├── AboutSection.vue # 02 — 自我介紹
│   ├── ExpSection.vue   # 03 — 工作經歷
│   ├── SkillsSection.vue   # 04 — 技能
│   ├── VisualSection.vue   # 05 — Projects carousel
│   └── ContactSection.vue  # 06 — 聯絡
└── SiteFooter.vue
```

## 資料流

```
src/shared/data/resume.ts
  ├── profile          → HeroSection, ContactSection
  ├── expItems         → ExpSection → ExpRow（v-for）
  ├── skillGroups      → SkillsSection → SkillGroup（v-for）
  ├── projectItems     → 舊版專案列表資料（保留）
  ├── projectCards     → VisualSection → VisualCarousel（v-for）
  └── visuals          → 舊版視覺作品資料（保留）
```

所有內容資料只存在 `resume.ts`，元件透過 props 接收，不直接存取資料檔案（除了 section 級別的父元件）。
Projects carousel 的位置與翻牌狀態由 `v-for` 產生的陣列索引控制，內容資料不需要維護手動排序 id。

## 互動效果

### Ghost 3D Tilt（App.vue）
```
onMounted → querySelectorAll('.section') → 每個 section 加 mousemove / mouseleave
  mousemove: 計算滑鼠在 section 內的相對位置 → 設定 .ghost 的 3D transform
  mouseleave: spring-back 到初始角度（0.8s cubic-bezier）
```

### Hero Floaters 視差（useHeroParallax.ts）
```
12 個 floater，各有不同深度值（FLOATER_DEPTHS）
外層 div：CSS keyframe drift 動畫（5–10s，alternate）
內層 div：mousemove → translate(x, y)（0.3s cubic-bezier）
兩層分離，CSS animation 不衝突 JS transform
```

### 進場動畫（useRevealOnScroll.ts）
```
IntersectionObserver（threshold 可配置）
→ isVisible ref
→ 各元件 :class="{ vis: isVisible }"
→ CSS transition（opacity / transform）
```

### PageProgress（PageProgress.vue）
```
IntersectionObserver（threshold: 0.5）→ 更新 activeIdx
6 個 section id：hero, about, exp, skills, projects, contact
Contact（深色背景）時自動切換為白色點樣式
```

## CSS 架構

### 變數層級
```
variables.css    # :root — 顏色、字級、間距
global.css       # 全域元素樣式、共用 class（.chip、.tag、.sec-title 等）
[component].vue  # scoped — 元件專屬樣式
```

### --section-px 系統
單一變數控制所有水平間距，避免各元件各自 hardcode：

```css
/* section padding */
.section { padding: 100px var(--section-px); }

/* nav padding（獨立，不用 --section-px）*/
.nav { padding: 0 60px; }

/* col 寬度限制 */
.col { width: min(820px, 100%); margin: 0 auto; }

/* 懸停展開效果（Exp、Projects）*/
.exp-row:hover {
  margin: 0 calc(-1 * var(--section-px));
  padding: 32px var(--section-px);
}
```

## 部署

```
GitHub Actions (.github/workflows/deploy.yml)
  push to main
  → npm ci → npm run build
  → Deploy dist/ to GitHub Pages
  → https://c9jimmy.github.io/cc-portfolio/
```

Vite config 設定 `base: '/cc-portfolio/'`，所有資源路徑自動加上前綴。

## 已知限制

| 問題 | 原因 | 狀態 |
|---|---|---|
| Vite 固定在 v4 | macOS 的 rolldown/rollup native binary code signing 限制 | 已知，暫不升級 |
| GitHub 貢獻圖可能顯示 0 | 依賴第三方 API，只計算 public 貢獻 | 正常行為 |
| Visual 區塊圖片為 placeholder | 真實作品圖片尚未提供 | 待補 |
| PDF 履歷路徑 | `public/程資閔 Chris Cheng｜前端工程師.pdf` 已放置 | 完成 |
