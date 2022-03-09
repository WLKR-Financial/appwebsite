import React, { useEffect, useState } from 'react'

import { WalkerToken } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './WalkerTokenMarketDataContext'

const WalkerMarketDataProvider: React.FC = ({ children }) => {
  const [walkerMarketData, setWalkerMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(WalkerToken.coingeckoId)
      .then((response: any) => {
        setWalkerMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...walkerMarketData,
        latestMarketCap: selectLatestMarketData(walkerMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(walkerMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(walkerMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default WalkerMarketDataProvider
