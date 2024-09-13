import React from 'react'
import styles from './index.module.css'

interface OrderStatusProps {}

export const OrderStatus: React.FC<OrderStatusProps> = () => {
  return (
    <div className={`${styles.content} mt-25 pl-4`}>
      <div className={`${styles.ordersStatus} mb-15`}>
        <div className={`${styles.columnStatus}`}>
          <div className={`${styles.heading} text text_type_main-medium mb-6`}>
            Готовы:
          </div>
          <ul className={`${styles.success}`}>
            <li className={`mb-2 text text_type_digits-default`}>034533</li>
            <li className={`mb-2 text text_type_digits-default`}>034532</li>
            <li className={`mb-2 text text_type_digits-default`}>034530</li>
            <li className={`mb-2 text text_type_digits-default`}>034527</li>
            <li className={`mb-2 text text_type_digits-default`}>034525</li>
          </ul>
        </div>
        <div className={`${styles.columnStatus}`}>
          <div className={`${styles.heading} text text_type_main-medium mb-6`}>
            В работе:
          </div>
          <ul className={`${styles.pending}`}>
            <li className={`mb-2 text text_type_digits-default`}>034538</li>
            <li className={`mb-2 text text_type_digits-default`}>034541</li>
            <li className={`mb-2 text text_type_digits-default`}>034542</li>
          </ul>
        </div>
      </div>
      <div className={`mb-15`}>
        <div className={`${styles.heading} text text_type_main-medium`}>
          Выполнено за все время:
        </div>
        <div className={`text text_type_digits-large`}>
          28 752
        </div>
      </div>
      <div>
        <div className={`${styles.heading} text text_type_main-medium`}>
          Выполнено за сегодня:
        </div>
        <div className={`text text_type_digits-large`}>
          138
        </div>
      </div>
    </div>
  )
}
