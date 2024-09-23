import { createAction } from '@reduxjs/toolkit'

export const wsConnectFeedOrders = createAction<string, 'FEED_ORDERS_CONNECT'>('FEED_ORDERS_CONNECT')
export const wsDisconnectFeedOrders = createAction('FEED_ORDERS_DISCONNECT')
