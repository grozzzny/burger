import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebsocketStatus, WsData, WsOrder } from '@/types'

export type ProfileOrdersStore = {
  status: WebsocketStatus
  orders: WsOrder[]
  error: string | null
}

const initialState: ProfileOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: null
}

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsConnectingProfileOrders: (state) => {
      state.status = WebsocketStatus.CONNECTING
      state.error = null
    },
    wsOpenProfileOrders: (state) => {
      state.status = WebsocketStatus.ONLINE
      state.error = null
    },
    wsCloseProfileOrders: (state) => {
      state.status = WebsocketStatus.OFFLINE
      state.error = null
    },
    wsErrorProfileOrders: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    wsMessageProfileOrders: (state, { payload: { orders } }: PayloadAction<WsData>) => {
      state.orders = orders
      state.error = null
    }
  },
  selectors: {
    getProfileOrdersError: (state) => state.error,
    getProfileOrders: (state) => state.orders,
    getWebsocketStatus: (state) => state.status
  }
})

export const {
  wsConnectingProfileOrders,
  wsOpenProfileOrders,
  wsCloseProfileOrders,
  wsErrorProfileOrders,
  wsMessageProfileOrders
} = profileOrdersSlice.actions
export const { getProfileOrders, getProfileOrdersError, getWebsocketStatus } = profileOrdersSlice.selectors
