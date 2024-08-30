import React from 'react'
import { BurgerConstructor, BurgerIngredients } from '@/components'
import styles from '@/app.module.css'

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  )
}
