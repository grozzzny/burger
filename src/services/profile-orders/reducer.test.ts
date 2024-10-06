import { profileOrdersSlice, initialState } from '@/services/profile-orders/reducer'
import {
  wsConnectingProfileOrders,
  wsOpenProfileOrders,
  wsCloseProfileOrders,
  wsErrorProfileOrders,
  wsMessageProfileOrders
} from '@/services/profile-orders/reducer'
import { WsData, WsOrder } from '@/types'

const mockOrders: WsOrder[] = [
  {
    ingredients: ['sadfs9f7d', 'dfghdgh809df8'],
    _id: '35462341',
    status: 'done',
    number: 234532535,
    name: 'Order 234532535',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02'
  },
  {
    ingredients: ['wqrew7erw87', 'ewf09trh0h8'],
    _id: '21342142',
    status: 'pending',
    number: 32452345,
    name: 'Order 32452345',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02'
  }
]

describe('Тест редьюсеров слайса "profileOrdersSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(profileOrdersSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера вебсокета ProfileOrders', () => {
    it('должно устанавливать статус в CONNECTING при wsConnectingProfileOrders', () => {
      const nextState = profileOrdersSlice.reducer(initialState, wsConnectingProfileOrders())
      expect(nextState).toEqual({ ...initialState, status: 'CONNECTING' })
    })

    it('должно устанавливать статус в ONLINE при wsOpenProfileOrders', () => {
      const nextState = profileOrdersSlice.reducer(initialState, wsOpenProfileOrders())
      expect(nextState).toEqual({ ...initialState, status: 'ONLINE' })
    })

    it('должно устанавливать статус в OFFLINE при wsCloseProfileOrders', () => {
      const nextState = profileOrdersSlice.reducer(initialState, wsCloseProfileOrders())
      expect(nextState).toEqual({ ...initialState, status: 'OFFLINE' })
    })

    it('должно устанавливать ошибку при wsErrorProfileOrders', () => {
      const errorMessage = 'Ошибка соединения'
      const nextState = profileOrdersSlice.reducer(initialState, wsErrorProfileOrders(errorMessage))
      expect(nextState).toEqual({ ...initialState, error: errorMessage })
    })

    it('должно обновлять заказы при wsMessageProfileOrders', () => {
      const payload: WsData = { success: true, orders: mockOrders, total: 453456, totalToday: 3245 }
      const nextState = profileOrdersSlice.reducer(initialState, wsMessageProfileOrders(payload))
      expect(nextState).toEqual({ ...initialState, orders: mockOrders })
    })
  })
})
