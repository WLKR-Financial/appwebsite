import { createContext } from 'react'

interface WlkrTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const WlkrMarketData = createContext<WlkrTokenMarketDataValues>({})

export default WlkrMarketData
