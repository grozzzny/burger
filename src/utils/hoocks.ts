import { Ingredient, WsOrder, WsOrderDetail } from '@/types'
import { useMemo } from 'react'

export const useOrdersDetail = (orders: WsOrder[], AllIngredients: Ingredient[]): WsOrderDetail[] => {
  return useMemo(() => {
    return orders.map((order) => {
      const ingredients = order.ingredients
        .map((id) => AllIngredients.find((ingredient) => ingredient._id === id))
        .filter((ingredient) => ingredient != null)
      ingredients.push(ingredients[0])
      const total = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
      return {
        ...order,
        ingredientsDetail: ingredients,
        total,
        count: 1
      }
    })
  }, [orders, AllIngredients])
}
