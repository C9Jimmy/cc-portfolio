<script setup lang="ts">
import { ref } from 'vue'
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'
import SkillGroup from './SkillGroup.vue'
import GitHubGraph from './GitHubGraph.vue'
import { useRevealOnScroll } from '@/shared/composables/useRevealOnScroll'
import { skillGroups } from '@/shared/data/resume'

const sectionEl = ref<HTMLElement | null>(null)
const { isVisible } = useRevealOnScroll(sectionEl, 0.3)
</script>

<template>
  <section ref="sectionEl" class="section" id="skills">
    <GhostNumber number="05" />
    <div class="col">
      <SectionTitle text="Skills" />
      <GitHubGraph />
      <div class="skills-grid" :class="{ vis: isVisible }">
        <SkillGroup v-for="group in skillGroups" :key="group.label" :group="group" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: var(--cream);
  overflow-x: clip;
}

/* top wave: white → cream (same pattern as About) */
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
  animation: skillsWaveSway 12s ease-in-out infinite alternate-reverse;
  pointer-events: none;
  z-index: 0;
}

@keyframes skillsWaveSway {
  from { transform: translateX(0); }
  to   { transform: translateX(10%); }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 60px;
}

@media (max-width: 767px) {
  .skills-grid { grid-template-columns: 1fr; gap: 32px; }
}
</style>
