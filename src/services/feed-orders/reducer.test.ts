import { feedOrdersSlice, initialState } from '@/services/feed-orders/reducer'
import {
  wsConnectingFeedOrders,
  wsOpenFeedOrders,
  wsCloseFeedOrders,
  wsErrorFeedOrders,
  wsMessageFeedOrders
} from '@/services/feed-orders/reducer'
import { WebsocketStatus, WsOrder } from '@/types'

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

describe('Тест редьюсеров слайса "feedOrdersSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(feedOrdersSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера "wsConnectingFeedOrders"', () => {
    it('должно установить status = CONNECTING', () => {
      const state = feedOrdersSlice.reducer(initialState, wsConnectingFeedOrders())
      expect(state).toEqual({ ...initialState, status: WebsocketStatus.CONNECTING, error: null })
    })
  })

  describe('Тест редьюсера "wsOpenFeedOrders"', () => {
    it('должно установить status = ONLINE', () => {
      const state = feedOrdersSlice.reducer(initialState, wsOpenFeedOrders())
      expect(state).toEqual({ ...initialState, status: WebsocketStatus.ONLINE, error: null })
    })
  })

  describe('Тест редьюсера "wsCloseFeedOrders"', () => {
    it('должно установить status = OFFLINE', () => {
      const state = feedOrdersSlice.reducer(initialState, wsCloseFeedOrders())
      expect(state).toEqual({ ...initialState, status: WebsocketStatus.OFFLINE, error: null })
    })
  })

  describe('Тест редьюсера "wsErrorFeedOrders"', () => {
    it('должно установить error', () => {
      const error = 'WebSocket error'
      const state = feedOrdersSlice.reducer(initialState, wsErrorFeedOrders(error))
      expect(state).toEqual({ ...initialState, error })
    })
  })

  describe('Тест редьюсера "wsMessageFeedOrders"', () => {
    it('должно установить orders, total и totalToday', () => {
      const wsData = { success: true, orders: mockOrders, total: 100, totalToday: 10 }
      const state = feedOrdersSlice.reducer(initialState, wsMessageFeedOrders(wsData))
      expect(state).toEqual({
        ...initialState,
        orders: mockOrders,
        total: 100,
        totalToday: 10,
        error: null
      })
    })
  })
})
