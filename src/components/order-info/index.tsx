import React from 'react'
import styles from './index.module.css'
import { OrderType } from '@/utils/data-orders'
import { IngredientImage } from '@/components'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

interface OrderInfoProps {
  order: OrderType
}

export const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.header} mb-10`}>
        <div className={`text text_type_digits-default`}>#{order.id}</div>
      </div>
      <div className={`${styles.body} mb-10`}>
        <div className={`text text_type_main-medium mb-3`}>{order.name}</div>
        <div className={`${order.status == 'Выполнен' ? styles.success : ''} text text_type_main-default mb-15`}>
          {order.status}
        </div>
        <div className={`text text_type_main-medium mb-6`}>Состав:</div>
        <ul className={`${styles.ingredients} mb-10`}>
          {order.ingredients.map((ingredient, i) => (
            <li key={i} className={`${styles.ingredient} mb-4`}>
              <IngredientImage style={{marginRight: 16}} ingredient={ingredient}/>
              <div className={`${styles.ingredientName} text text_type_main-default`}>{ingredient.name}</div>
              <div className={`${styles.ingredientPrice} text text_type_digits-default`}>{ingredient.count} x {ingredient.price} <CurrencyIcon type="primary" /></div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.footer}`}>
        <FormattedDate className={`${styles.date} text_color_inactive`} date={new Date(order.time)} />
        <div className={`${styles.price} text text_type_digits-default`}>{order.price} <CurrencyIcon type="primary" /></div>
      </div>
    </div>
  )
}
