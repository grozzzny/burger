import { ingredientsSlice, initialState } from '@/services/ingredients/reducer'
import { loadIngredients } from '@/services/ingredients/actions'
import { Ingredient } from '@/types'

const mockIngredients: Ingredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
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
]

describe('Тест редьюсеров слайса "ingredientsSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера "loadIngredients"', () => {
    it('должно установить loading = true при pending', () => {
      const state = ingredientsSlice.reducer(initialState, { type: loadIngredients.pending.type })
      expect(state).toEqual({ ...initialState, loading: true, error: null })
    })

    it('должно установить ingredients и отключить loading при fulfilled', () => {
      const state = ingredientsSlice.reducer(initialState, {
        type: loadIngredients.fulfilled.type,
        payload: mockIngredients
      })
      expect(state).toEqual({ ingredients: mockIngredients, loading: false, error: null })
    })

    it('должно установить error и отключить loading при rejected', () => {
      const error = 'Ошибка загрузки ингредиентов'
      const state = ingredientsSlice.reducer(initialState, {
        type: loadIngredients.rejected.type,
        error: { message: error }
      })
      expect(state).toEqual({ ...initialState, loading: false, error })
    })
  })
})
