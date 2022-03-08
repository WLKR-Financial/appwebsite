import React, { useEffect, useState } from 'react'

import { WLKRInnovation } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './WlkrTokenMarketDataContext'

const WlkrMarketDataProvider: React.FC = ({ children }) => {
  const [wlkrMarketData, setWlkrMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(WLKRInnovation.coingeckoId)
      .then((response: any) => {
        setWlkrMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...wlkrMarketData,
        latestMarketCap: selectLatestMarketData(wlkrMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(wlkrMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(wlkrMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default WlkrMarketDataProvider
