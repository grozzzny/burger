import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import { Modal, Order, OrderInfo } from '@/components'
import { WsOrderDetail } from '@/types'

interface ListOrdersProps {
  orders: WsOrderDetail[]
}

export const ListOrders: React.FC<ListOrdersProps> = ({ orders }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const order = window.history.state.order

  useEffect(() => {
    if (order) setVisible(true)
  }, [])

  const toggleModal = useCallback((order: WsOrderDetail | null) => {
    if (order) {
      setVisible(true)
      window.history.replaceState({ order: order }, '', `/feed/${order._id}`)
    } else {
      setVisible(false)
      window.history.replaceState({ order: null }, '', `/feed`)
    }
  }, [])

  return (
    <>
      <div className={styles.content}>
        <div className={styles.fixedBlock}>
          <h2 className={`${styles.heading} text text_type_main-large mb-5`}>Лента заказов</h2>
        </div>
        <div className={styles.scrollableBlock}>
          {orders.map((order) => (
            <Order toggleModal={toggleModal} key={order._id} order={order} />
          ))}
        </div>
      </div>
      {visible && (
        <Modal onClose={() => toggleModal(null)}>
          <OrderInfo order={order}/>
        </Modal>
      )}
    </>
  )
}
