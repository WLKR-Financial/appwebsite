import { useContext } from 'react'

import { WlkrTokenMarketDataContext } from 'contexts/WlkrTokenMarketData'

const useWlkrTokenMarketData = () => {
  return { ...useContext(WlkrTokenMarketDataContext) }
}

export default useWlkrTokenMarketData
