export type IngredientType = 'bun' | 'main' | 'sauce'

export type Ingredient = {
  _id: string
  name: string
  type: IngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  key?: string
  __v: number
}

export type NotificationType = 'warning' | 'success' | 'error' | 'info'

export enum TargetType {
  BurgerConstructor = 'burgerConstructor',
  SortIngredient = 'sortIngredient'
}
