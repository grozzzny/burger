import React from 'react'
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from '@/types'

interface IngredientItemProps {
  item: Item
  count?: number
}

export const IngredientItem: React.FC<IngredientItemProps> = ({ item, count }) => {
  return (
    <div className={styles.card}>
      {count && (
        <div className={styles.count}>
          <Counter count={count} size="default" />
        </div>
      )}
      <div className={`${styles.preview} ml-4 mr-4 mb-1`}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.name}><span className="text text_type_main-default">{item.name}</span></div>
    </div>
  )
}
