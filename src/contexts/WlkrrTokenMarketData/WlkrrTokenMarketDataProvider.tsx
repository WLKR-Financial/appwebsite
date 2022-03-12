import React, { useEffect, useState } from 'react'

import { WalkerToken } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './WlkrrTokenMarketDataContext'

const WlkrrMarketDataProvider: React.FC = ({ children }) => {
  const [wlkrrMarketData, setWlkrrMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(WalkerToken.coingeckoId)
      .then((response: any) => {
        setWlkrrMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...wlkrrMarketData,
        latestMarketCap: selectLatestMarketData(wlkrrMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(wlkrrMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(wlkrrMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default WlkrrMarketDataProvider
