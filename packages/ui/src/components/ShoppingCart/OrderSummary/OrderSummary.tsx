import { useMemo } from 'react'

import { ShoppingCartItem } from '../ShoppingCartItem/ShoppingCartItem'
import { CartItem } from '../../../app-state/cart'
import { Body } from '../../typography/Body'
import { calculateFees, toCurrency } from '../../../helpers'

import {
  OrderSummaryContainer,
  BottomContainer,
  BreakdownRow,
  BreakdownNote,
  CartItemsContainer,
  StyledHeading,
  TotalRow,
} from './OrderSummary.styles'

type OrderSummaryProps = {
  cartItems: CartItem[]
}

export const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const fees = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    return calculateFees(subtotal)
  }, [cartItems])

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
                <Body type="span">{toCurrency(fees.subtotal)}</Body>
              </BreakdownRow>
              <BreakdownRow>
                <Body type="span">Delivery fee</Body>
                <Body type="span">{toCurrency(fees.deliveryFee)}</Body>
              </BreakdownRow>
              <BreakdownRow>
                <Body type="span">Service fee</Body>
                <Body type="span">{toCurrency(fees.serviceFee)}</Body>
              </BreakdownRow>
              <BreakdownNote>Fees help cover delivery and keep the app running.</BreakdownNote>
            </>
          )}
          <TotalRow>
            <Body>Total</Body>
            <StyledHeading level={2}>{toCurrency(fees.total)}</StyledHeading>
          </TotalRow>
        </BottomContainer>
      </OrderSummaryContainer>
    </>
  )
}
