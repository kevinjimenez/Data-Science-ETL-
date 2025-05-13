export interface CryptoCurrency {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  image: string
  symbol: string
  currentPrice: number
  high1h: number
  low1h: number
  avg: number
  signal: string
  trend: string
  isCurrent: boolean
  tag: string
}
