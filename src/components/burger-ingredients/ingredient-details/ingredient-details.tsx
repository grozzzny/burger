import React from 'react'
import { Ingredient } from '@/types'
import styles from './ingredient-details.module.css'

interface IngredientDetailsProps {
  item: Ingredient
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({ item }) => {
  const options: { key: string; name: string; value: number }[] = [
    {
      key: 'calories',
      name: 'Калории,ккал',
      value: item.calories
    },
    {
      key: 'proteins',
      name: 'Белки, г',
      value: item.proteins
    },
    {
      key: 'fat',
      name: 'Жиры, г',
      value: item.fat
    },
    {
      key: 'carbohydrates',
      name: 'Углеводы, г',
      value: item.carbohydrates
    }
  ]
  return (
    <div className={styles.details}>
      <h3 className={`${styles.heading} text text_type_main-large`}>Детали ингредиента</h3>
      <div className={styles.body}>
        <div className={`${styles.preview} mb-4`}>
          <img width={480} height={240} src={item.image_large} alt={item.name} />
        </div>
        <div className={`${styles.name} text text_type_main-medium mb-8`}>{item.name}</div>
        <ul className={`${styles.options}`}>
          {options.map(({ key, value, name }) => (
            <li className={styles.option} key={key}>
              <div className={`${styles.optionName} text text_type_main-default`}>{name}</div>
              <div className={`${styles.optionValue} text text_type_digits-default`}>{value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
