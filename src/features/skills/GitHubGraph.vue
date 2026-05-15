<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { profile } from '@/shared/data/resume'
import ContribSvg from './ContribSvg.vue'
import type { ContribResponse, Contribution } from './github.types'

const GITHUB_USER = profile.social.find(s => s.platform === 'github')?.url.split('/').pop() ?? ''

const data    = ref<ContribResponse | null>(null)
const loading = ref(true)
const failed  = ref(false)

onMounted(async () => {
  try {
    const localUrl = `${import.meta.env.BASE_URL}data/github-contributions.json`
    let r = await fetch(localUrl, { cache: 'no-cache' })
    if (!r.ok) {
      r = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
    }
    if (!r.ok) throw new Error('api error')
    data.value = await r.json() as ContribResponse
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
})

function chunkByWeek(days: Contribution[]) {
  const weeks: Contribution[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

const allWeeks    = computed(() => data.value ? chunkByWeek(data.value.contributions) : [])
const mobileWeeks = computed(() => allWeeks.value.slice(-20))
const total       = computed(() => data.value?.total['lastYear'] ?? 0)
</script>

<template>
  <div class="gh-graph">
    <div class="gh-meta">
      <span class="gh-total" v-if="!loading && !failed">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        {{ total.toLocaleString() }} contributions in the last year
      </span>
      <a
        :href="`https://github.com/${GITHUB_USER}`"
        target="_blank"
        rel="noopener noreferrer"
        class="gh-link"
      >@{{ GITHUB_USER }}</a>
    </div>

    <div v-if="loading" class="gh-skeleton" role="status" aria-label="Loading GitHub contributions" />
    <div v-else-if="failed" class="gh-error">
      <i class="fa-brands fa-github" aria-hidden="true"></i> 無法載入貢獻圖
    </div>

    <template v-else>
      <div class="gh-wrap graph-desktop">
        <ContribSvg :weeks="allWeeks" />
      </div>
      <div class="gh-wrap graph-mobile">
        <ContribSvg :weeks="mobileWeeks" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.gh-graph { margin-bottom: 60px; }

.gh-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.gh-total {
  font-size: 12px;
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 6px;
}

.gh-link {
  font-size: 11px;
  color: var(--gray2);
  letter-spacing: 0.3px;
  transition: color 0.2s;
}
.gh-link:hover { color: var(--black); }

.gh-wrap { overflow-x: auto; }

.gh-skeleton {
  width: 100%;
  height: 118px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--cream) 25%, var(--border) 50%, var(--cream) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.gh-error {
  font-size: 12px;
  color: var(--gray2);
  padding: 20px 0;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

.graph-mobile { display: none; }

@media (max-width: 767px) {
  .graph-desktop { display: none; }
  .graph-mobile  { display: block; }
  .gh-graph { margin-bottom: 40px; }
}
</style>
