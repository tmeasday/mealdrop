import styled, { css } from 'styled-components'

import { Body } from '../../typography/Body'
import { Heading } from '../../typography/Heading'

export const StyledHeading = styled(Heading)<{ $withMargin?: boolean }>(
  ({
    $withMargin = false,
    theme: {
      typography: { fontSize },
    },
  }) => css`
    font-size: ${fontSize.heading4};
    margin-bottom: ${$withMargin ? '1.5rem' : 0};
  `
)

export const OrderSummaryContainer = styled.div<{ fixed?: boolean }>(
  ({ theme: { color, borderRadius } }) => css`
    width: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: ${color.orderSummaryBackground};
    border-radius: ${borderRadius.s};
  `
)

export const BottomContainer = styled.div`
  margin-top: auto;
  border-top: 1px solid #f5f6f7;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const BreakdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
`

export const FeesExplanation = styled(Body)(
  ({ theme: { color, typography } }) => css`
    font-size: ${typography.fontSize.bodyXS};
    color: ${color.cartButtonText};
    padding-bottom: 0.5rem;
  `
)

export const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
