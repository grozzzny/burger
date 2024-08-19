import BaseApi, { ResponseApi } from '@/api/BaseApi'

export default class AuthApi extends BaseApi {
  async register(params: UserWithPassword, options: RequestInit = {}) {
    const { accessToken, refreshToken } = await this.post<ResponseUserApi>('/auth/register', params, options)
    return {
      accessToken,
      refreshToken
    }
  }

  async login(params: Credentials, options: RequestInit = {}) {
    const { accessToken, refreshToken } = await this.post<ResponseUserApi>('/auth/login', params, options)
    return {
      accessToken,
      refreshToken
    }
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

type Credentials = {
  email: string
  password: string
}

type ResponseUserApi = ResponseApi<{
  user: User
  accessToken: string
  refreshToken: string
}>

interface User {
  email: string
  name: string
}

interface UserWithPassword extends User {
  password: string
}
