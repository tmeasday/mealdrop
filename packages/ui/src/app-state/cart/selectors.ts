import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { CartItem } from './cart'
import { computeBreakdown } from './fees'

const selectCart = (state: RootState) => state.cart

export const selectCartVisibility = createSelector([selectCart], (cart) => cart.visible)

export const selectCartItems = createSelector([selectCart], (cart) => cart.items)

export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
  items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
)

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((acc: number, item: CartItem) => acc + item.quantity * item.price, 0)
)

export const selectCartBreakdown = createSelector([selectCartSubtotal], (subtotal) =>
  computeBreakdown(subtotal)
)

export const selectCartTotal = createSelector([selectCartBreakdown], (breakdown) => breakdown.total)
