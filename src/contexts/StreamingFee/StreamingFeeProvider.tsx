import React, { useEffect, useState } from 'react'

import {
  bedTokenAddress,
  btc2xfliTokenAddress,
  dpiTokenAddress,
  dpiTokenPolygonAddress,
  wlkrTokenAddress,
  wlkrTokenPolygonAddress,
  eth2xflipTokenAddress,
  eth2xfliTokenAddress,
  gmiTokenAddress,
  gmiTokenPolygonAddress,
  iethflipTokenAddress,
  imaticflipTokenAddress,
  matic2xflipTokenAddress,
  mviTokenAddress,
  mviTokenPolygonAddress,
} from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'
import { convertToPercentage } from 'utils/ethersBigNumber'
import { getStreamingFees } from 'utils/setjsApi'

import StreamingFeeContext from './StreamingFeeContext'

const StreamingFeeProvider: React.FC = ({ children }) => {
  const [dpiStreamingFee, setDpiStreamingFee] = useState<string>()
  const [wlkrStreamingFee, setWlkrStreamingFee] = useState<string>()
  const [mviStreamingFee, setMviStreamingFee] = useState<string>()
  const [bedStreamingFee, setBedStreamingFee] = useState<string>()
  const [gmiStreamingFee, setGmiStreamingFee] = useState<string>()
  const [eth2xFliStreamingFee, setEth2xFliStreamingFee] = useState<string>()
  const [btc2xFliStreamingFee, setBtc2xFliStreamingFee] = useState<string>()
  const [imaticFlipStreamingFee, setImaticFlipStreamingFee] = useState<string>()
  const [matic2xFlipStreamingFee, setMatic2xFlipStreamingFee] =
    useState<string>()
  const [iethFliStreamingFee, setiEthFliStreamingFee] = useState<string>()

  const { ethereum: provider, chainId } = useWallet()

  useEffect(() => {
    if (
      chainId &&
      chainId === MAINNET_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenAddress &&
      wlkrTokenAddress &&
      mviTokenAddress &&
      bedTokenAddress &&
      gmiTokenAddress &&
      eth2xfliTokenAddress &&
      btc2xfliTokenAddress
    ) {
      getStreamingFees(
        provider,
        [
          dpiTokenAddress,
          wlkrTokenAddress,
          mviTokenAddress,
          bedTokenAddress,
          gmiTokenAddress,
          eth2xfliTokenAddress,
          btc2xfliTokenAddress,
        ],
        chainId
      )
        .then((result) => {
          const [
            dpiResult,
            wlkrResult,
            mviResult,
            bedResult,
            gmiResult,
            eth2xFliResult,
            btc2xFliResult,
          ] = result
          setDpiStreamingFee(
            convertToPercentage(dpiResult.streamingFeePercentage)
          )
          setWlkrStreamingFee(
            convertToPercentage(wlkrResult.streamingFeePercentage)
          )
          setMviStreamingFee(
            convertToPercentage(mviResult.streamingFeePercentage)
          )
          setBedStreamingFee(
            convertToPercentage(bedResult.streamingFeePercentage)
          )
          setGmiStreamingFee(
            convertToPercentage(gmiResult.streamingFeePercentage)
          )
          setEth2xFliStreamingFee(
            convertToPercentage(eth2xFliResult.streamingFeePercentage)
          )
          setBtc2xFliStreamingFee(
            convertToPercentage(btc2xFliResult.streamingFeePercentage)
          )
        })
        .catch((error: any) => console.error(error))
    } else if (
      chainId &&
      chainId === POLYGON_CHAIN_DATA.chainId &&
      provider &&
      dpiTokenPolygonAddress &&
      wlkrTokenPolygonAddress &&
      mviTokenPolygonAddress &&
      eth2xflipTokenAddress &&
      matic2xflipTokenAddress &&
      imaticflipTokenAddress &&
      iethflipTokenAddress
    ) {
      getStreamingFees(
        provider,
        [
          dpiTokenPolygonAddress,
          wlkrTokenPolygonAddress,
          mviTokenPolygonAddress,
          eth2xflipTokenAddress,
          matic2xflipTokenAddress,
          imaticflipTokenAddress,
          iethflipTokenAddress,
        ],
        chainId
      )
        .then((result) => {
          const [
            dpiResult,
            wlkrResult,
            mviResult,
            eth2xFlipResult,
            matic2xFlipResult,
            imaticFlipResult,
            iethFlipResult,
          ] = result
          setDpiStreamingFee(
            convertToPercentage(dpiResult.streamingFeePercentage)
          )
          setWlkrStreamingFee(
            convertToPercentage(wlkrResult.streamingFeePercentage)
          )
          setMviStreamingFee(
            convertToPercentage(mviResult.streamingFeePercentage)
          )
          setEth2xFliStreamingFee(
            convertToPercentage(eth2xFlipResult.streamingFeePercentage)
          )
          setMatic2xFlipStreamingFee(
            convertToPercentage(matic2xFlipResult.streamingFeePercentage)
          )
          setImaticFlipStreamingFee(
            convertToPercentage(imaticFlipResult.streamingFeePercentage)
          )
          setiEthFliStreamingFee(
            convertToPercentage(iethFlipResult.streamingFeePercentage)
          )
          setBedStreamingFee(undefined)
          setGmiStreamingFee(undefined)
          setEth2xFliStreamingFee(undefined)
          setBtc2xFliStreamingFee(undefined)
        })
        .catch((error: any) => console.error(error))
    }
  }, [chainId, provider])

  return (
    <StreamingFeeContext.Provider
      value={{
        dpiStreamingFee: dpiStreamingFee,
        wlkrStreamingFee: wlkrStreamingFee,
        mviStreamingFee: mviStreamingFee,
        bedStreamingFee: bedStreamingFee,
        gmiStreamingFee: gmiStreamingFee,
        eth2xFliStreamingFee: eth2xFliStreamingFee,
        btc2xFliStreamingFee: btc2xFliStreamingFee,
        imaticFLIPStreamingFee: imaticFlipStreamingFee,
        matic2xFLIPStreamingFee: matic2xFlipStreamingFee,
        iethFLIPStreamingFee: iethFliStreamingFee,
      }}
    >
      {children}
    </StreamingFeeContext.Provider>
  )
}

export default StreamingFeeProvider
