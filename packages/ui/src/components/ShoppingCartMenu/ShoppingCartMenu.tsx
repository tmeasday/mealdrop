import styled from 'styled-components'

import { CartItem } from '../../app-state/cart'
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

const Breakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`

const Row = styled.div<{ $emphasized?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ $emphasized }) => ($emphasized ? 600 : 'inherit')};
`

const FeeNote = styled(Body)`
  opacity: 0.7;
  margin-bottom: 16px;
`

type FooterProps = {
  onClick?: () => void
  subtotal: number
  fees: number
  totalPrice: number
}

const Footer = ({ onClick, subtotal, fees, totalPrice }: FooterProps) => (
  <FooterContainer>
    <Breakdown>
      <Row>
        <Body type="span">Subtotal</Body>
        <Body type="span">{toCurrency(subtotal)}</Body>
      </Row>
      <Row>
        <Body type="span">Fees</Body>
        <Body type="span">{toCurrency(fees)}</Body>
      </Row>
      <Row $emphasized>
        <Body type="span" fontWeight="medium">
          Total
        </Body>
        <Body type="span" fontWeight="medium">
          {toCurrency(totalPrice)}
        </Body>
      </Row>
    </Breakdown>
    <FeeNote type="span">Fees cover delivery and keeping our riders on the road.</FeeNote>
    <Button disabled={totalPrice === 0} large onClick={onClick}>
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
  subtotal: number
  fees: number
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
  subtotal,
  fees,
  totalPrice,
  onItemChange,
  onGoToCheckoutClick,
}: ShoppingCartMenuProps) => (
  <Sidebar
    title="Your order"
    onClose={onClose}
    isOpen={isOpen}
    footer={
      <Footer
        onClick={onGoToCheckoutClick}
        subtotal={subtotal}
        fees={fees}
        totalPrice={totalPrice}
      />
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
