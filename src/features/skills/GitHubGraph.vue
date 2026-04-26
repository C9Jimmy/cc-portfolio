<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContribResponse {
  total: Record<string, number>
  contributions: Contribution[]
}

const GITHUB_USER = 'C9Jimmy'
const CELL = 11
const GAP  = 3
const STEP = CELL + GAP   // 14px per cell
const TOP  = 20            // space for month labels

// Level 0-4 mapped to cream → yellow
const COLORS = ['#ddd8cf', '#f5c51838', '#f5c51870', '#f5c518b0', '#f5c518'] as const

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const data    = ref<ContribResponse | null>(null)
const loading = ref(true)
const failed  = ref(false)

onMounted(async () => {
  try {
    const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
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
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
}

const allWeeks     = computed(() => data.value ? chunkByWeek(data.value.contributions) : [])
const desktopWeeks = computed(() => allWeeks.value)
const mobileWeeks  = computed(() => allWeeks.value.slice(-20))

const total = computed(() => data.value?.total['lastYear'] ?? 0)
const svgH     = 7 * STEP + TOP

function svgW(weeks: Contribution[][]) { return weeks.length * STEP }

function monthLabels(weeks: Contribution[][]) {
  const labels: { text: string; x: number }[] = []
  let prev = ''
  weeks.forEach((week, i) => {
    const m = week[0]?.date.slice(5, 7) ?? ''
    if (m && m !== prev) {
      labels.push({ text: MONTH_NAMES[parseInt(m) - 1], x: i * STEP })
      prev = m
    }
  })
  return labels
}

function color(level: 0 | 1 | 2 | 3 | 4) { return COLORS[level] }

function tip(c: Contribution) {
  return `${c.date}：${c.count} contribution${c.count !== 1 ? 's' : ''}`
}
</script>

<template>
  <div class="gh-graph">
    <div class="gh-meta">
      <span class="gh-total" v-if="!loading && !failed">
        <i class="fa-brands fa-github"></i>
        {{ total.toLocaleString() }} contributions in the last year
      </span>
      <a
        :href="`https://github.com/${GITHUB_USER}`"
        target="_blank"
        rel="noopener noreferrer"
        class="gh-link"
      >@{{ GITHUB_USER }}</a>
    </div>

    <div v-if="loading" class="gh-skeleton" />
    <div v-else-if="failed" class="gh-error">
      <i class="fa-brands fa-github"></i> 無法載入貢獻圖
    </div>

    <template v-else>
      <!-- Desktop: full 52 weeks -->
      <div class="gh-wrap graph-desktop">
        <svg
          class="gh-svg"
          :width="svgW(desktopWeeks)"
          :height="svgH"
          :viewBox="`0 0 ${svgW(desktopWeeks)} ${svgH}`"
        >
          <text
            v-for="m in monthLabels(desktopWeeks)"
            :key="m.x"
            :x="m.x" y="12"
            class="gh-month"
          >{{ m.text }}</text>
          <g v-for="(week, wi) in desktopWeeks" :key="wi">
            <rect
              v-for="day in week"
              :key="day.date"
              :x="wi * STEP"
              :y="TOP + week.indexOf(day) * STEP"
              :width="CELL" :height="CELL"
              rx="2"
              :fill="color(day.level)"
            ><title>{{ tip(day) }}</title></rect>
          </g>
        </svg>
      </div>

      <!-- Mobile: last 20 weeks -->
      <div class="gh-wrap graph-mobile">
        <svg
          class="gh-svg"
          :width="svgW(mobileWeeks)"
          :height="svgH"
          :viewBox="`0 0 ${svgW(mobileWeeks)} ${svgH}`"
        >
          <text
            v-for="m in monthLabels(mobileWeeks)"
            :key="m.x"
            :x="m.x" y="12"
            class="gh-month"
          >{{ m.text }}</text>
          <g v-for="(week, wi) in mobileWeeks" :key="wi">
            <rect
              v-for="day in week"
              :key="day.date"
              :x="wi * STEP"
              :y="TOP + week.indexOf(day) * STEP"
              :width="CELL" :height="CELL"
              rx="2"
              :fill="color(day.level)"
            ><title>{{ tip(day) }}</title></rect>
          </g>
        </svg>
      </div>
    </template>
  </div>
</template>

<style scoped>
.gh-graph { margin-bottom: 40px; }

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
.gh-svg  { display: block; }

.gh-month {
  font-size: 9px;
  fill: var(--gray2);
  font-family: var(--font-sans);
}

.gh-skeleton {
  width: 100%;
  height: 118px;
  border-radius: 4px;
  background: linear-gradient(90deg, #e8e3d9 25%, #ddd8cf 50%, #e8e3d9 75%);
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
}
</style>
