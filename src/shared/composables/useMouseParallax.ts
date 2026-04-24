import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseParallax(containerRef: ReturnType<typeof ref<HTMLElement | null>>) {
  const mx = ref(0)
  const my = ref(0)

  function onMove(e: MouseEvent) {
    const el = containerRef.value
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.value = e.clientX - r.left - r.width / 2
    my.value = e.clientY - r.top  - r.height / 2
  }

  function onLeave() {
    mx.value = 0
    my.value = 0
  }

  onMounted(() => {
    containerRef.value?.addEventListener('mousemove', onMove)
    containerRef.value?.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    containerRef.value?.removeEventListener('mousemove', onMove)
    containerRef.value?.removeEventListener('mouseleave', onLeave)
  })

  return { mx, my }
}
