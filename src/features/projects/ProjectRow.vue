<script setup lang="ts">
import type { ProjectItem } from '@/shared/types/resume'
defineProps<{ item: ProjectItem }>()
</script>

<template>
  <component
    :is="item.url ? 'a' : 'div'"
    :href="item.url"
    :target="item.url ? '_blank' : undefined"
    :rel="item.url ? 'noopener noreferrer' : undefined"
    class="wk-line"
    :class="{ featured: item.featured }"
  >
    <span class="wk-idx">{{ item.idx }}</span>
    <div class="wk-body">
      <div class="wk-title">{{ item.title }}</div>
      <div class="wk-meta">{{ item.meta }}</div>
    </div>
    <span class="wk-arr"><i class="fa-solid fa-arrow-right"></i></span>
  </component>
</template>

<style scoped>
.wk-line {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 28px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  color: inherit;
}

.wk-line:last-child { border-bottom: none; }

.wk-line.featured {
  background: var(--yellow-tint);
  margin: 0 calc(-1 * var(--section-px));
  padding: 28px var(--section-px);
  border-radius: 8px;
  border-bottom-color: transparent;
}

.wk-line:not(.featured):hover {
  background: var(--yellow-tint);
  margin: 0 calc(-1 * var(--section-px));
  padding: 28px var(--section-px);
  border-radius: 8px;
  border-bottom-color: transparent;
}

.wk-idx {
  font-size: 13px;
  font-weight: 900;
  color: var(--border);
  min-width: 24px;
}

.wk-body { flex: 1; }

.wk-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
}

.wk-meta {
  font-size: 12px;
  color: var(--gray2);
}

.wk-arr {
  font-size: 18px;
  color: var(--border);
  transition: color 0.2s, transform 0.2s;
}

.wk-line:hover .wk-arr,
.wk-line.featured .wk-arr {
  color: var(--yellow);
  transform: translateX(4px);
}

@media (max-width: 767px) {
  .wk-title { font-size: 17px; }
}
</style>
