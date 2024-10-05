import { rootReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import { socketMiddleware } from '@/services/middleware/socket-middleware'
import { wsConnectFeedOrders, wsDisconnectFeedOrders } from '@/services/feed-orders/actions'
import { wsCloseFeedOrders, wsConnectingFeedOrders, wsErrorFeedOrders, wsMessageFeedOrders, wsOpenFeedOrders } from '@/services/feed-orders/reducer'
import { WsData } from '@/types'
import { wsConnectProfileOrders, wsDisconnectProfileOrders } from '@/services/profile-orders/actions'
import {
  wsCloseProfileOrders,
  wsConnectingProfileOrders,
  wsErrorProfileOrders, wsMessageProfileOrders,
  wsOpenProfileOrders
} from '@/services/profile-orders/reducer'

const feedOrdersMiddleware = socketMiddleware<unknown, WsData>({
  connect: wsConnectFeedOrders,
  disconnect: wsDisconnectFeedOrders,
  onConnecting: wsConnectingFeedOrders,
  onOpen: wsOpenFeedOrders,
  onClose: wsCloseFeedOrders,
  onError: wsErrorFeedOrders,
  onMessage: wsMessageFeedOrders
})

const profileOrdersMiddleware = socketMiddleware<unknown, WsData>({
  connect: wsConnectProfileOrders,
  disconnect: wsDisconnectProfileOrders,
  onConnecting: wsConnectingProfileOrders,
  onOpen: wsOpenProfileOrders,
  onClose: wsCloseProfileOrders,
  onError: wsErrorProfileOrders,
  onMessage: wsMessageProfileOrders
}, true)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedOrdersMiddleware, profileOrdersMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
