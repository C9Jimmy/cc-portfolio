<script setup lang="ts">
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'
import SkillGroup from './SkillGroup.vue'
import GitHubGraph from './GitHubGraph.vue'
import { skillGroups } from '@/shared/data/resume'
</script>

<template>
  <section class="section" id="skills">
    <GhostNumber number="04" />
    <div class="col">
      <SectionTitle text="Skills" />
      <GitHubGraph />
      <div class="skills-grid">
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 60px;
}

@media (max-width: 767px) {
  .skills-grid { grid-template-columns: 1fr; gap: 32px; }
}
</style>
