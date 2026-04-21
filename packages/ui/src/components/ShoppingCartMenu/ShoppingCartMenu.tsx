import styled, { css } from 'styled-components'

import { CartItem } from '../../app-state/cart'
import { calculateFees, toCurrency } from '../../helpers'
import { Button } from '../Button'
import { Select } from '../forms/Select'
import { Sidebar } from '../Sidebar'
import { Body } from '../typography'

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`

const BreakdownSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
`

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const BreakdownNote = styled.p(
  ({ theme: { color, typography } }) => css`
    margin: 0.25rem 0 0;
    font-size: ${typography.fontSize.bodyXS};
    color: ${color.secondaryText};
  `
)

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f5f6f7;
`

const Footer = ({ onClick, totalPrice }: any) => {
  const fees = calculateFees(totalPrice)
  const hasItems = totalPrice > 0
  return (
    <FooterContainer>
      {hasItems && (
        <BreakdownSection>
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
        </BreakdownSection>
      )}
      <TotalSection>
        <Body type="span">Total</Body>
        <Body type="span">{toCurrency(fees.total)}</Body>
      </TotalSection>
      <Button disabled={!hasItems} large onClick={onClick}>
        Checkout
      </Button>
    </FooterContainer>
  )
}

const MenuItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  > div:first-of-type {
    padding-right: 1rem;
    flex: 0.75;
  }

  > div:last-of-type {
    flex: 0.25;
  }
`

const ShoppingCartMenuItem = ({ item, onChange }: any) => (
  <MenuItemContainer>
    <div>
      <Body type="span" fontWeight="medium">
        {item.name}
      </Body>
      <Body>{item.description}</Body>
      <Body>{toCurrency(item.price * item.quantity)}</Body>
    </div>
    <Select
      value={item.quantity}
      onChange={onChange}
      aria-label={`${item.quantity} times`}
      options={[...Array.from({ length: 11 }).keys()]}
    />
  </MenuItemContainer>
)

type ShoppingCartMenuProps = {
  isOpen: boolean
  totalPrice: number
  onClose: () => void
  cartItems: CartItem[]
  onGoToCheckoutClick?: () => void
  onItemChange: (item: any) => void
}

export const ShoppingCartMenu = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  onItemChange,
  onGoToCheckoutClick,
}: ShoppingCartMenuProps) => (
  <Sidebar
    title="Your order"
    onClose={onClose}
    isOpen={isOpen}
    footer={<Footer onClick={onGoToCheckoutClick} totalPrice={totalPrice} />}
  >
    <div style={{ display: 'grid', gap: '15px' }}>
      {cartItems.map((item) => (
        <ShoppingCartMenuItem
          key={item.id}
          item={item}
          onChange={(quantity: number) => onItemChange({ ...item, quantity })}
        />
      ))}
    </div>
  </Sidebar>
)
