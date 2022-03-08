import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import styled from 'styled-components'

import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { WLKRInnovation, ProductToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useWlkrTokenMarketData from 'hooks/useWlkrTokenMarketData'
import useLocalStorage from 'hooks/useLocalStorage'
import useSetComponents from 'hooks/useSetComponents'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'

const WlkrProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const { prices, hourlyPrices, latestPrice, latestMarketCap, latestVolume } =
    useWlkrTokenMarketData()
  const { chainId } = useWallet()
  const { wlkrBalance, wlkrBalancePolygon } = useBalances()
  const { wlkrStreamingFee } = useStreamingFee()
  const { wlkrTotalSupply } = useTokenSupply()
  const { wlkrComponents: components } = useSetComponents()

  const token: ProductToken = {
    ...WLKRInnovation,
    fees: wlkrStreamingFee ? { streamingFee: wlkrStreamingFee } : undefined,
  }

  const getTokenBalance = () => {
    if (chainId) {
      if (chainId === MAINNET_CHAIN_DATA.chainId) return wlkrBalance
      else if (chainId === POLYGON_CHAIN_DATA.chainId) return wlkrBalancePolygon
    }
    return new BigNumber(0)
  }

  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: getTokenBalance(),
    currentSupply: wlkrTotalSupply,
  }

  const [, setReferral] = useLocalStorage('referral', '')

  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const value = params.get('referral')
  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  return <ProductDataUI tokenDataProps={tokenDataProps} />
}

const StyledWlkrIndexCalculationImage = styled.img`
  margin-bottom: 20px;
  width: 100%;
`

export default WlkrProductPage
