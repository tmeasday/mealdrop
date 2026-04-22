import { createSelector } from '@reduxjs/toolkit'

import { calculateFees, calculateSubtotal } from '../../helpers'
import { RootState } from '../store'

const selectOrder = (state: RootState) => state.order

export const selectOrderItems = createSelector([selectOrder], (order) => order.items)

export const selectOrderSubtotal = createSelector([selectOrderItems], (items) =>
  calculateSubtotal(items)
)

export const selectOrderFees = createSelector([selectOrderSubtotal], (subtotal) =>
  calculateFees(subtotal)
)

export const selectOrderTotal = createSelector(
  [selectOrderSubtotal, selectOrderFees],
  (subtotal, fees) => subtotal + fees
)
