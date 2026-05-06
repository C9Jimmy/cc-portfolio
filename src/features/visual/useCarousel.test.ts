import { describe, it, expect } from 'vitest'
import { useCarousel } from './useCarousel'

describe('useCarousel', () => {
  describe('positionFor', () => {
    it('returns pos-center for the active index', () => {
      const { positionFor } = useCarousel(5)
      expect(positionFor(0)).toBe('pos-center')
    })

    it('returns pos-right1 for index one step ahead', () => {
      const { positionFor } = useCarousel(5)
      expect(positionFor(1)).toBe('pos-right1')
    })

    it('returns pos-left1 for index one step behind', () => {
      const { positionFor } = useCarousel(5)
      expect(positionFor(4)).toBe('pos-left1')
    })

    it('returns pos-right2 for index two steps ahead', () => {
      const { positionFor } = useCarousel(5)
      expect(positionFor(2)).toBe('pos-right2')
    })

    it('returns pos-left2 for index two steps behind', () => {
      const { positionFor } = useCarousel(5)
      expect(positionFor(3)).toBe('pos-left2')
    })

    it('returns pos-hidden for far-away indices', () => {
      const { positionFor } = useCarousel(10)
      expect(positionFor(5)).toBe('pos-hidden')
      expect(positionFor(6)).toBe('pos-hidden')
    })

    it('wraps correctly at the end of the list', () => {
      const { positionFor, next } = useCarousel(5)
      next() // center = 1
      expect(positionFor(0)).toBe('pos-left1')
      expect(positionFor(2)).toBe('pos-right1')
    })
  })

  describe('next / prev', () => {
    it('next() advances center by 1', () => {
      const { positionFor, next } = useCarousel(5)
      next()
      expect(positionFor(1)).toBe('pos-center')
    })

    it('prev() moves center back by 1', () => {
      const { positionFor, prev } = useCarousel(5)
      prev()
      expect(positionFor(4)).toBe('pos-center')
    })

    it('next() wraps around at the end', () => {
      const { positionFor, next } = useCarousel(3)
      next(); next(); next()
      expect(positionFor(0)).toBe('pos-center')
    })

    it('prev() wraps around at the start', () => {
      const { positionFor, prev } = useCarousel(3)
      prev()
      expect(positionFor(2)).toBe('pos-center')
    })

    it('next() resets flipped card', () => {
      const { flippedIdx, clickCard, next } = useCarousel(5)
      clickCard(0) // flip center
      expect(flippedIdx.value).toBe(0)
      next()
      expect(flippedIdx.value).toBeNull()
    })

    it('prev() resets flipped card', () => {
      const { flippedIdx, clickCard, prev } = useCarousel(5)
      clickCard(0)
      prev()
      expect(flippedIdx.value).toBeNull()
    })
  })

  describe('clickCard', () => {
    it('flips the center card on click', () => {
      const { flippedIdx, clickCard } = useCarousel(5)
      clickCard(0)
      expect(flippedIdx.value).toBe(0)
    })

    it('unflips a flipped center card on second click', () => {
      const { flippedIdx, clickCard } = useCarousel(5)
      clickCard(0)
      clickCard(0)
      expect(flippedIdx.value).toBeNull()
    })

    it('navigates to a non-center card instead of flipping', () => {
      const { flippedIdx, positionFor, clickCard } = useCarousel(5)
      clickCard(1) // right1 card
      expect(positionFor(1)).toBe('pos-center')
      expect(flippedIdx.value).toBeNull()
    })
  })

  describe('wrap-around positioning', () => {
    it('wraps negative offset forward when center is near end of list', () => {
      const { positionFor, next } = useCarousel(4)
      next(); next(); next() // center = 3
      // item 0: offset = 0-3 = -3, which < -(4/2)=-2 → offset += 4 → 1 → pos-right1
      expect(positionFor(0)).toBe('pos-right1')
    })
  })

  describe('edge cases', () => {
    it('handles total of 1 without crashing', () => {
      const { positionFor } = useCarousel(1)
      expect(positionFor(0)).toBe('pos-center')
    })

    it('clamps total to 1 when 0 is passed', () => {
      const { positionFor } = useCarousel(0)
      expect(positionFor(0)).toBe('pos-center')
    })
  })
})
