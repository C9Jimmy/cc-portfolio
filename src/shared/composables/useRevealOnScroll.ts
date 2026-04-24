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

export function useScrollSpy(sectionIds: string[]) {
  const activeId = ref(sectionIds[0] ?? '')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) activeId.value = e.target.id
        })
      },
      { threshold: 0.35 }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer?.observe(el)
    })
  })

  onUnmounted(() => observer?.disconnect())

  return { activeId }
}
