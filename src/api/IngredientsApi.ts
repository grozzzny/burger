import BaseApi from '@/api/BaseApi'
import { Item } from '@/types'

export default class IngredientsApi extends BaseApi {
  async fetchItems(options: RequestInit = {}): Promise<Item[]> {
    const { data } = await this.get<{
      data: Item[]
      success: boolean
    }>(`/ingredients`, options)
    return data
  }
}
