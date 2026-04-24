<script setup lang="ts">
import { profile } from '@/shared/data/resume'
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="section ct-section" id="contact">
    <GhostNumber number="07" :light="true" />
    <img :src="`${base}images/260422-paper-plane.svg`" class="ct-plane" alt="" aria-hidden="true" />
    <div class="col">
      <h2 class="ct-big">
        一起打造<br />
        <span class="ct-yl">有溫度</span><br />
        的產品。
      </h2>
      <div class="ct-meta">
        <span><i class="fa-solid fa-envelope"></i>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </span>
        <span><i class="fa-solid fa-location-dot"></i>{{ profile.location }}</span>
      </div>
      <div class="ct-btns">
        <a :href="`mailto:${profile.email}`" class="btn btn-light">
          <i class="fa-solid fa-paper-plane fa-xs"></i>寄送 Email
        </a>
        <a href="/cc-portfolio/resume.pdf" download class="btn btn-outline">
          <i class="fa-solid fa-file-arrow-down fa-xs"></i>下載履歷
        </a>
      </div>
      <div class="social-grid">
        <a
          v-for="s in profile.social"
          :key="s.platform"
          :href="s.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-item"
          :aria-label="s.label"
          :title="s.label"
        >
          <i :class="s.icon"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ct-section {
  background: var(--black);
  color: #fff;
  overflow-x: clip;
}

/* white → black wave at top of Contact section */
.ct-section::before {
  content: '';
  position: absolute;
  left: -50%;
  top: -112px;
  width: 200%;
  height: 208px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 208' preserveAspectRatio='none'%3E%3Cpath fill='%23ffffff' d='M0,88 C64,152 192,24 320,88 C448,152 576,24 720,88 C864,152 992,24 1120,88 C1248,152 1376,24 1440,88 L1440,208 L0,208 Z'/%3E%3C/svg%3E");
  background-size: 50% 100%;
  background-repeat: repeat-x;
  animation: ctWaveSway 11s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

@keyframes ctWaveSway {
  from { transform: translateX(0); }
  to   { transform: translateX(-10%); }
}

.ct-plane {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-55%);
  width: 250px;
  opacity: 0.18;
  filter: brightness(0) invert(1);
  animation: planeDrift 8s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes planeDrift {
  from { transform: translateY(-55%) translate(0, 0) rotate(-3deg); }
  to   { transform: translateY(-55%) translate(18px, -14px) rotate(5deg); }
}

.ct-big {
  font-size: var(--ct-big-size);
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 0.95;
  margin-bottom: 40px;
}

.ct-yl { color: var(--yellow); }

.ct-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

.ct-meta span { display: flex; align-items: center; gap: 8px; }
.ct-meta a { color: rgba(255,255,255,0.75); transition: color 0.2s; }
.ct-meta a:hover { color: #fff; }

.ct-btns { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  text-decoration: none;
}

.btn-light { background: #fff; color: var(--black); }
.btn-light:hover { background: var(--yellow); }

.btn-outline { border: 1.5px solid rgba(255,255,255,0.3); color: #fff; }
.btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.08); }

.social-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.social-item {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  font-size: 18px;
  color: rgba(255,255,255,0.72);
  transition: color 0.2s, background 0.2s, transform 0.2s;
}

.social-item:hover {
  color: var(--yellow);
  background: rgba(255,255,255,0.06);
  transform: translateY(-1px);
}

@media (max-width: 767px) {
  .ct-plane { display: none; }
  .ct-big { letter-spacing: -2px; }
}
</style>
