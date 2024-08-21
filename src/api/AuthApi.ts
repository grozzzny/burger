import BaseApi, { ResponseApi } from '@/api/BaseApi'
import { Credentials, ResponseUserApi, User, UserWithPassword } from '@/types'

export default class AuthApi extends BaseApi {
  async register(params: UserWithPassword, options: RequestInit = {}) {
    const { success, ...result } = await this.post<ResponseUserApi>('/auth/register', params, options)
    return result
  }

  async login(params: Credentials, options: RequestInit = {}) {
    const { success, ...result } = await this.post<ResponseUserApi>('/auth/login', params, options)
    return result
  }

  async logout(
    params: {
      token: string
    },
    options: RequestInit = {}
  ) {
    return this.post<ResponseApi>('/auth/logout', params, options)
  }

  async refreshToken(
    params: {
      token: string
    },
    options: RequestInit = {}
  ) {
    const { accessToken, refreshToken } = await this.post<
      ResponseApi<{
        accessToken: string
        refreshToken: string
      }>
    >('/auth/token', params, options)
    return {
      accessToken,
      refreshToken
    }
  }

  async getUser(options: RequestInit = {}): Promise<User> {
    const { user } = await this.get<
      ResponseApi<{
        user: User
      }>
    >('/auth/user', options)
    return user
  }

  async updateUser(params: User, options: RequestInit = {}): Promise<User> {
    const { user } = await this.patch<
      ResponseApi<{
        user: User
      }>
    >('/auth/user', params, options)
    return user
  }

  async preResetPassword(
    params: {
      email: string
    },
    options: RequestInit = {}
  ) {
    return this.post<ResponseApi>('/password-reset', params, options)
  }

  async resetPassword(
    params: {
      password: string
      token: string
    },
    options: RequestInit = {}
  ) {
    return this.post<ResponseApi>('/password-reset/reset', params, options)
  }
}
