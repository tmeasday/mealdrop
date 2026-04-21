const DELIVERY_FEE = 2.99
const SERVICE_FEE_RATE = 0.1

export type OrderFees = {
  subtotal: number
  deliveryFee: number
  serviceFee: number
  total: number
}

export const calculateFees = (subtotal: number): OrderFees => {
  if (subtotal <= 0) {
    return { subtotal: 0, deliveryFee: 0, serviceFee: 0, total: 0 }
  }

  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100
  return {
    subtotal,
    deliveryFee: DELIVERY_FEE,
    serviceFee,
    total: subtotal + DELIVERY_FEE + serviceFee,
  }
}
