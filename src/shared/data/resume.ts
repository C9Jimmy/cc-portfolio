import type { Profile, ExpItem, ProjectItem, SkillGroup, VisualItem } from '@/shared/types/resume'

export const profile: Profile = {
  name: '程資閔',
  nameEn: 'Chris Cheng',
  titles: ['前端工程師', '專案管理', 'UI/UX 設計師'],
  location: '台中 · 遠端從優',
  email: 'ctzumiin@gmail.com',
  social: [
    { platform: 'github',    label: 'GitHub',    url: 'https://github.com/C9Jimmy',                          icon: 'fa-brands fa-github' },
    { platform: 'linkedin',  label: 'LinkedIn',  url: 'https://linkedin.com/in/chris-cheng-37a99a158',       icon: 'fa-brands fa-linkedin' },
    { platform: 'codepen',   label: 'Codepen',   url: 'https://codepen.io/c9jimmy',                          icon: 'fa-brands fa-codepen' },
    { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/zihmincheng/',              icon: 'fa-brands fa-instagram' },
    { platform: 'line',      label: 'LINE',      url: 'https://store.line.me/stickershop/author/5603809/zh-Hant', icon: 'fa-brands fa-line' },
  ],
}

export const experiences: ExpItem[] = [
  {
    period: '2021 / 07 — 2026 / 03',
    duration: '4 年 9 個月',
    role: '平面設計師',
    company: '紙研所有限公司',
    industry: '廣告行銷',
    description: '負責印刷案件從印前規格溝通到看印交付的完整流程；協助品牌 SEO 規劃與優化。主動將 AI 工具導入設計流程，用於概念收斂與文案優化，提升產能。2025 年起系統性自學前端開發，以 WordPress 完成 Trouver 網站從規劃到上線的完整流程。',
    chips: ['WordPress', 'JavaScript', 'Vue.js', 'Illustrator', 'Photoshop', 'InDesign', 'AI 工具'],
  },
  {
    period: '2018 / 10 — 2021 / 06',
    duration: '2 年 9 個月',
    role: 'UI/UX 設計師',
    company: '健康聯網資訊服務股份有限公司',
    industry: '電腦軟體服務',
    description: '參與 HIS 醫療系統從 table-based 架構重構為 Vue 元件架構；獨立建置 Web App 登入頁面，從設計到 Git commit 全程負責；以 Sketch / Adobe XD 出稿，透過 Zeplin 對接自己的前端實作，消除設計工程規格落差；協助 CURDoctor 視訊掛號服務前端開發，產品成功上架 App Store 與 Google Play；協助公司通過 ISO 27001 認證。',
    chips: ['Vue.js', 'Element-UI', 'Sketch', 'Adobe XD', 'Zeplin', 'GitLab', 'Jira', 'VS Code'],
  },
  {
    period: '2017 / 08 — 2018 / 07',
    duration: '1 年',
    role: '網頁設計師',
    company: '詩木林數位科技 S.M.L. DIGITAL.',
    industry: '遊戲產業',
    description: '規劃網站架構（Web Wireframe）與 APP 資訊架構（Mobile Wireframe）；設計活動頁面視覺並切版，協助 IT 團隊溝通視覺規格與前端樣式調整；負責跨職能專案管理與溝通整合。',
    chips: ['Web Wireframe', 'Mobile Wireframe', 'APP 架構規劃', '專案管理'],
  },
  {
    period: '2016 / 05 — 2017 / 03',
    duration: '約 1 年',
    role: '網頁設計師',
    company: '益林事業有限公司',
    industry: '網際網路',
    description: '使用 Bootstrap、HTML5、CSS3 實作響應式網頁（RWD），負責六家企業官網前端切版；執行 Banner 設計與網頁資料維護更新；協助行銷部門規劃社群視覺與活動企劃。',
    chips: ['Bootstrap', 'HTML5', 'CSS3', 'RWD', 'Banner 設計'],
  },
]

export const projects: ProjectItem[] = [
  {
    idx: '01',
    title: '醫療資訊系統介面設計',
    meta: 'UI/UX · Vue.js · 2019–2021 · 健康聯網',
    featured: true,
  },
  {
    idx: '02',
    title: '品牌視覺 × 印刷設計全案',
    meta: '視覺設計 · AI 工具 · 2021–2026 · 紙研所',
  },
  {
    idx: '03',
    title: '企業官網 RWD 切版',
    meta: 'HTML5 · CSS3 · 前端 · 2016–2018',
    url: 'https://www.appseoweb.com/',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: '前端開發',
    chips: [
      { name: 'HTML5', highlight: true },
      { name: 'CSS3', highlight: true },
      { name: 'JavaScript', highlight: true },
      { name: 'Vue.js', highlight: true },
      { name: 'Bootstrap' },
      { name: 'Sass/SCSS' },
      { name: 'RWD' },
      { name: 'WordPress' },
    ],
  },
  {
    label: 'UI/UX 設計',
    chips: [
      { name: 'Sketch' },
      { name: 'Adobe XD' },
      { name: 'Zeplin' },
      { name: 'Figma' },
      { name: 'Web Wireframe' },
      { name: 'Mobile Wireframe' },
    ],
  },
  {
    label: '視覺設計',
    chips: [
      { name: 'Illustrator' },
      { name: 'Photoshop' },
      { name: 'InDesign' },
    ],
  },
  {
    label: '開發工具',
    chips: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Sourcetree' },
      { name: 'AI 工具' },
    ],
  },
]

export const visuals: VisualItem[] = [
  { src: '/cc-portfolio/images/visual-1.jpg', alt: '品牌視覺設計', backTitle: 'Brand Identity', backDesc: '企業品牌視覺規劃' },
  { src: '/cc-portfolio/images/visual-2.jpg', alt: '印刷品設計', backTitle: 'Print Design', backDesc: '印刷物設計與印前規格' },
  { src: '/cc-portfolio/images/visual-3.jpg', alt: 'UI 介面設計', backTitle: 'UI Design', backDesc: '醫療系統介面設計' },
  { src: '/cc-portfolio/images/visual-4.jpg', alt: 'Trouver 網站', backTitle: 'Web Design', backDesc: 'WordPress 網站規劃上線' },
  { src: '/cc-portfolio/images/visual-5.jpg', alt: '社群視覺', backTitle: 'Social Media', backDesc: '社群平台視覺設計' },
]
