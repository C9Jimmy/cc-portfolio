import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export const FLOATER_DEPTHS = [0.038, 0.022, 0.052, 0.018, 0.045, 0.015, 0.028, 0.042, 0.032, 0.019, 0.048, 0.025]

export function useHeroParallax(containerEl: Ref<HTMLElement | null>) {
  const transforms = ref<string[]>(FLOATER_DEPTHS.map(() => 'translate(0,0)'))

  function onMove(e: MouseEvent) {
    const el = containerEl.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - r.left - r.width / 2
    const my = e.clientY - r.top  - r.height / 2
    transforms.value = FLOATER_DEPTHS.map(d => `translate(${mx * d}px, ${my * d}px)`)
  }

  function onLeave() {
    transforms.value = FLOATER_DEPTHS.map(() => 'translate(0,0)')
  }

  onMounted(() => {
    containerEl.value?.addEventListener('mousemove', onMove)
    containerEl.value?.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    containerEl.value?.removeEventListener('mousemove', onMove)
    containerEl.value?.removeEventListener('mouseleave', onLeave)
  })

  return { transforms }
}
