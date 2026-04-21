import { useMemo } from 'react'

import { ShoppingCartItem } from '../ShoppingCartItem/ShoppingCartItem'
import { CartItem } from '../../../app-state/cart'
import { CartBreakdown, computeBreakdown, FEES_COPY } from '../../../app-state/cart/fees'
import { Body } from '../../typography/Body'
import { toCurrency } from '../../../helpers'

import {
  OrderSummaryContainer,
  BottomContainer,
  BreakdownRow,
  FeesCopy,
  CartItemsContainer,
  StyledHeading,
} from './OrderSummary.styles'

type OrderSummaryProps = {
  cartItems: CartItem[]
  breakdown?: CartBreakdown
}

export const OrderSummary = ({ cartItems, breakdown }: OrderSummaryProps) => {
  const effectiveBreakdown = useMemo(() => {
    if (breakdown) return breakdown
    const subtotal = cartItems
      .map((item) => item.quantity * item.price)
      .reduce((acc, next) => acc + next, 0)
    return computeBreakdown(subtotal)
  }, [breakdown, cartItems])
  const fees = effectiveBreakdown.serviceFee + effectiveBreakdown.deliveryFee
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
        <FeesCopy>{FEES_COPY}</FeesCopy>
        <BottomContainer>
          <BreakdownRow>
            <Body type="span">Subtotal</Body>
            <Body type="span">{toCurrency(effectiveBreakdown.subtotal)}</Body>
          </BreakdownRow>
          <BreakdownRow>
            <Body type="span">Fees</Body>
            <Body type="span">{toCurrency(fees)}</Body>
          </BreakdownRow>
          <BreakdownRow>
            <Body>Total</Body>
            <StyledHeading level={2}>{toCurrency(effectiveBreakdown.total)}</StyledHeading>
          </BreakdownRow>
        </BottomContainer>
      </OrderSummaryContainer>
    </>
  )
}
