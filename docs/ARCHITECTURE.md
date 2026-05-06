# 架構說明

## 元件樹

```
App.vue
├── SiteNav.vue           # fixed 透明導覽列（僅 logo）
├── PageProgress.vue      # fixed 右側 6 個導覽點（IntersectionObserver）
├── main
│   ├── HeroSection.vue   # 01 — 主視覺（floaters + pigeon seal）
│   ├── AboutSection.vue  # 02 — 自我介紹
│   ├── ExpSection.vue    # 03 — 工作經歷
│   │   └── ExpRow.vue    # 單筆經歷列（startDate / endDate）
│   ├── SkillsSection.vue # 04 — 技能
│   │   ├── SkillGroup.vue
│   │   └── GitHubGraph.vue
│   │       └── ContribSvg.vue  # 貢獻圖 SVG 渲染（桌面 / 手機各一）
│   ├── VisualSection.vue # 05 — Projects carousel
│   │   └── VisualCarousel.vue
│   └── ContactSection.vue # 06 — 聯絡
└── SiteFooter.vue
```

## 資料流

```
src/shared/data/resume.ts
  ├── profile        → HeroSection, ContactSection
  ├── experiences    → ExpSection → ExpRow（v-for）
  ├── skillGroups    → SkillsSection → SkillGroup（v-for）
  └── projectCards   → VisualSection → VisualCarousel（v-for）
```

所有內容資料只存在 `resume.ts`，元件透過 props 接收，section 級父元件直接 import。

### 型別定義（shared/types/resume.ts）

| 介面 | 說明 |
|------|------|
| `Profile` | 姓名、職稱、社群連結 |
| `ExpItem` | 工作經歷（`startDate` / `endDate` 分欄） |
| `ProjectCard` | 作品卡（`bg: CardBg` union 確保型別安全）|
| `SkillGroup` / `SkillChip` | 技能群組 |
| `CardBg` | `'bg-web' \| 'bg-app' \| 'bg-webapp' \| 'bg-seo' \| 'bg-python'` |

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
@vueuse/core useIntersectionObserver（threshold 可配置）
→ isVisible ref（觸發後 stop，只播一次）
→ 各元件 :class="{ vis: isVisible }"
→ CSS transition（opacity / transform）
```

### Projects Carousel（useCarousel.ts + VisualCarousel.vue）
```
useCarousel(total) → { centerIdx, flippedIdx, positionFor, next, prev, clickCard }

positionFor(i):
  offset = i - centerIdx
  若超出 ±total/2 則繞圈修正
  回傳 pos-center / pos-left1 / pos-right1 / pos-left2 / pos-right2 / pos-hidden

clickCard(idx):
  中心卡 → 切換翻面（flippedIdx）
  非中心卡 → 導覽至該卡（centerIdx = idx）
```

### PageProgress（PageProgress.vue）
```
IntersectionObserver（threshold: 0.5）→ 更新 activeIdx
6 個 section id：hero, about, exp, skills, visual, contact
Contact（深色背景）時自動切換為白色點樣式
Hero section 不顯示進度點（v-show="!isOnHero"）
```

## CSS 架構

### 變數層級
```
variables.css    # :root — 顏色、字級、間距、卡片漸層色
global.css       # 全域元素樣式、共用 class（.chip、.tag、.sec-title 等）
[component].vue  # scoped — 元件專屬樣式
```

### --section-px 系統
單一變數控制所有水平間距，避免各元件各自 hardcode：

```css
/* section padding */
.section { padding: 100px var(--section-px); }

/* nav padding（--nav-px，獨立追蹤）*/
.nav { padding: 0 var(--nav-px); }

/* 懸停展開效果（Exp）*/
.exp-row:hover {
  margin: 0 calc(-1 * var(--section-px));
  padding: 32px var(--section-px);
}
```

## 測試

### 設定

```
vitest.config.ts        # 測試設定（happy-dom、coverage v8、@ alias）
src/**/*.test.ts        # 測試檔放在各 feature 資料夾旁
coverage/               # 輸出目錄（gitignore）
```

### 覆蓋率目標：80%+

| 檔案 | 測試檔 | 覆蓋率 |
|------|--------|--------|
| `useCarousel.ts` | `useCarousel.test.ts` | 100% |

### 執行指令

```bash
npm run test            # 監看模式（開發中）
npm run test:run        # 單次執行
npm run test:coverage   # 覆蓋率報告（輸出至 coverage/）
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
| Vitest 固定在 0.34 | 1.x / 2.x 需要 Vite 5+，與本專案不相容 | 已知 |
| GitHub 貢獻圖可能顯示 0 | 依賴第三方 API，只計算 public 貢獻 | 正常行為 |
| Ghost 3D tilt perspective | 從 `--ghost-perspective` CSS var 讀取，需 `getComputedStyle`（待實作）| 已知 |
