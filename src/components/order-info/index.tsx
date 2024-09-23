import React from 'react'
import styles from './index.module.css'
import { IngredientImage } from '@/components'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { WsOrderDetail } from '@/types'
import { labelStatus } from '@/constants'

interface OrderInfoProps {
  order: WsOrderDetail
}

export const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.header} mb-10`}>
        <div className={`text text_type_digits-default`}>#{order.number}</div>
      </div>
      <div className={`${styles.body} mb-10`}>
        <div className={`text text_type_main-medium mb-3`}>{order.name}</div>
        <div className={`${styles[order.status]} text text_type_main-default mb-15`}>
          {labelStatus[order.status]}
        </div>
        <div className={`text text_type_main-medium mb-6`}>Состав:</div>
        <ul className={`${styles.ingredients} mb-10`}>
          {order.ingredientsDetail.map((ingredient, i) => (
            <li key={i} className={`${styles.ingredient} mb-4`}>
              <IngredientImage style={{marginRight: 16}} ingredient={ingredient}/>
              <div className={`${styles.ingredientName} text text_type_main-default`}>{ingredient.name}</div>
              <div className={`${styles.ingredientPrice} text text_type_digits-default`}>{1} x {ingredient.price} <CurrencyIcon type="primary" /></div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.footer}`}>
        <FormattedDate className={`${styles.date} text_color_inactive`} date={new Date(order.createdAt)} />
        <div className={`${styles.price} text text_type_digits-default`}>{order.total} <CurrencyIcon type="primary" /></div>
      </div>
    </div>
  )
}
