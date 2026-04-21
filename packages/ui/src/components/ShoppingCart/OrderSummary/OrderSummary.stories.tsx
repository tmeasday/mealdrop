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
    await expect(canvas.getByText('Delivery fee')).toBeInTheDocument()
    await expect(canvas.getByText('Service fee')).toBeInTheDocument()
    await expect(canvas.getByText('Total')).toBeInTheDocument()
    await expect(
      canvas.getByText(/Fees help cover delivery and keep the app running\./i)
    ).toBeInTheDocument()
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your cart is empty.')).toBeInTheDocument()
    await expect(canvas.queryByText('Subtotal')).not.toBeInTheDocument()
    await expect(canvas.queryByText('Delivery fee')).not.toBeInTheDocument()
  },
}
