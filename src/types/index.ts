import { ResponseApi } from '@/api/BaseApi'

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

export type Credentials = {
  email: string
  password: string
}

export type ResponseUserApi = ResponseApi<{
  user: User
  accessToken: string
  refreshToken: string
}>

export interface User {
  email: string
  name: string
}

export interface UserWithPassword extends User {
  password: string
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type WsOrderStatus = 'done' | 'pending' | 'created'

export type WsOrder = {
  ingredients: string[]
  _id: string
  status: WsOrderStatus
  number: number
  name: string
  createdAt: string
  updatedAt: string
}

export type WsOrderDetail = {
  ingredientsDetail: Ingredient[]
  total: number
} & WsOrder

export type WsData = {
  success: boolean
  orders: WsOrder[]
  total: number
  totalToday: number
}
