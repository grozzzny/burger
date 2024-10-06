import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderState {
  ids: string[]
  total: number,
  orderId: number
}

export const initialState: OrderState = {
  ids: [],
  total: 0,
  orderId: 0
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getIds: (state) => state.ids,
    getOrderId: (state) => state.orderId,
    getTotal: (state) => state.total
  },
  reducers: {
    setIds: (state, { payload }: PayloadAction<string[]>) => {
      state.ids = payload
    },
    setTotal: (state, { payload }: PayloadAction<number>) => {
      state.total = payload
    },
    setOrderId: (state, { payload }: PayloadAction<number>) => {
      state.orderId = payload
    }
  }
})

export const { setIds, setTotal, setOrderId } = orderSlice.actions
export const { getIds, getTotal, getOrderId } = orderSlice.selectors
