import React, { CSSProperties } from 'react'
import styles from './index.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientImage } from '@/components'
import { WsOrderDetail } from '@/types'
import { labelStatus } from '@/constants'

interface OrderProps {
  order: WsOrderDetail
  showStatus?: boolean
  style?: CSSProperties
  maxIngredients?: number
  toggleModal: (order: WsOrderDetail | null) => void
}

export const Order: React.FC<OrderProps> = ({ toggleModal, order, showStatus = false, style, maxIngredients = 5 }) => {
  return (
    <div onClick={() => toggleModal(order)} className={`${styles.order} p-6`} style={style}>
      <div className={`${styles.header} mb-6`}>
        <div className={`${styles.id} text text_type_digits-default`}>{order.number}</div>
        <FormattedDate className={`${styles.date} text_color_inactive`} date={new Date(order.createdAt)} />
      </div>
      <div className={`${styles.body} mb-6`}>
        <div className={`${styles.name} text text_type_main-medium`}>{order.name}</div>
        {showStatus && (
          <div className={`${styles.status} ${styles[order.status]} text text_type_main-default mt-2`}>
            {labelStatus[order.status]}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {order.ingredientsDetail.slice(0, maxIngredients).map((ingredient, i) => (
            <IngredientImage
              key={i}
              ingredient={ingredient}
              style={{ zIndex: 20 - i, marginLeft: i === 0 ? 0 : '-16px' }}
            />
          ))}
          {order.ingredientsDetail.length > maxIngredients && (
            <IngredientImage
              key={maxIngredients}
              more={`+${order.ingredientsDetail.length - maxIngredients}`}
              ingredient={order.ingredientsDetail[maxIngredients]}
              style={{ zIndex: 20 - maxIngredients, marginLeft: '-16px' }}
            />
          )}
        </div>
        <div className={`${styles.price} text text_type_digits-default pl-6`}>
          {order.total} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
