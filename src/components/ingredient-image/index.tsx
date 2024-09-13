import React, { CSSProperties } from 'react'
import styles from './index.module.css'
import { OrderIngredientType } from '@/utils/data-orders'

interface IngredientImageProps {
  ingredient: OrderIngredientType
  style?: CSSProperties
}

export const IngredientImage: React.FC<IngredientImageProps> = ({ ingredient, style }) => {
  return (
    <div className={styles.ingredient} style={style}>
      <img src={ingredient.image} alt={ingredient.name} />
    </div>
  )
}
