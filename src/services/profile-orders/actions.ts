import { createAction } from '@reduxjs/toolkit'

export const wsConnectProfileOrders = createAction<string, 'PROFILE_ORDERS_CONNECT'>('PROFILE_ORDERS_CONNECT')
export const wsDisconnectProfileOrders = createAction('PROFILE_ORDERS_DISCONNECT')
