import { ref } from 'vue'

export function useCarousel(total: number) {
  const centerIdx = ref(0)
  const flippedIdx = ref<number | null>(null)
  const itemCount = Math.max(total, 1)

  function positionFor(i: number): string {
    let offset = i - centerIdx.value
    if (offset > itemCount / 2) offset -= itemCount
    if (offset < -itemCount / 2) offset += itemCount
    if (offset === 0)  return 'pos-center'
    if (offset === 1)  return 'pos-right1'
    if (offset === 2)  return 'pos-right2'
    if (offset === -1) return 'pos-left1'
    if (offset === -2) return 'pos-left2'
    return 'pos-hidden'
  }

  function next() { centerIdx.value = (centerIdx.value + 1) % itemCount; flippedIdx.value = null }
  function prev() { centerIdx.value = (centerIdx.value - 1 + itemCount) % itemCount; flippedIdx.value = null }
  // internal: navigate to index, reset flip state
  function goTo(idx: number) { centerIdx.value = ((idx % itemCount) + itemCount) % itemCount; flippedIdx.value = null }

  function clickCard(idx: number) {
    const pos = positionFor(idx)
    if (pos === 'pos-center') {
      flippedIdx.value = flippedIdx.value === idx ? null : idx
    } else {
      goTo(idx)
    }
  }

  return { flippedIdx, positionFor, next, prev, clickCard }
}
