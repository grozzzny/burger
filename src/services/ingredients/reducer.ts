import { createSlice } from '@reduxjs/toolkit'
import { loadIngredients } from './actions'
import { createSelector } from 'reselect'
import { Ingredient } from '@/types'

interface IngredientsState {
  ingredients: Ingredient[]
  loading: boolean
  error: null | string
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: true,
  error: null
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getSauceIngredients: createSelector(
      (state) => state.ingredients,
      (ingredients: Ingredient[]) => ingredients.filter((ingredient) => ingredient.type === 'sauce')
    ),
    getBunIngredients: createSelector(
      (state) => state.ingredients,
      (ingredients: Ingredient[]) => ingredients.filter((ingredient) => ingredient.type === 'bun')
    ),
    getMainIngredients: createSelector(
      (state) => state.ingredients,
      (ingredients: Ingredient[]) => ingredients.filter((ingredient) => ingredient.type === 'main')
    ),
    getIngredient: createSelector(
      [(state: IngredientsState) => state.ingredients, (_state: IngredientsState, id: string) => id],
      (ingredients: Ingredient[], id: string) => ingredients.find((ingredient) => ingredient._id === id)
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload
        state.loading = false
      })
      .addCase(loadIngredients.rejected, (state, { error }) => {
        state.error = error.message || null
        state.loading = false
      })
  }
})

export const { getSauceIngredients, getBunIngredients, getMainIngredients, getIngredient } = ingredientsSlice.selectors
