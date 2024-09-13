import React from 'react'
import styles from '@/app.module.css'
import { ListOrders, OrderStatus } from '@/components'

export const FeedPage: React.FC = () => {
  return (
    <div className={styles.container} style={{ gap: 60 }}>
      <ListOrders />
      <OrderStatus />
    </div>
  )
}
