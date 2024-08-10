import BaseApi from '@/api/BaseApi'

export default class OrdersApi extends BaseApi {
  async create(ingredients: string[], options: RequestInit = {}): Promise<number> {
    const {
      order: { number }
    } = await this.post<{
      name: string
      order: {
        number: number
      }
      success: boolean
    }>(`/orders`, { ingredients }, options)
    return number
  }
}
