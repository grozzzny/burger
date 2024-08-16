import { Ingredient } from '@/types'

export const calculateTotal = (bun: Ingredient | null, ingredients: Ingredient[]): number => {
  let total = 0
  if (bun) total += bun.price * 2
  total += ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
  return total
}

export const getArrayIds = (bun: Ingredient | null, ingredients: Ingredient[]): string[] => {
  return [...(bun ? [bun._id] : []), ...ingredients.map((ingredient) => ingredient._id), ...(bun ? [bun._id] : [])]
}
