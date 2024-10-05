import React, { CSSProperties } from 'react'
import styles from './index.module.css'
import { Ingredient } from '@/types'

interface IngredientImageProps {
  ingredient: Ingredient
  style?: CSSProperties
  more?: string
}

export const IngredientImage: React.FC<IngredientImageProps> = ({ ingredient, style, more }) => {
  return (
    <div className={styles.ingredient} data-more={more} style={style}>
      <img
        style={
          more
            ? {
                filter: 'grayscale(1)'
              }
            : {}
        }
        src={ingredient.image}
        alt={ingredient.name}
      />
    </div>
  )
}
