import { createContext } from 'react'

interface CndlTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const CndlMarketData = createContext<CndlTokenMarketDataValues>({})

export default CndlMarketData
