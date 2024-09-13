import React, { CSSProperties } from 'react'
import styles from './index.module.css'
import { OrderType } from '@/utils/data-orders'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { IngredientImage } from '@/components'

interface OrderProps {
  order: OrderType
  showStatus?: boolean
  style?: CSSProperties
  linkTo: string
}

export const Order: React.FC<OrderProps> = ({ order, showStatus = false, style, linkTo }) => {
  return (
    <Link to={linkTo} className={`${styles.order} p-6`} style={style}>
      <div className={`${styles.header} mb-6`}>
        <div className={`${styles.id} text text_type_digits-default`}>{order.id}</div>
        <FormattedDate className={`${styles.date} text_color_inactive`} date={new Date(order.time)} />
      </div>
      <div className={`${styles.body} mb-6`}>
        <div className={`${styles.name} text text_type_main-medium`}>{order.name}</div>
        {showStatus && (
          <div
            className={`${styles.status} ${order.status == 'Выполнен' ? styles.success : ''} text text_type_main-default mt-2`}
          >
            {order.status}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {order.ingredients.map((ingredient, i) => (
            <IngredientImage key={i} ingredient={ingredient} style={{ zIndex: 20 - i, marginLeft: i === 0 ? 0 : '-16px' }}/>
          ))}
        </div>
        <div className={`${styles.price} text text_type_digits-default pl-6`}>
          {order.price} <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}
