import { useMemo } from 'react'

import { ShoppingCartItem } from '../ShoppingCartItem/ShoppingCartItem'
import { CartItem } from '../../../app-state/cart'
import { Body } from '../../typography/Body'
import { calculateOrderBreakdown, toCurrency } from '../../../helpers'

import {
  OrderSummaryContainer,
  BottomContainer,
  BreakdownRow,
  CartItemsContainer,
  FeeExplanation,
  StyledHeading,
  TotalRow,
} from './OrderSummary.styles'

type OrderSummaryProps = {
  cartItems: CartItem[]
}

export const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const { subtotal, serviceFee, total } = useMemo(
    () => calculateOrderBreakdown(cartItems),
    [cartItems]
  )
  return (
    <>
      <OrderSummaryContainer>
        <StyledHeading level={3} $withMargin>
          Your order
        </StyledHeading>
        <CartItemsContainer>
          {cartItems.length > 0 ? (
            cartItems.map((item) => <ShoppingCartItem key={item.id} item={item} />)
          ) : (
            <Body>Your cart is empty.</Body>
          )}
        </CartItemsContainer>
        <BottomContainer>
          <BreakdownRow>
            <Body>Subtotal</Body>
            <Body>{toCurrency(subtotal)}</Body>
          </BreakdownRow>
          <BreakdownRow>
            <Body>Service fee</Body>
            <Body>{toCurrency(serviceFee)}</Body>
          </BreakdownRow>
          <FeeExplanation>
            The service fee helps cover payment processing and keeping your order on track.
          </FeeExplanation>
          <TotalRow>
            <Body>Total</Body>
            <StyledHeading level={2}>{toCurrency(total)}</StyledHeading>
          </TotalRow>
        </BottomContainer>
      </OrderSummaryContainer>
    </>
  )
}
