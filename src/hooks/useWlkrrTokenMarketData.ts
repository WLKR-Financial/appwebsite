import { useContext } from 'react'

import { WlkrrTokenMarketDataContext } from 'contexts/WlkrrTokenMarketData'

const useWlkrrTokenMarketData = () => {
  return { ...useContext(WlkrrTokenMarketDataContext) }
}

export default useWlkrrTokenMarketData
