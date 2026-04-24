import { ref, computed } from 'vue'

const TOTAL = 5

export function useCarousel() {
  const centerIdx = ref(0)
  const flippedIdx = ref<number | null>(null)

  function positionFor(i: number): string {
    let offset = i - centerIdx.value
    if (offset > TOTAL / 2) offset -= TOTAL
    if (offset < -TOTAL / 2) offset += TOTAL
    if (offset === 0)  return 'pos-center'
    if (offset === 1)  return 'pos-right1'
    if (offset === 2)  return 'pos-right2'
    if (offset === -1) return 'pos-left1'
    if (offset === -2) return 'pos-left2'
    return 'pos-hidden'
  }

  function next() { centerIdx.value = (centerIdx.value + 1) % TOTAL; flippedIdx.value = null }
  function prev() { centerIdx.value = (centerIdx.value - 1 + TOTAL) % TOTAL; flippedIdx.value = null }
  function goTo(idx: number) { centerIdx.value = ((idx % TOTAL) + TOTAL) % TOTAL; flippedIdx.value = null }

  function clickCard(idx: number) {
    const pos = positionFor(idx)
    if (pos === 'pos-center') {
      flippedIdx.value = flippedIdx.value === idx ? null : idx
    } else {
      goTo(idx)
    }
  }

  const dots = computed(() =>
    Array.from({ length: TOTAL }, (_, i) => ({ active: i === centerIdx.value, idx: i }))
  )

  return { centerIdx, flippedIdx, positionFor, next, prev, goTo, clickCard, dots }
}
