<script setup lang="ts">
import { profile } from '@/shared/data/resume'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span class="footer-copy">Copyleft © [what-year-is-this] {{ profile.nameEn }}</span>
      <span class="footer-role">
        <span class="status-dot"></span>
        <span class="role-primary">Frontend Engineer</span>
        <span class="role-sep">·</span>
        <span class="role-secondary">UI/UX Designer</span>
      </span>
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

/* Desktop / tablet: Primary · ● · Secondary */
.footer-role {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  order: 2;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.role-primary  { order: 1; }
.role-sep      { order: 3; display: none; }
.role-secondary { order: 4; }

/* Mobile: grid layout
   ● Frontend Engineer
   · UI/UX Designer     */
@media (max-width: 767px) {
  .footer-inner { flex-direction: column; align-items: flex-start; gap: 12px; }

  .footer-role {
    display: grid;
    grid-template-areas:
      "dot primary"
      "sep secondary";
    grid-template-columns: auto 1fr;
    gap: 3px 6px;
    align-items: center;
  }

  .status-dot  { grid-area: dot;       order: unset; }
  .role-primary { grid-area: primary;  order: unset; }
  .role-sep    { grid-area: sep;       order: unset; display: block; color: rgba(255,255,255,0.3); }
  .role-secondary { grid-area: secondary; order: unset; }
}
</style>
