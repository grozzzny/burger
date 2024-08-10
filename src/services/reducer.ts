import { combineSlices } from '@reduxjs/toolkit'
import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'
import { orderSlice } from '@/services/order/reducer'
import { selectedIngredientSlice } from '@/services/selected-ingredient/reducer'

export const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice, orderSlice, selectedIngredientSlice)
