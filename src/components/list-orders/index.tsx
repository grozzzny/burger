import React from 'react'
import styles from './index.module.css'
import { Order } from '@/components'
import { orders } from '@/utils/data-orders'

interface ListOrdersProps {}

export const ListOrders: React.FC<ListOrdersProps> = () => {
  return (
    <div className={styles.content}>
      <div className={styles.fixedBlock}>
        <h2 className={`${styles.heading} text text_type_main-large mb-5`}>Лента заказов</h2>
      </div>
      <div className={styles.scrollableBlock}>
        {orders.map((order, i) => (
          <Order linkTo={`/feed/${order.id}`} key={i} order={order} />
        ))}
      </div>
    </div>
  )
}
