import styled from 'styled-components'

import { CartItem } from '../../app-state/cart'
import { calculateOrderBreakdown, toCurrency } from '../../helpers'
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
  gap: 0.25rem;
  margin-bottom: 16px;
`

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const TotalRow = styled(BreakdownRow)`
  margin-top: 0.25rem;
  font-weight: 600;
`

const FeeExplanation = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  opacity: 0.75;
`

const Footer = ({ onClick, cartItems }: { onClick?: () => void; cartItems: CartItem[] }) => {
  const { subtotal, serviceFee, total } = calculateOrderBreakdown(cartItems)
  return (
    <FooterContainer>
      <BreakdownSection>
        <BreakdownRow>
          <Body type="span">Subtotal</Body>
          <Body type="span">{toCurrency(subtotal)}</Body>
        </BreakdownRow>
        <BreakdownRow>
          <Body type="span">Service fee</Body>
          <Body type="span">{toCurrency(serviceFee)}</Body>
        </BreakdownRow>
        <FeeExplanation>
          The service fee helps cover payment processing and keeping your order on track.
        </FeeExplanation>
        <TotalRow>
          <Body type="span">Total</Body>
          <Body type="span">{toCurrency(total)}</Body>
        </TotalRow>
      </BreakdownSection>
      <Button disabled={total === 0} large onClick={onClick}>
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
}: ShoppingCartMenuProps) => (
  <Sidebar
    title="Your order"
    onClose={onClose}
    isOpen={isOpen}
    footer={<Footer onClick={onGoToCheckoutClick} cartItems={cartItems} />}
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
