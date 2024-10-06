import { selectedIngredientSlice, initialState } from '@/services/selected-ingredient/reducer'
import { selectIngredient } from '@/services/selected-ingredient/reducer'
import { Ingredient } from '@/types'

const mockIngredient: Ingredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
}

describe('Тест редьюсеров слайса "selectedIngredientSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(selectedIngredientSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера "selectIngredient"', () => {
    it('должно установить ingredient при вызове selectIngredient', () => {
      const state = selectedIngredientSlice.reducer(initialState, selectIngredient(mockIngredient))
      expect(state).toEqual({ ...initialState, ingredient: mockIngredient })
    })

    it('должно установить ingredient в null при вызове selectIngredient с null', () => {
      const state = selectedIngredientSlice.reducer(initialState, selectIngredient(null))
      expect(state).toEqual({ ...initialState, ingredient: null })
    })
  })
})
