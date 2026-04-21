export const SERVICE_FEE_RATE = 0.05
export const DELIVERY_FEE = 2.5

export const FEES_COPY = 'Fees help cover delivery and service — no surprises at checkout.'

export type CartBreakdown = {
  subtotal: number
  serviceFee: number
  deliveryFee: number
  total: number
}

export const computeBreakdown = (subtotal: number): CartBreakdown => {
  const serviceFee = subtotal * SERVICE_FEE_RATE
  const deliveryFee = subtotal === 0 ? 0 : DELIVERY_FEE
  return {
    subtotal,
    serviceFee,
    deliveryFee,
    total: subtotal + serviceFee + deliveryFee,
  }
}
