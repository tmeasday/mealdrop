import { getCurrency } from './getCurrency'

export const toCurrency = (number: number) => {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: getCurrency(),
  })
}

export const isMobile = () => /Mobi/i.test(globalThis.navigator.userAgent)

export const SERVICE_FEE_RATE = 0.1

type PricedItem = { price: number; quantity: number }

export const calculateOrderBreakdown = (items: PricedItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100
  const total = subtotal + serviceFee
  return { subtotal, serviceFee, total }
}
