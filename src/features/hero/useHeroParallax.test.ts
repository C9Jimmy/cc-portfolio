import { describe, it, expect } from 'vitest'
import { ref, createApp } from 'vue'
import { FLOATER_DEPTHS, useHeroParallax } from './useHeroParallax'

function withSetup<T>(composable: () => T): [T, () => void] {
  let result!: T
  const app = createApp({
    setup() { result = composable(); return () => {} },
    render: () => null,
  })
  const root = document.createElement('div')
  app.mount(root)
  return [result, () => app.unmount()]
}

describe('FLOATER_DEPTHS', () => {
  it('has exactly 12 entries matching the 12 hero floaters', () => {
    expect(FLOATER_DEPTHS).toHaveLength(12)
  })

  it('all depth values are positive numbers between 0 and 1', () => {
    FLOATER_DEPTHS.forEach(d => {
      expect(d).toBeGreaterThan(0)
      expect(d).toBeLessThan(1)
    })
  })
})

describe('useHeroParallax', () => {
  it('initialises transforms as 12 translate(0,0) strings', () => {
    const el = ref<HTMLElement | null>(null)
    const [{ transforms }, unmount] = withSetup(() => useHeroParallax(el))
    expect(transforms.value).toHaveLength(12)
    transforms.value.forEach(t => expect(t).toBe('translate(0,0)'))
    unmount()
  })

  it('calculates correct translate strings for each floater depth', () => {
    // Verify formula: translate(mx * depth px, my * depth px)
    const mx = 50
    const my = -30
    const result = FLOATER_DEPTHS.map(d => `translate(${mx * d}px, ${my * d}px)`)
    expect(result[0]).toBe(`translate(${50 * 0.038}px, ${-30 * 0.038}px)`)
    expect(result).toHaveLength(12)
  })

  it('resets all transforms to translate(0,0) on mouseleave', () => {
    const div = document.createElement('div')
    div.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {},
    })
    const el = ref<HTMLElement | null>(div)
    const [{ transforms }, unmount] = withSetup(() => useHeroParallax(el))

    div.dispatchEvent(new MouseEvent('mouseleave'))
    transforms.value.forEach(t => expect(t).toBe('translate(0,0)'))
    unmount()
  })

  it('does nothing on mousemove when containerEl becomes null after mount', () => {
    const div = document.createElement('div')
    div.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {},
    })
    const el = ref<HTMLElement | null>(div)
    const [{ transforms }, unmount] = withSetup(() => useHeroParallax(el))
    const before = [...transforms.value]

    // Nullify the ref after mount — listener is still on div but guard fires
    el.value = null
    div.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 100, bubbles: true }))

    expect(transforms.value).toEqual(before)
    unmount()
  })

  it('updates transforms on mousemove using container-relative coordinates', () => {
    const div = document.createElement('div')
    div.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {},
    })
    const el = ref<HTMLElement | null>(div)
    const [{ transforms }, unmount] = withSetup(() => useHeroParallax(el))

    // clientX=150, clientY=100 → mx=50, my=0
    div.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 100, bubbles: true }))

    // depth[0] = 0.038 → translate(1.9px, 0px)
    expect(transforms.value[0]).toBe(`translate(${50 * 0.038}px, ${0 * 0.038}px)`)
    unmount()
  })
})
