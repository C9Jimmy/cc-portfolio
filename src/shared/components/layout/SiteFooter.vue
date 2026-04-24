<script setup lang="ts">
import { profile } from '@/shared/data/resume'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span class="footer-copy">© 2026 {{ profile.nameEn }}</span>
      <span class="footer-copy">Built with Vue 3 + Vite</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  background: var(--black);
  color: var(--gray2);
  padding: 28px var(--section-px);
  overflow-x: clip;
}

/* decorative white wave inside dark footer — same as v2 footerWaveSway */
.site-footer::before {
  content: '';
  position: absolute;
  top: -112px;
  bottom: 0;
  left: -50%;
  width: 200%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 178' preserveAspectRatio='none'%3E%3Cpath fill='%23ffffff' d='M0,88 C64,152 192,24 320,88 C448,152 576,24 720,88 C864,152 992,24 1120,88 C1248,152 1376,24 1440,88 L1440,178 L0,178 Z'/%3E%3C/svg%3E");
  background-size: 50% 100%;
  background-repeat: repeat-x;
  animation: footerWaveSway 14s ease-in-out infinite alternate-reverse;
  pointer-events: none;
  z-index: 0;
}

@keyframes footerWaveSway {
  from { transform: translateX(0); }
  to   { transform: translateX(10%); }
}

.footer-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 11px;
  letter-spacing: 1px;
}

@media (max-width: 767px) {
  .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
