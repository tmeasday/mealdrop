import { getCurrency } from './getCurrency'

export const toCurrency = (number: number) => {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: getCurrency(),
  })
}

export const isMobile = () => /Mobi/i.test(globalThis.navigator.userAgent)

export const DELIVERY_FEE = 2.99
export const SERVICE_FEE_RATE = 0.1

export type PricingBreakdown = {
  subtotal: number
  fees: number
  total: number
}

type PriceableItem = { price: number; quantity: number }

export const calculateSubtotal = (items: PriceableItem[]) =>
  items.reduce((acc, item) => acc + item.quantity * item.price, 0)

export const calculateFees = (subtotal: number) =>
  subtotal > 0 ? DELIVERY_FEE + subtotal * SERVICE_FEE_RATE : 0

export const calculatePricing = (items: PriceableItem[]): PricingBreakdown => {
  const subtotal = calculateSubtotal(items)
  const fees = calculateFees(subtotal)
  return { subtotal, fees, total: subtotal + fees }
}
