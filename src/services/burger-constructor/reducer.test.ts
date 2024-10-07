import { burgerConstructorSlice, initialState } from '@/services/burger-constructor/reducer'
import {
  setBun,
  addIngredient,
  removeIngredient,
  updateIngredients,
  clearConstructor,
  clearBunNotification
} from '@/services/burger-constructor/reducer'
import { Ingredient } from '@/types'

const mockBun: Ingredient = {
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
}

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

describe('Тест редьюсеров слайса "burgerConstructorSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера "setBun"', () => {
    it('должно установить булку и очистить notification', () => {
      const state = burgerConstructorSlice.reducer(initialState, { type: setBun.type, payload: mockBun })
      expect(state).toEqual({ ...initialState, bun: mockBun, notification: null })
    })

    it('должно установить notification, если булка уже выбрана', () => {
      const stateWithBun = { ...initialState, bun: mockBun }
      const state = burgerConstructorSlice.reducer(stateWithBun, { type: setBun.type, payload: mockBun })
      expect(state.notification).toEqual('Эта булка уже выбрана')
    })
  })

  describe('Тест редьюсера "addIngredient"', () => {
    it('должно добавить ингредиент в конструктор', () => {
      const state = burgerConstructorSlice.reducer(initialState, {
        type: addIngredient.type,
        payload: mockIngredient
      })
      expect(state.ingredients).toEqual([mockIngredient])
    })
  })

  describe('Тест редьюсера "removeIngredient"', () => {
    it('должно удалить ингредиент по key', () => {
      const stateWithIngredient = { ...initialState, ingredients: [mockIngredient] }
      const state = burgerConstructorSlice.reducer(stateWithIngredient, {
        type: removeIngredient.type,
        payload: { key: mockIngredient.key }
      })
      expect(state.ingredients).toEqual([])
    })
  })

  describe('Тест редьюсера "updateIngredients"', () => {
    it('должно изменить порядок ингредиентов', () => {
      const ingredient1: Ingredient = { ...mockIngredient, key: 'ingredient1' }
      const ingredient2: Ingredient = { ...mockIngredient, key: 'ingredient2', name: 'Мини-салат Экзо-Плантаго' }
      const stateWithIngredients = { ...initialState, ingredients: [ingredient1, ingredient2] }
      const state = burgerConstructorSlice.reducer(stateWithIngredients, {
        type: updateIngredients.type,
        payload: { dragIndex: 0, hoverIndex: 1 }
      })
      expect(state.ingredients).toEqual([ingredient2, ingredient1])
    })
  })

  describe('Тест редьюсера "clearConstructor"', () => {
    it('должно очистить конструктор', () => {
      const stateWithBunAndIngredients = { ...initialState, bun: mockBun, ingredients: [mockIngredient] }
      const state = burgerConstructorSlice.reducer(stateWithBunAndIngredients, { type: clearConstructor.type })
      expect(state).toEqual(initialState)
    })
  })

  describe('Тест редьюсера "clearBunNotification"', () => {
    it('должно очистить notification', () => {
      const stateWithNotification = { ...initialState, notification: 'Эта булка уже выбрана' }
      const state = burgerConstructorSlice.reducer(stateWithNotification, { type: clearBunNotification.type })
      expect(state.notification).toBeNull()
    })
  })
})
