import { combineSlices } from '@reduxjs/toolkit'
import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'
import { ingredientsSlice } from '@/services/ingredients/reducer'

export const rootReducer = combineSlices(burgerConstructorSlice, ingredientsSlice)
