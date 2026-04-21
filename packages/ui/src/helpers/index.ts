import { getCurrency } from './getCurrency'

export const toCurrency = (number: number) => {
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: getCurrency(),
  })
}

export const isMobile = () => /Mobi/i.test(globalThis.navigator.userAgent)

const SERVICE_FEE_RATE = 0.1

export const FEES_EXPLANATION = 'Fees cover delivery and service — no surprise charges at checkout.'

export type CartPricing = {
  subtotal: number
  fees: number
  total: number
}

export const calculateCartPricing = (items: { price: number; quantity: number }[]): CartPricing => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const fees = subtotal > 0 ? Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100 : 0
  return { subtotal, fees, total: subtotal + fees }
}
