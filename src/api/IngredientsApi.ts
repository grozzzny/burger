import BaseApi from '@/api/BaseApi'
import { Ingredient } from '@/types'

export default class IngredientsApi extends BaseApi {
  async fetchItems(options: RequestInit = {}): Promise<Ingredient[]> {
    const { data } = await this.get<{
      data: Ingredient[]
      success: boolean
    }>(`/ingredients`, options)
    return data
  }
}
