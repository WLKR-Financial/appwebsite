import React, { useCallback, useMemo, useState } from 'react'

import { Button, Card, CardContent, Spacer } from 'react-neu'

import numeral from 'numeral'
import styled from 'styled-components'

import indexToken from 'assets/index-token.png'
import Split from 'components/Split'
import useBalances from 'hooks/useBalances'
import useFarmingTwo from 'hooks/useFarmingTwo'
import useMediaQuery from 'hooks/useMediaQuery'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'
import { fromWei } from 'utils'

import DpiStakeModal from './components/DpiStakeModal'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)

  const { stakedFarmTwoBalance: stakedBalance, unharvestedFarmTwoBalance } =
    useBalances()
  const { status } = useWallet()
  const {
    isApproved,
    isApproving,
    onApprove,
    onStake,
    onUnstakeAndHarvest,
    onHarvest,
  } = useFarmingTwo()
  const { farmTwoApy } = usePrices()
  const { isMobile } = useMediaQuery()

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleOnStake = useCallback(
    (amount: string) => {
      onStake(amount)
      handleDismissStakeModal()
    },
    [handleDismissStakeModal, onStake]
  )

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Stake' variant='secondary' />
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={onApprove}
          text={!isApproving ? 'Approve staking' : 'Approving staking...'}
          variant={
            isApproving || status !== 'connected' ? 'secondary' : 'default'
          }
        />
      )
    }

    if (isApproved) {
      return <Button full onClick={handleStakeClick} text='Stake' />
    }
  }, [isApproved, isApproving, status, handleStakeClick, onApprove])

  const UnstakeButton = useMemo(() => {
    const hasStaked = stakedBalance && fromWei(stakedBalance).gt(0)
    if (status !== 'connected' || !hasStaked) {
      return <Button disabled full text='Unstake & Claim' variant='secondary' />
    }

    return (
      <Button
        full
        onClick={onUnstakeAndHarvest}
        text='Unstake & Claim'
        variant='secondary'
      />
    )
  }, [stakedBalance, status, onUnstakeAndHarvest])

  const ClaimButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Claim' variant='secondary' />
    }
    return <Button full onClick={onHarvest} text='Claim' />
  }, [status, onHarvest])

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return numeral(stakedBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (unharvestedFarmTwoBalance) {
      return numeral(unharvestedFarmTwoBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [unharvestedFarmTwoBalance])

  return (
    <>
      <Card>
        <div data-cy='dpi-farm-widget'>
          <CardContent>
            <StyledCardTitleWrapper>
              <StyledHeaderIcon
                src='https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg'
                alt='DefiPulse Index Logo'
              />
              <Spacer size='md' />
              <StyledLmTitle>
                <StyledCardTitle>DPI Liquidity Program</StyledCardTitle>
                <Spacer size='sm' />
                <StyledCardSubtitle>
                  Active July 13th, 2021 - August 12th, 2021
                </StyledCardSubtitle>
              </StyledLmTitle>
            </StyledCardTitleWrapper>
            <Spacer />

            <StyledFarmTokensAndApyWrapper>
              <Split>
                <div>
                  <StyledFarmText>
                    {formattedStakedBalance}
                    <StyledTokenIcon
                      alt='eth dpi icon'
                      src='https://index-dao.s3.amazonaws.com/eth-dpi.svg'
                    />
                  </StyledFarmText>
                  <StyledSectionLabel>
                    Staked ETH/DPI Uniswap LP Tokens
                  </StyledSectionLabel>
                </div>

                <div>
                  <StyledFarmText>{farmTwoApy}% APR</StyledFarmText>
                  <StyledSectionLabel>(Volatile)</StyledSectionLabel>
                </div>

                <div>
                  <StyledFarmText>
                    {formattedEarnedBalance}
                    <StyledTokenIcon src={indexToken} alt='Index token' />
                  </StyledFarmText>
                  <StyledSectionLabel>
                    Unclaimed INDEX in pool
                  </StyledSectionLabel>
                </div>
              </Split>
            </StyledFarmTokensAndApyWrapper>
          </CardContent>
          <StyledCardActions isMobile={isMobile}>
            {ClaimButton}
            <Spacer />
            {UnstakeButton}
          </StyledCardActions>
        </div>
      </Card>
      <DpiStakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
      />
    </>
  )
}

const StyledHeaderIcon = styled.img`
  height: 58px;
  width: 58px;
  margin-bottom: 10px;
`

const StyledTokenIcon = styled.img`
  height: 20px;
  margin-left: 10px;
`

const StyledCardTitle = styled.span`
  font-weight: 600;
  font-size: 28px;
`

const StyledCardSubtitle = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 600;
  font-size: 18px;
`

const StyledCardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 600;
  font-size: 24px;
`

const StyledLmTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 24px;
`

const StyledFarmTokensAndApyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledFarmText = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 24px;
`

const StyledSectionLabel = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 16px;
`

interface StyledCardActionProps {
  isMobile: boolean
}

const StyledCardActions = styled.div<StyledCardActionProps>`
  display: flex;
  flex-wrap: ${(props) => (props.isMobile ? 'wrap' : 'no-wrap')};
  padding: 30px;
  padding-top: 0px;
`

export default Stake