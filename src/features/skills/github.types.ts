export interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContribResponse {
  updatedAt?: string
  source?: 'github-graphql' | string
  user?: string
  hasAnyRestrictedContributions?: boolean
  total: Record<string, number>
  contributions: Contribution[]
}
