<script setup lang="ts">
import { ref } from 'vue'
const base = import.meta.env.BASE_URL
const dotEl = ref<HTMLImageElement | null>(null)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (!dotEl.value) return
  dotEl.value.classList.remove('bounce')
  void dotEl.value.offsetWidth
  dotEl.value.classList.add('bounce')
}
</script>

<template>
  <nav class="nav">
    <span class="nav-logo" @click="scrollToTop" role="button" tabindex="0">
      <img ref="dotEl" :src="`${base}images/cc-icon-y.svg`" class="nav-logo-dot" alt="" aria-hidden="true" />
      CHRIS CHENG
    </span>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  padding: 0 60px;
  background: transparent;
  z-index: 100;
}

@media (max-width: 767px) {
  .nav { padding: 0 24px; }
}

.nav-logo {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  color: var(--nav-color);
  transition: color 0.4s;
}

.nav-logo-dot {
  width: 12px;
  height: 12px;
  display: block;
  flex-shrink: 0;
  transition: transform 0.15s cubic-bezier(0.25, 1, 0.5, 1);
}

.nav-logo:active .nav-logo-dot {
  transform: scale(1.4);
}

.nav-logo-dot.bounce {
  animation: dotBounce 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes dotBounce {
  0%   { transform: scale(1); }
  35%  { transform: scale(1.5); }
  65%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

</style>
