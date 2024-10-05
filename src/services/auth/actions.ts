import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from '@/api/AuthApi'
import { Credentials, User, UserWithPassword } from '@/types'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  withAuth
} from '@/utils/local-storage-helper'

const authApi = new AuthApi()

export const register = createAsyncThunk('auth/register', async (params: UserWithPassword) => {
  const response = await authApi.register(params)
  setTokens(response.accessToken, response.refreshToken)
  return response
})

export const login = createAsyncThunk('auth/login', async (params: Credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(params)
    setTokens(response.accessToken, response.refreshToken)
    return response
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      await authApi.logout({ token: refreshToken })
    }
    clearTokens()
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    if(!getAccessToken()) return null
    return await authApi.getUser(withAuth())
  } catch (error) {
    const message = (error as Error).message
    return rejectWithValue(message)
  }
})

export const updateUser = createAsyncThunk('auth/updateUser', async (params: User, { rejectWithValue }) => {
  try {
    return await authApi.updateUser(params, withAuth())
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})
