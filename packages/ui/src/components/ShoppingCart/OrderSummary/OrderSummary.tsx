import { useMemo } from 'react'

import { ShoppingCartItem } from '../ShoppingCartItem/ShoppingCartItem'
import { CartItem } from '../../../app-state/cart'
import { Body } from '../../typography/Body'
import { calculatePricing, toCurrency } from '../../../helpers'

import {
  OrderSummaryContainer,
  BottomContainer,
  BreakdownContainer,
  BreakdownRow,
  FeeNote,
  CartItemsContainer,
  StyledHeading,
} from './OrderSummary.styles'

type OrderSummaryProps = {
  cartItems: CartItem[]
}

export const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const { subtotal, fees, total } = useMemo(() => calculatePricing(cartItems), [cartItems])
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
        <BreakdownContainer>
          <BreakdownRow>
            <Body>Subtotal</Body>
            <Body>{toCurrency(subtotal)}</Body>
          </BreakdownRow>
          <BreakdownRow>
            <Body>Fees</Body>
            <Body>{toCurrency(fees)}</Body>
          </BreakdownRow>
          <FeeNote>Fees cover delivery and keeping our riders on the road.</FeeNote>
        </BreakdownContainer>
        <BottomContainer>
          <Body>Total</Body>
          <StyledHeading level={2}>{toCurrency(total)}</StyledHeading>
        </BottomContainer>
      </OrderSummaryContainer>
    </>
  )
}
