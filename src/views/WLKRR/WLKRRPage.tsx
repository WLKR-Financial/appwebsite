import React, { useEffect } from 'react'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { WalkerToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useWlkrrTokenMarketData from 'hooks/useWlkrrTokenMarketData'

const DpiProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useWlkrrTokenMarketData()
  const { wlkrrBalance } = useBalances()
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: WalkerToken,
    components: undefined,
    balance: wlkrrBalance,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default DpiProductPage
