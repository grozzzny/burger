import React from 'react'
import styles from '@/app.module.css'
import withProtection from '@/pages/with-protection'
import { Order, ProfileMenu } from '@/components'
import { orders } from '@/utils/data-orders'

export const OrdersPage: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileLeftSide} mr-15`}>
        <ProfileMenu/>
        <div className={styles.profileFooter}>
          <p className={'text text_type_main-default text_color_inactive'}>В этом разделе вы можете<br/> увидеть список заказов</p>
        </div>
      </div>
      <div className={styles.orderRightSide}>
        {orders.map((order, i) => (
          <Order linkTo={`/profile/orders/${order.id}`} showStatus={true} key={i} order={order} style={{marginBottom: '24px'}} />
        ))}
      </div>
    </div>
  )
}

export const OrdersPageWithProtected = withProtection(OrdersPage)
