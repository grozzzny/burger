import { ERROR_JWT_EXPIRED, updateAccessToken } from '@/utils/local-storage-helper'

export default class BaseApi {
  public static async fetcher<T>(url: string, options: RequestInit = {}): Promise<T | never> {
    const headers: HeadersInit | Record<string, any> = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }

    try {
      const response = await fetch(`${__API_URI__}${url}`, {
        ...options,
        headers
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Что-то пошло не так..')
      }

      return await response.json()
    } catch (error) {
      if ((error as Error).message === ERROR_JWT_EXPIRED) {
        const { accessToken } = await updateAccessToken()
        return await BaseApi.fetcher(url, {
          ...options,
          headers: {
            Authorization: accessToken
          }
        })
      }
      console.error('Fetch error:', error)
      throw error
    }
  }

  public async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return BaseApi.fetcher(url, { ...options, method: 'GET' })
  }

  public async post<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
    return BaseApi.fetcher(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  public async patch<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
    return BaseApi.fetcher(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body)
    })
  }

  public async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return BaseApi.fetcher(url, { ...options, method: 'DELETE' })
  }
}

export type ResponseApi<T = { message: string }> = { success: boolean } & T
