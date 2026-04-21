import styled, { css } from 'styled-components'

import { CartItem } from '../../app-state/cart'
import { CartPricing, FEES_EXPLANATION, calculateCartPricing, toCurrency } from '../../helpers'
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

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const FeesExplanation = styled(Body)(
  ({ theme: { color, typography } }) => css`
    font-size: ${typography.fontSize.bodyXS};
    color: ${color.cartButtonText};
    margin-bottom: 16px;
  `
)

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

type FooterProps = {
  onClick?: () => void
  pricing: CartPricing
  hasItems: boolean
}

const Footer = ({ onClick, pricing, hasItems }: FooterProps) => (
  <FooterContainer>
    {hasItems && (
      <>
        <BreakdownRow>
          <Body type="span">Subtotal</Body>
          <Body type="span">{toCurrency(pricing.subtotal)}</Body>
        </BreakdownRow>
        <BreakdownRow>
          <Body type="span">Fees</Body>
          <Body type="span">{toCurrency(pricing.fees)}</Body>
        </BreakdownRow>
        <FeesExplanation type="span">{FEES_EXPLANATION}</FeesExplanation>
      </>
    )}
    <TotalSection>
      <Body type="span" fontWeight="medium">
        Total
      </Body>
      <Body type="span" fontWeight="medium">
        {toCurrency(pricing.total)}
      </Body>
    </TotalSection>
    <Button disabled={!hasItems} large onClick={onClick}>
      Checkout
    </Button>
  </FooterContainer>
)

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
  onClose: () => void
  cartItems: CartItem[]
  onGoToCheckoutClick?: () => void
  onItemChange: (item: any) => void
}

export const ShoppingCartMenu = ({
  isOpen,
  onClose,
  cartItems,
  onItemChange,
  onGoToCheckoutClick,
}: ShoppingCartMenuProps) => {
  const pricing = calculateCartPricing(cartItems)
  return (
    <Sidebar
      title="Your order"
      onClose={onClose}
      isOpen={isOpen}
      footer={
        <Footer onClick={onGoToCheckoutClick} pricing={pricing} hasItems={cartItems.length > 0} />
      }
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
