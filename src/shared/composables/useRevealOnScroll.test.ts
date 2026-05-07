import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'

let mockCallback: (entries: Array<{ isIntersecting: boolean }>) => void
const mockStop = vi.fn()

vi.mock('@vueuse/core', () => ({
  useIntersectionObserver: vi.fn((_target, callback) => {
    mockCallback = callback
    return { stop: mockStop }
  }),
}))

import { useRevealOnScroll } from './useRevealOnScroll'

describe('useRevealOnScroll', () => {
  beforeEach(() => {
    mockStop.mockClear()
  })

  it('isVisible starts as false', () => {
    const el = ref<HTMLElement | null>(null)
    const { isVisible } = useRevealOnScroll(el)
    expect(isVisible.value).toBe(false)
  })

  it('isVisible becomes true when element intersects', () => {
    const el = ref<HTMLElement | null>(null)
    const { isVisible } = useRevealOnScroll(el)
    mockCallback([{ isIntersecting: true }])
    expect(isVisible.value).toBe(true)
  })

  it('isVisible stays false when isIntersecting is false', () => {
    const el = ref<HTMLElement | null>(null)
    const { isVisible } = useRevealOnScroll(el)
    mockCallback([{ isIntersecting: false }])
    expect(isVisible.value).toBe(false)
  })

  it('stops observing after first intersection', () => {
    const el = ref<HTMLElement | null>(null)
    useRevealOnScroll(el)
    mockCallback([{ isIntersecting: true }])
    expect(mockStop).toHaveBeenCalledOnce()
  })

  it('does not stop if not intersecting', () => {
    const el = ref<HTMLElement | null>(null)
    useRevealOnScroll(el)
    mockCallback([{ isIntersecting: false }])
    expect(mockStop).not.toHaveBeenCalled()
  })

  it('once visible, stays visible even after re-trigger', () => {
    const el = ref<HTMLElement | null>(null)
    const { isVisible } = useRevealOnScroll(el)
    mockCallback([{ isIntersecting: true }])
    mockCallback([{ isIntersecting: false }])
    expect(isVisible.value).toBe(true)
  })
})
