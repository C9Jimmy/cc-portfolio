export interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContribResponse {
  total: Record<string, number>
  contributions: Contribution[]
}
