import React from 'react'
import styles from '@/app.module.css'
import withProtection from '@/pages/with-protection'
import { ProfileMenu } from '@/components'

export const OrderPage: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileLeftSide} mr-15`}>
        <ProfileMenu/>
        <div className={styles.profileFooter}>
          <p className={'text text_type_main-default text_color_inactive'}>В этом разделе вы можете<br/> увидеть свой заказ</p>
        </div>
      </div>
      <div className={styles.profileRightSide}>
        Заказ
      </div>
    </div>
  )
}

export const OrderPageWithProtected = withProtection(OrderPage)
