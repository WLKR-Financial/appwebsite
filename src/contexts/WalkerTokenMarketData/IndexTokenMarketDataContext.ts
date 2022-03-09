import { createContext } from 'react'

interface WalkerTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const WalkerMarketData = createContext<WalkerTokenMarketDataValues>({})

export default WalkerMarketData
