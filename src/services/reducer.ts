import { combineSlices } from '@reduxjs/toolkit'
import { burgerConstructorSlice } from '@/services/burger-constructor/reducer'

export const rootReducer = combineSlices(burgerConstructorSlice)
