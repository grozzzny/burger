import React, { useState } from 'react'
import styles from './index.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

interface OrderStatusProps {
  ordersDone: number[]
  ordersPending: number[]
  total: number
  totalToday: number
}

const MAX_VISIBLE_ITEMS = 10

export const OrderStatus: React.FC<OrderStatusProps> = ({ ordersDone, ordersPending, total, totalToday }) => {
  const [showDoneAll, setShowDoneAll] = useState(false)
  const [showPendingAll, setShowPendingAll] = useState(false)
  return (
    <div className={`${styles.content} mt-25 pl-4`}>
      <div className={`${styles.ordersStatus} mb-15`}>
        <div className={`${styles.columnStatus}`}>
          <div className={`${styles.heading} text text_type_main-medium mb-6`}>Готовы:</div>
          <ul className={`${styles.success}`}>
            {ordersDone.slice(0, showDoneAll ? ordersDone.length : MAX_VISIBLE_ITEMS).map((orderNumber) => (
              <li key={orderNumber} className={`mb-2 text text_type_digits-default`}>{orderNumber}</li>
            ))}
          </ul>
          {ordersDone.length > MAX_VISIBLE_ITEMS && (
            <Button onClick={() => setShowDoneAll(!showDoneAll)} htmlType="button" type="primary" size="small">
              {showDoneAll ? 'Скрыть' : 'Весь список'}
            </Button>
          )}
        </div>
        <div className={`${styles.columnStatus}`}>
          <div className={`${styles.heading} text text_type_main-medium mb-6`}>В работе:</div>
          <ul className={`${styles.pending}`}>
            {ordersPending.slice(0, showPendingAll ? ordersPending.length : MAX_VISIBLE_ITEMS).map((orderNumber) => (
              <li key={orderNumber} className={`mb-2 text text_type_digits-default`}>{orderNumber}</li>
            ))}
          </ul>
          {ordersPending.length > MAX_VISIBLE_ITEMS && (
            <Button onClick={() => setShowPendingAll(!showPendingAll)} htmlType="button" type="primary" size="small">
              {showPendingAll ? 'Скрыть' : 'Весь список'}
            </Button>
          )}
        </div>
      </div>
      <div className={`mb-15`}>
        <div className={`${styles.heading} text text_type_main-medium`}>Выполнено за все время:</div>
        <div className={`text text_type_digits-large`}>{total}</div>
      </div>
      <div>
        <div className={`${styles.heading} text text_type_main-medium`}>Выполнено за сегодня:</div>
        <div className={`text text_type_digits-large`}>{totalToday}</div>
      </div>
    </div>
  )
}
