import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../../stub/cart-items'

import { OrderSummary } from './OrderSummary'

const meta = {
  title: 'Components/OrderSummary',
  component: OrderSummary,
} satisfies Meta<typeof OrderSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cartItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Subtotal')).toBeInTheDocument()
    await expect(canvas.getByText('Fees')).toBeInTheDocument()
    await expect(canvas.getByText('Total')).toBeInTheDocument()
    await expect(canvas.getByText(/fees cover/i)).toBeInTheDocument()
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your cart is empty/i)).toBeInTheDocument()
    await expect(canvas.queryByText('Subtotal')).not.toBeInTheDocument()
    await expect(canvas.queryByText('Fees')).not.toBeInTheDocument()
    await expect(canvas.getByText('Total')).toBeInTheDocument()
  },
}
