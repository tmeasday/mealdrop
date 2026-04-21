import { createSelector } from '@reduxjs/toolkit'

import { calculateCartPricing } from '../../helpers'
import { RootState } from '../store'
import { CartItem } from './cart'

const selectCart = (state: RootState) => state.cart

export const selectCartVisibility = createSelector([selectCart], (cart) => cart.visible)

export const selectCartItems = createSelector([selectCart], (cart) => cart.items)

export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
  items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
)

export const selectCartPricing = createSelector([selectCartItems], (items) =>
  calculateCartPricing(items)
)

export const selectCartTotal = createSelector([selectCartPricing], (pricing) => pricing.total)
