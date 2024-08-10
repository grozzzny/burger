import React from 'react'
import styles from './index.module.css'
import imageDone from '@/images/done.svg'

interface OrderDetailsProps {
  orderId: number
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  return (
    <div className={styles.order}>
      <div className={`${styles.number} text text_type_digits-large mb-8`}>{orderId}</div>
      <div className={`${styles.label} text text_type_main-medium mb-15`}>идентификатор заказа</div>
      <div className={`${styles.image} mb-15`}>
        <img width={120} height={120} src={imageDone} alt='done' />
      </div>
      <div className={`${styles.text1} text text_type_main-default mb-2`}>Ваш заказ начали готовить</div>
      <div className={`${styles.text2} text text_type_main-default mb-15`}>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}
