import { useContext } from 'react'

import { CndlTokenMarketDataContext } from 'contexts/CndlTokenMarketData'

const useIndexTokenMarketData = () => {
  return { ...useContext(CndlTokenMarketDataContext) }
}

export default useCndlTokenMarketData
