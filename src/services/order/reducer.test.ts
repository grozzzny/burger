import { orderSlice, initialState } from '@/services/order/reducer'
import { setIds, setTotal, setOrderId } from '@/services/order/reducer'

describe('Тест редьюсеров слайса "orderSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера "setIds"', () => {
    it('должно установить ids при вызове setIds', () => {
      const mockIds = ['1234523', '73576745', '36783456']
      const state = orderSlice.reducer(initialState, setIds(mockIds))
      expect(state).toEqual({ ...initialState, ids: mockIds })
    })
  })

  describe('Тест редьюсера "setTotal"', () => {
    it('должно установить total при вызове setTotal', () => {
      const mockTotal = 100
      const state = orderSlice.reducer(initialState, setTotal(mockTotal))
      expect(state).toEqual({ ...initialState, total: mockTotal })
    })
  })

  describe('Тест редьюсера "setOrderId"', () => {
    it('должно установить orderId при вызове setOrderId', () => {
      const mockOrderId = 42435
      const state = orderSlice.reducer(initialState, setOrderId(mockOrderId))
      expect(state).toEqual({ ...initialState, orderId: mockOrderId })
    })
  })
})
