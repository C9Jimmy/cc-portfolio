<script setup lang="ts">
import { computed } from 'vue'
import type { Contribution } from './github.types'

const CELL = 11
const GAP  = 3
const STEP = CELL + GAP
const TOP  = 20
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
// SVG fill can't use CSS vars; #f5c518 = --yellow
const COLORS = ['#ddd8cf', '#f5c51838', '#f5c51870', '#f5c518b0', '#f5c518'] as const

const props = defineProps<{ weeks: Contribution[][] }>()

const svgH   = 7 * STEP + TOP
const svgW   = computed(() => props.weeks.length * STEP)
const labels = computed(() => {
  const result: { text: string; x: number }[] = []
  let prev = ''
  props.weeks.forEach((week, i) => {
    const m = week[0]?.date.slice(5, 7) ?? ''
    if (m && m !== prev) {
      result.push({ text: MONTH_NAMES[parseInt(m) - 1], x: i * STEP })
      prev = m
    }
  })
  return result
})

function color(level: 0 | 1 | 2 | 3 | 4) { return COLORS[level] }
function tip(c: Contribution) {
  return `${c.date}：${c.count} contribution${c.count !== 1 ? 's' : ''}`
}
</script>

<template>
  <svg
    class="gh-svg"
    width="100%"
    :height="svgH"
    :viewBox="`0 0 ${svgW} ${svgH}`"
    preserveAspectRatio="xMinYMin meet"
  >
    <text
      v-for="m in labels"
      :key="m.x"
      :x="m.x" y="12"
      class="gh-month"
    >{{ m.text }}</text>
    <g v-for="(week, wi) in weeks" :key="week[0]?.date ?? wi">
      <rect
        v-for="(day, di) in week"
        :key="day.date"
        :x="wi * STEP"
        :y="TOP + di * STEP"
        :width="CELL" :height="CELL"
        rx="2"
        :fill="color(day.level)"
      ><title>{{ tip(day) }}</title></rect>
    </g>
  </svg>
</template>

<style scoped>
.gh-svg { display: block; height: auto; }

.gh-month {
  font-size: 9px;
  fill: var(--gray2);
  font-family: var(--font-sans);
}

.gh-svg rect {
  transition: filter 0.12s, opacity 0.12s;
  cursor: default;
}

.gh-svg rect:hover {
  filter: brightness(1.25) saturate(1.2);
  opacity: 0.85;
  cursor: pointer;
}
</style>
