import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useRevealOnScroll(targetEl: Ref<HTMLElement | null>, threshold = 0.2) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!targetEl.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.unobserve(entry.target)
        }
      },
      { threshold }
    )
    observer.observe(targetEl.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { isVisible }
}

