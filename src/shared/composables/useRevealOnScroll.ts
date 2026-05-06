import { ref } from 'vue'
import type { Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useRevealOnScroll(targetEl: Ref<HTMLElement | null>, threshold = 0.2) {
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    targetEl,
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold }
  )

  return { isVisible }
}
