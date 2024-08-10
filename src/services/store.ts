import { rootReducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'

export const store = configureStore({
  reducer: rootReducer
})

type AppDispatch = ReturnType<typeof configureStore>['dispatch']
type RootState = ReturnType<typeof rootReducer>

export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootState>()
