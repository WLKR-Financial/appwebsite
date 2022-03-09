import { createContext } from 'react'

interface WlkrrTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const WlkrrMarketData = createContext<WlkrrTokenMarketDataValues>({})

export default WlkrrMarketData
