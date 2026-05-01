<script setup lang="ts">
import { profile } from '@/shared/data/resume'
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="section ct-section" id="contact">
    <GhostNumber number="06" :light="true" />
    <img :src="`${base}images/260422-paper-plane.svg`" class="ct-plane" alt="" aria-hidden="true" />
    <div class="col">
      <h2 class="ct-big">
        一起打造<br />
        <span class="ct-yl">有溫度</span><br />
        的產品。
      </h2>
      <div class="ct-meta">
        <span>
          <i class="fa-solid fa-envelope"></i>
          {{ profile.nameEn }} · <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </span>
      </div>
      <div class="ct-btns">
        <a :href="`mailto:${profile.email}`" class="btn btn-light">
          <i class="fa-solid fa-paper-plane fa-xs"></i>寄送 Email
        </a>
        <a :href="`${base}程資閔 Chris Cheng｜前端工程師.pdf`" download class="btn btn-outline">
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


.ct-plane {
  position: absolute;
  right: 8%;
  top: 34%;
  transform: translateY(-50%);
  width: 250px;
  opacity: 0.09;
  filter: brightness(0) invert(1);
  animation: planeDrift 8s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes planeDrift {
  from { transform: translateY(-50%) translate(0, 0) rotate(-3deg); }
  to   { transform: translateY(-50%) translate(18px, -14px) rotate(5deg); }
}

.ct-big {
  font-size: var(--ct-big-size);
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 0.95;
  margin-bottom: 40px;
}

.ct-yl { background: var(--yellow); color: var(--black); padding: 0 8px; }

.ct-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

.ct-meta span { display: flex; align-items: center; gap: 8px; }
.ct-meta i { color: var(--yellow); font-size: 12px; }
.ct-meta a { color: rgba(255,255,255,0.75); transition: color 0.2s; }
.ct-meta a:hover { color: var(--yellow); }

.ct-btns { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }

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

.btn-light { background: var(--yellow); color: var(--black); }
.btn-light:hover { background: #fff; }

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
  border-radius: 50%;
  font-size: 18px;
  color: rgba(255,255,255,0.72);
  transition: color 0.2s, background 0.2s, transform 0.2s;
}

.social-item:hover {
  color: var(--yellow);
  background: rgba(255, 214, 0, 0.12);
  transform: translateY(-1px);
}

@media (max-width: 767px) {
  .ct-plane { display: none; }
  .ct-big { letter-spacing: -2px; }
}
</style>
