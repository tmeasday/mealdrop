import styled, { css } from 'styled-components'

import { CartItem } from '../../app-state/cart'
import { CartBreakdown, computeBreakdown, FEES_COPY } from '../../app-state/cart/fees'
import { toCurrency } from '../../helpers'
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

const BreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-top: 0.5rem;
`

const BreakdownRow = styled.div<{ $emphasized?: boolean }>(
  ({ $emphasized, theme: { typography } }) => css`
    display: flex;
    justify-content: space-between;
    line-height: 1.2;
    ${$emphasized &&
    css`
      font-weight: ${typography.fontWeight.bold};
      padding-top: 1rem;
      border-top: 1px solid #f5f6f7;
    `}
  `
)

const FeesCopy = styled(Body)(
  ({ theme: { typography } }) => css`
    font-size: ${typography.fontSize.bodyXS};
    opacity: 0.7;
    line-height: 1.35;
    margin: 0;
  `
)

type FooterProps = {
  onClick?: () => void
  breakdown: CartBreakdown
}

const Footer = ({ onClick, breakdown }: FooterProps) => {
  const fees = breakdown.serviceFee + breakdown.deliveryFee
  return (
    <FooterContainer>
      <BreakdownContainer>
        <BreakdownRow>
          <Body type="span">Subtotal</Body>
          <Body type="span">{toCurrency(breakdown.subtotal)}</Body>
        </BreakdownRow>
        <BreakdownRow>
          <Body type="span">Fees</Body>
          <Body type="span">{toCurrency(fees)}</Body>
        </BreakdownRow>
        <FeesCopy type="span">{FEES_COPY}</FeesCopy>
        <BreakdownRow $emphasized>
          <Body type="span" fontWeight="bold">
            Total
          </Body>
          <Body type="span" fontWeight="bold">
            {toCurrency(breakdown.total)}
          </Body>
        </BreakdownRow>
      </BreakdownContainer>
      <Button disabled={breakdown.total === 0} large onClick={onClick}>
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
  breakdown?: CartBreakdown
  onClose: () => void
  cartItems: CartItem[]
  onGoToCheckoutClick?: () => void
  onItemChange: (item: any) => void
}

export const ShoppingCartMenu = ({
  isOpen,
  onClose,
  cartItems,
  breakdown,
  onItemChange,
  onGoToCheckoutClick,
}: ShoppingCartMenuProps) => {
  const effectiveBreakdown =
    breakdown ??
    computeBreakdown(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0))
  return (
    <Sidebar
      title="Your order"
      onClose={onClose}
      isOpen={isOpen}
      footer={<Footer onClick={onGoToCheckoutClick} breakdown={effectiveBreakdown} />}
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
}
