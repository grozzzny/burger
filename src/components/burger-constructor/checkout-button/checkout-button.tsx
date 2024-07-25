import React from 'react'
import styles from './checkout-button.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface CheckoutButtonProps {
  price: number
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ price }) => {
  return (
    <div className={`${styles.button} mr-4`}>
      <span className={`${styles.price} text text_type_digits-medium`}>
        {price}
        <CurrencyIcon type="primary" />
      </span>
      <Button htmlType="button" type="primary" size="large" extraClass='ml-10'>
        Оформить заказ
      </Button>
    </div>
  )
}
