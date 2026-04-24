<script setup lang="ts">
import type { SkillGroup } from '@/shared/types/resume'
defineProps<{ group: SkillGroup }>()
</script>

<template>
  <div class="sg">
    <div class="sg-label">{{ group.label }}</div>
    <div class="chips">
      <span
        v-for="chip in group.chips"
        :key="chip.name"
        class="chip"
        :class="{ hi: chip.highlight }"
      >{{ chip.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.sg { display: flex; flex-direction: column; gap: 12px; }

.sg-label {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gray2);
  font-weight: 600;
}

.chips { display: flex; flex-wrap: wrap; gap: 6px; }
</style>
