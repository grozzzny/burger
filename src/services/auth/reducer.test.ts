import { authSlice, initialState } from '@/services/auth/reducer'
import { register, login, logout, getUser, updateUser } from '@/services/auth/actions'
import { User } from '@/types'

const mockUser: User = { name: 'name', email: 'name@email.ru' }

describe('Тест редьюсеров слайса "authSlice"', () => {
  it('должно возвращать начальное состояние', () => {
    expect(authSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  describe('Тест редьюсера "register"', () => {
    it('должно установить loading = true при pending', () => {
      const state = authSlice.reducer(initialState, { type: register.pending.type })
      expect(state).toEqual({ ...initialState, loading: true })
    })

    it('должно установить user и отключить loading при fulfilled', () => {
      const state = authSlice.reducer(initialState, { type: register.fulfilled.type, payload: { user: mockUser } })
      expect(state).toEqual({ ...initialState, user: mockUser, loading: false })
    })

    it('должно установить error при rejected', () => {
      const error = 'Error during registration'
      const state = authSlice.reducer(initialState, { type: register.rejected.type, payload: error })
      expect(state).toEqual({ ...initialState, loading: false, error })
    })
  })

  describe('Тест редьюсера "login"', () => {
    it('должно установить loading = true при pending', () => {
      const state = authSlice.reducer(initialState, { type: login.pending.type })
      expect(state).toEqual({ ...initialState, loading: true })
    })

    it('должно установить user и отключить loading при fulfilled', () => {
      const state = authSlice.reducer(initialState, { type: login.fulfilled.type, payload: { user: mockUser } })
      expect(state).toEqual({ ...initialState, user: mockUser, loading: false })
    })

    it('должно установить error при rejected', () => {
      const error = 'Error during login'
      const state = authSlice.reducer(initialState, { type: login.rejected.type, payload: error })
      expect(state).toEqual({ ...initialState, loading: false, error })
    })
  })

  describe('Тест редьюсера "logout"', () => {
    it('должно сбросить user при fulfilled', () => {
      const loggedInState = { ...initialState, user: { name: 'John Doe', email: 'john@example.com' } }
      const state = authSlice.reducer(loggedInState, { type: logout.fulfilled.type })
      expect(state).toEqual({ ...loggedInState, user: null, loading: false })
    })
  })

  describe('Тест редьюсера "getUser"', () => {
    it('должно установить loading = true при pending', () => {
      const state = authSlice.reducer(initialState, { type: getUser.pending.type })
      expect(state).toEqual({ ...initialState, loading: true })
    })

    it('должно установить user при fulfilled', () => {
      const state = authSlice.reducer(initialState, { type: getUser.fulfilled.type, payload: mockUser })
      expect(state).toEqual({ ...initialState, user: mockUser, loading: false })
    })

    it('должно установить error при rejected', () => {
      const error = 'Error fetching user'
      const state = authSlice.reducer(initialState, { type: getUser.rejected.type, payload: error })
      expect(state).toEqual({ ...initialState, loading: false, error })
    })
  })

  describe('Тест редьюсера "updateUser"', () => {
    it('должно установить loading = true при pending', () => {
      const state = authSlice.reducer(initialState, { type: updateUser.pending.type })
      expect(state).toEqual({ ...initialState, loading: true })
    })

    it('должно обновить user при fulfilled', () => {
      const updatedUser: User = { name: 'John Smith', email: 'john.smith@example.com' }
      const state = authSlice.reducer(initialState, { type: updateUser.fulfilled.type, payload: updatedUser })
      expect(state).toEqual({ ...initialState, user: updatedUser, loading: false })
    })

    it('должно установить error при rejected', () => {
      const error = 'Error updating user'
      const state = authSlice.reducer(initialState, { type: updateUser.rejected.type, payload: error })
      expect(state).toEqual({ ...initialState, loading: false, error })
    })
  })
})
