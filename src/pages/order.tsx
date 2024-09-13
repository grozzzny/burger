import React from 'react'
import styles from '@/app.module.css'
import withProtection from '@/pages/with-protection'
import { useParams } from 'react-router-dom'
import { orders } from '@/utils/data-orders'
import { Error, OrderInfo } from '@/components'

export const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const order = orders.find(item => item.id === id)
  if(!order) return <Error label='Заказ не найден'/>
  return (
    <div className={styles.orderContainer}>
      <div className={`${styles.orderContent}`}>
        <OrderInfo order={order}/>
      </div>
    </div>
  )
}

export const OrderPageWithProtected = withProtection(OrderPage)
