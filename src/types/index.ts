export type ItemType = 'bun' | 'main' | 'sauce'

export type Item = {
  _id: string
  name: string
  type: ItemType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export type NotificationType = 'warning' | 'success' | 'error' | 'info'
