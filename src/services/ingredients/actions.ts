import { createAsyncThunk } from '@reduxjs/toolkit'
import { Ingredient } from '@/types'
import IngredientsApi from '@/api/IngredientsApi'

export const loadIngredients = createAsyncThunk<Ingredient[]>('ingredients/loadIngredients', async () => {
  return new IngredientsApi().fetchItems()
})
