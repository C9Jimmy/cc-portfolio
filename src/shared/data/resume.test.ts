import { describe, expect, it } from 'vitest'
import { projectCards } from './resume'

describe('projectCards', () => {
  it('ViewKit 排在第一張，連到 cc-portfolio 底下的子路徑', () => {
    const [first] = projectCards
    expect(first.name).toBe('ViewKit')
    expect(first.url).toBe('https://c9jimmy.github.io/cc-portfolio/viewkit/')
  })
})
