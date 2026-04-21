import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { expect, fn } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { computeBreakdown } from '../../app-state/cart/fees'
import { Button } from '../Button'
import { Body } from '../typography'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
const breakdown = computeBreakdown(subtotal)
const emptyBreakdown = computeBreakdown(0)

const meta = {
  title: 'Components/ShoppingCartMenu',
  component: ShoppingCartMenu,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 600 },
  },
  args: {
    isOpen: true,
    cartItems: cartItems,
    breakdown,
    onClose: fn(),
    onItemChange: fn(),
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    cartItems: [],
    breakdown: emptyBreakdown,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
  },
}

export const WithItems: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Subtotal')).toBeInTheDocument()
    await expect(canvas.getByText('Fees')).toBeInTheDocument()
    await expect(canvas.getByText('Total')).toBeInTheDocument()
    await expect(canvas.getByText(/Fees help cover delivery/)).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}

export const Playground: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const openShoppingCartMenu = () => setIsOpen(true)
    const closeShoppingCartMenu = () => setIsOpen(false)

    useEffect(() => {
      setIsOpen(true)
    }, [])

    return (
      <>
        <Body>Press ESC to close the ShoppingCartMenu or click on the close icon!</Body>
        <Button onClick={openShoppingCartMenu}>Open ShoppingCartMenu</Button>
        <ShoppingCartMenu
          isOpen={isOpen}
          cartItems={cartItems}
          breakdown={breakdown}
          onItemChange={() => {}}
          onClose={() => {
            closeShoppingCartMenu()
          }}
        />
      </>
    )
  },
}
