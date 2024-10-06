import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Ingredient } from '@/types'

interface BurgerConstructorState {
  bun: null | Ingredient
  ingredients: Ingredient[]
  notification: string | null
}

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  notification: null
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
    getBunNotification: (state) => state.notification
  },
  reducers: {
    setBun: (state, { payload }: PayloadAction<Ingredient>) => {
      if (state.bun && state.bun._id === payload._id) {
        state.notification = 'Эта булка уже выбрана'
      } else {
        state.bun = payload
        state.notification = null
      }
    },
    removeIngredient: (state, { payload: { key } }: PayloadAction<{ key: string }>) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.key !== key)
    },
    clearBunNotification: (state) => {
      state.notification = null
    },
    updateIngredients: (state, { payload }: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      state.ingredients.splice(payload.dragIndex, 0, state.ingredients.splice(payload.hoverIndex, 1)[0])
    },
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<Ingredient>) => {
        state.ingredients.push(payload)
      },
      prepare: (ingredient: Omit<Ingredient, 'key'>) => {
        return { payload: { ...ingredient, key: nanoid() } }
      }
    },
    clearConstructor: (state) => {
      state.ingredients = []
      state.bun = null
      state.notification = null
    }
  }
})

export const { setBun, addIngredient, removeIngredient, updateIngredients, clearBunNotification, clearConstructor } =
  burgerConstructorSlice.actions
export const { getIngredients, getBun, getBunNotification } = burgerConstructorSlice.selectors
