import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ingredient } from '@/types'

interface SelectedIngredientState {
  ingredient: Ingredient | null
}

export const initialState: SelectedIngredientState = {
  ingredient: null
}

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  selectors: {
    getSelectedIngredient: (state) => state.ingredient
  },
  reducers: {
    selectIngredient: (state, {payload}: PayloadAction<Ingredient | null>) => {
      state.ingredient = payload
    }
  }
})

export const { selectIngredient } = selectedIngredientSlice.actions
export const { getSelectedIngredient } = selectedIngredientSlice.selectors
