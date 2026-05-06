<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// Must stay in sync with each section's id="" attribute in App.vue
const SECTIONS = ['hero', 'about', 'exp', 'skills', 'projects', 'contact']
const activeIdx = ref(0)

const isOnDark = computed(() => activeIdx.value === SECTIONS.length - 1)
const isOnHero = computed(() => activeIdx.value === 0)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

let obs: IntersectionObserver

onMounted(() => {
  obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = SECTIONS.indexOf(entry.target.id)
          if (idx !== -1) activeIdx.value = idx
        }
      })
    },
    { threshold: 0.5 }
  )
  SECTIONS.forEach(id => {
    const el = document.getElementById(id)
    if (el) obs.observe(el)
  })
})

onUnmounted(() => obs?.disconnect())

watch(isOnDark, dark => {
  document.documentElement.classList.toggle('nav-on-dark', dark)
}, { immediate: true })
</script>

<template>
  <nav v-show="!isOnHero" class="page-prog" :class="{ 'on-dark': isOnDark }" aria-label="頁面導覽">
    <button
      v-for="(id, i) in SECTIONS"
      :key="id"
      class="prog-dot"
      :class="{ active: i === activeIdx }"
      @click="scrollTo(id)"
      :aria-label="`前往第 ${i + 1} 區塊`"
    />
  </nav>
</template>

<style scoped>
.page-prog {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 50;
}

.prog-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid var(--black);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: background 0.25s, border-color 0.25s, transform 0.25s;
}

.prog-dot.active {
  background: var(--black);
  transform: scale(1.3);
}

/* Contact 區塊是深色背景，改為黃色點 */
.on-dark .prog-dot {
  border-color: rgba(255, 255, 255, 0.3);
}

.on-dark .prog-dot.active {
  background: var(--yellow);
  border-color: var(--yellow);
}

@media (max-width: 767px) {
  .page-prog { display: none; }
}
</style>
