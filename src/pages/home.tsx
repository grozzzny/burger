import React from 'react'
import { BurgerConstructor, BurgerIngredients } from '@/components'

export const HomePage: React.FC = () => {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  )
}
