<script setup lang="ts">
import type { ExpItem } from '@/shared/types/resume'
defineProps<{ item: ExpItem }>()
</script>

<template>
  <div class="exp-row">
    <div class="exp-year">
      <div class="exp-date-stack">
        <span>{{ item.period.split(' — ')[0] }}</span>
        <span class="exp-date-sep">—</span>
        <span>{{ item.period.split(' — ')[1] }}</span>
      </div>
    </div>
    <div class="exp-main">
      <div class="exp-role">{{ item.role }}</div>
      <div class="exp-co">{{ item.company }} <span class="tag">{{ item.industry }}</span></div>
      <span class="exp-date-mobile">{{ item.period }}</span>
      <p class="exp-desc">{{ item.description }}</p>
      <div class="tag-row">
        <span v-for="chip in item.chips" :key="chip" class="chip">{{ chip }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exp-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
}

.exp-row:last-child { border-bottom: none; }

.exp-row:hover {
  background: var(--yellow-tint);
  margin: 0 calc(-1 * var(--section-px));
  padding: 32px var(--section-px);
  padding-left: calc(var(--section-px) - 3px);
  border-bottom-color: transparent;
  border-left: 3px solid var(--yellow);
  border-radius: 8px;
}

.exp-year {
  padding-top: 4px;
}

.exp-date-stack {
  display: flex;
  flex-direction: column;
  gap: 1px;
  font-size: 11px;
  color: var(--gray2);
  letter-spacing: 0.5px;
  line-height: 1.8;
  white-space: nowrap;
}

.exp-date-sep {
  color: var(--gray2);
  line-height: 1.2;
}

.exp-role {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 4px;
}

.exp-co {
  font-size: 13px;
  color: var(--gray);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.exp-desc {
  font-size: 13px;
  color: #444;
  line-height: 1.75;
  margin-bottom: 16px;
  max-width: 560px;
}

.tag-row { display: flex; flex-wrap: wrap; gap: 6px; }

.exp-date-mobile { display: none; }

@media (max-width: 767px) {
  .exp-row { grid-template-columns: 1fr; gap: 0; }
  .exp-row:hover { padding-top: 24px; padding-bottom: 24px; }
  .exp-year { display: none; }
  .exp-date-mobile {
    display: block;
    font-size: 11px;
    color: var(--gray2);
    letter-spacing: 0.5px;
    line-height: 1.6;
    margin-bottom: 12px;
  }
  .exp-co { margin-bottom: 4px; }
}
</style>
