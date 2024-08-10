import { rootReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'

export const store = configureStore({
  reducer: rootReducer
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
