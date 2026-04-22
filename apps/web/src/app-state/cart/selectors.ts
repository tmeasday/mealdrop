import { createSelector } from '@reduxjs/toolkit'

import { calculateFees, calculateSubtotal } from '../../helpers'
import { RootState } from '../store'

const selectCart = (state: RootState) => state.cart

export const selectCartVisibility = createSelector([selectCart], (cart) => cart.visible)

export const selectCartItems = createSelector([selectCart], (cart) => cart.items)

export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
  items.reduce((acc, item) => acc + item.quantity, 0)
)

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  calculateSubtotal(items)
)

export const selectCartFees = createSelector([selectCartSubtotal], (subtotal) =>
  calculateFees(subtotal)
)

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectCartFees],
  (subtotal, fees) => subtotal + fees
)
