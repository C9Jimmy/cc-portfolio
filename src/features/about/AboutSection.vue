<script setup lang="ts">
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="section" id="about">
    <GhostNumber number="02" />
    <div class="col">
      <SectionTitle text="About" />
      <div class="about-grid">
        <img :src="`${base}images/260410_72dpi.jpg`" alt="程資閔" class="about-photo" />
        <div class="about-text">
          <p>Hi, I'm Chris Cheng. 畢業於國立虎尾科技大學多媒體設計系。熱衷於持續學習的跨領域工作者，領域涵蓋前端開發、UI/UX 設計與視覺設計。習慣透過廣泛閱讀吸收新知，保持對資訊趨勢的敏銳度，以確保我的實作能跟上快速變化的數位時代。</p>
          <p>具備前端開發與 UI/UX 設計的雙重實務背景。曾於醫療軟體公司以 Vue.js 參與 HIS 系統從 table-based 架構重構為模組化元件，並獨立建置 Web App 登入頁面、使用 Git / GitLab 進行版本控管。在益林，我負責六家企業官網的 HTML/CSS 切版，使用 Bootstrap 建置響應式頁面。目前正學習 Vue 3 Composition API 與 TypeScript，並以此網站作為實作驗證。設計師出身的前端視角，能精準理解視覺意圖，有效降低設計工程溝通成本。</p>
          <p>我認為在 AI 世代，「協作、溝通與人的溫度」反而成為專案成功的關鍵。因此擅長擔任設計與工程之間的橋樑，將視覺語言精準轉化為可執行的前端邏輯。希望結合過去在 Vue.js 開發、UI/UX 規劃及跨團隊協作的多元經驗，協助團隊在數位轉型的浪潮中，打造兼具美感與實用性的產品。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* cream background */
section {
  background: var(--cream);
  overflow-x: clip;
}

/* top wave: white → cream (matches v2's aboutWaveSway) */
section::before {
  content: '';
  position: absolute;
  left: -50%;
  top: -120px;
  width: 200%;
  height: 208px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 208' preserveAspectRatio='none'%3E%3Cpath fill='%23F8F6F1' d='M0,88 C64,152 192,24 320,88 C448,152 576,24 720,88 C864,152 992,24 1120,88 C1248,152 1376,24 1440,88 L1440,208 L0,208 Z'/%3E%3C/svg%3E");
  background-size: 50% 100%;
  background-repeat: repeat-x;
  animation: aboutWaveSway 10s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

@keyframes aboutWaveSway {
  from { transform: translateX(0); }
  to   { transform: translateX(10%); }
}

.about-grid {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  align-items: flex-start;
}

.about-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--yellow);
  flex-shrink: 0;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-text p {
  font-size: 15px;
  line-height: 1.85;
  color: #333;
}

.about-subhead {
  font-weight: 700;
  color: var(--black) !important;
  margin-top: 8px;
}

@media (max-width: 767px) {
  .about-grid {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 24px;
  }
  .about-photo {
    width: 112px;
    height: 112px;
  }
}
</style>
