import React, { useEffect, useState } from 'react'

import { CandleToken } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './CndlTokenMarketDataContext'

const CndlMarketDataProvider: React.FC = ({ children }) => {
  const [cndlMarketData, setCndlMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(CandleToken.coingeckoId)
      .then((response: any) => {
        setCndlMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...cndlMarketData,
        latestMarketCap: selectLatestMarketData(cndlMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(cndlMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(cndlMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default CndlMarketDataProvider
