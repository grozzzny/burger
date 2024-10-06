import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { WebsocketStatus, WsData, WsOrder } from '@/types'

export type FeedOrdersStore = {
  status: WebsocketStatus
  orders: WsOrder[]
  total: number
  totalToday: number
  error: string | null
}

export const initialState: FeedOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
}

export const feedOrdersSlice = createSlice({
  name: 'feedOrders',
  initialState,
  reducers: {
    wsConnectingFeedOrders: (state) => {
      state.status = WebsocketStatus.CONNECTING
      state.error = null
    },
    wsOpenFeedOrders: (state) => {
      state.status = WebsocketStatus.ONLINE
      state.error = null
    },
    wsCloseFeedOrders: (state) => {
      state.status = WebsocketStatus.OFFLINE
      state.error = null
    },
    wsErrorFeedOrders: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    wsMessageFeedOrders: (state, { payload: { orders, total, totalToday } }: PayloadAction<WsData>) => {
      state.orders = orders
      state.total = total
      state.totalToday = totalToday
      state.error = null
    }
  },
  selectors: {
    getFeedOrdersError: (state) => state.error,
    getFeedOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalTodayOrders: (state) => state.totalToday,
    getWebsocketStatus: (state) => state.status,
    getOrdersDone: createSelector(
      (state) => state.orders,
      (orders: WsOrder[]) => orders.filter((order) => order.status === 'done').map((order) => order.number)
    ),
    getOrdersPending: createSelector(
      (state) => state.orders,
      (orders: WsOrder[]) => orders.filter((order) => order.status === 'pending').map((order) => order.number)
    )
  }
})

export const { wsConnectingFeedOrders, wsOpenFeedOrders, wsCloseFeedOrders, wsErrorFeedOrders, wsMessageFeedOrders } = feedOrdersSlice.actions
export const {
  getFeedOrders,
  getFeedOrdersError,
  getWebsocketStatus,
  getTotalOrders,
  getTotalTodayOrders,
  getOrdersDone,
  getOrdersPending
} = feedOrdersSlice.selectors
