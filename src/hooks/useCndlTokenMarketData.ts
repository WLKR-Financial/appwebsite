import { useContext } from 'react'

import { CndlTokenMarketDataContext } from 'contexts/CndlTokenMarketData'

const useCndlTokenMarketData = () => {
  return { ...useContext(CndlTokenMarketDataContext) }
}

export default useCndlTokenMarketData
