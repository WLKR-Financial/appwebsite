import React from 'react'

import { Spacer, Surface } from 'react-neu'

import styled from 'styled-components'

const Explanation: React.FC = () => (
  <div data-cy='explanation'>
    <StyledExplanationTitle>What is Walker Financial?</StyledExplanationTitle>
    <StyledExplanationContainer>
      <StyledCardContainer>
        <Surface>
          <StyledCardContent>
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_1.svg' />
            <StyledCardTitle>Diversified Risk Products</StyledCardTitle>
            <StyledCardDescription>
              Walker is a registered investment advisor (RIA), and creates and maintains the world's best crypto index
              products, along with traditional crypto portfolio management.
            </StyledCardDescription>
            <StyledCardDescription>
              All walker products are always fully collateralized.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>

      <Spacer />

      <StyledCardContainer>
        <Surface>
          <StyledCardContent>
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_2.svg' />
            <StyledCardTitle>Decentralized & Autonomous</StyledCardTitle>
            <StyledCardDescription>
            The Token Walker (WLKRR) is a Decentralized and Autonomous Asset Manager
              governed, maintained, and upgraded by WLKRR token holders.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>

      <Spacer />

      <StyledCardContainer>
        <Surface>
          <StyledCardContent>
            <StyledCardIcon src='https://index-dao.s3.amazonaws.com/about_icon_3.svg' />
            <StyledCardTitle>Built with DeFi Leaders</StyledCardTitle>
            <StyledCardDescription>
              Our products are built on Set Protocol's battle-tested V2
              infrastructure.
            </StyledCardDescription>
            <StyledCardDescription>
              Product methodologies are sourced from industry experts like WLKR
              Innovation.
            </StyledCardDescription>
          </StyledCardContent>
        </Surface>
      </StyledCardContainer>
    </StyledExplanationContainer>
  </div>
)

const StyledExplanationContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledExplanationTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledCardContainer = styled.div`
  flex: 1;
`

const StyledCardContent = styled.div`
  padding: 30px;
`

const StyledCardTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
`
const StyledCardIcon = styled.img`
  margin-bottom: 20px;
  width: 50px;
`

const StyledCardDescription = styled.p`
  font-size: 24px;
`

export default Explanation
