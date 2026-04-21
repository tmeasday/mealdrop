import styled, { css } from 'styled-components'

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

export const TotalRow = styled(BreakdownRow)`
  margin-top: 0.25rem;
`

export const FeeExplanation = styled.p(
  ({ theme: { typography } }) => css`
    margin: 0.25rem 0 0.75rem;
    font-size: ${typography.fontSize.bodyXS};
    opacity: 0.75;
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
