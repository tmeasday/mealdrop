import { useMemo } from 'react'

import { ShoppingCartItem } from '../ShoppingCartItem/ShoppingCartItem'
import { CartItem } from '../../../app-state/cart'
import { Body } from '../../typography/Body'
import { calculateCartPricing, FEES_EXPLANATION, toCurrency } from '../../../helpers'

import {
  OrderSummaryContainer,
  BottomContainer,
  BreakdownRow,
  CartItemsContainer,
  FeesExplanation,
  StyledHeading,
  TotalRow,
} from './OrderSummary.styles'

type OrderSummaryProps = {
  cartItems: CartItem[]
}

export const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const { subtotal, fees, total } = useMemo(() => calculateCartPricing(cartItems), [cartItems])
  const hasItems = cartItems.length > 0
  return (
    <>
      <OrderSummaryContainer>
        <StyledHeading level={3} $withMargin>
          Your order
        </StyledHeading>
        <CartItemsContainer>
          {hasItems ? (
            cartItems.map((item) => <ShoppingCartItem key={item.id} item={item} />)
          ) : (
            <Body>Your cart is empty.</Body>
          )}
        </CartItemsContainer>
        <BottomContainer>
          {hasItems && (
            <>
              <BreakdownRow>
                <Body type="span">Subtotal</Body>
                <Body type="span">{toCurrency(subtotal)}</Body>
              </BreakdownRow>
              <BreakdownRow>
                <Body type="span">Fees</Body>
                <Body type="span">{toCurrency(fees)}</Body>
              </BreakdownRow>
              <FeesExplanation type="span">{FEES_EXPLANATION}</FeesExplanation>
            </>
          )}
          <TotalRow>
            <Body>Total</Body>
            <StyledHeading level={2}>{toCurrency(total)}</StyledHeading>
          </TotalRow>
        </BottomContainer>
      </OrderSummaryContainer>
    </>
  )
}
