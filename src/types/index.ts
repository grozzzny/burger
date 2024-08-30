import { ResponseApi } from '@/api/BaseApi'
import React from 'react'
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons'

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

export interface TInputInterface extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: keyof TICons;
  errorText?: string;
  size?: 'default' | 'small';
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
  onPointerEnterCapture: unknown
  onPointerLeaveCapture: unknown
}
