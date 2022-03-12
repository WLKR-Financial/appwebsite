import React, { useEffect } from 'react'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { CandleToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useCndlTokenMarketData from 'hooks/useCndlTokenMarketData'

const CndlProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useCndlTokenMarketData()
  const { cndlBalance } = useBalances()
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: CandleToken,
    components: undefined,
    balance: cndlBalance,
  }

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

export default CndlProductPage
