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
          <p>Hi, I'm Chris Cheng. 畢業於國立虎尾科技大學多媒體設計系，具備前端開發與 UI/UX 設計的雙重實務背景，能將設計稿、網站內容與使用流程轉換為清楚可維護的前端頁面。</p>
          <p>曾於醫療軟體公司參與 Vue.js 醫療系統介面重構、Web App 登入頁建置與已上架視訊掛號服務維護改版；也曾使用 HTML5、CSS3、Bootstrap 完成多個企業官網 RWD 切版。近年在專案管理、WordPress 網站建置與 SEO 內容協作中，累積需求溝通、規格整理、時程協調與交付管理經驗。</p>
          <p>近期將 AI 輔助開發工具導入個人履歷網站與文件整理流程，用於需求拆解、樣式調整、程式碼除錯、內容整理與版本迭代。設計師出身的前端視角，能精準理解視覺意圖並與工程、設計、企劃或客戶端溝通，有效降低設計與實作之間的落差。</p>
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

@media (prefers-reduced-motion: reduce) {
  section::before { animation: none; }
}
</style>
