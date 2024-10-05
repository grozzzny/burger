import React, { useCallback, useEffect, useState } from 'react'
import styles from '@/app.module.css'
import withProtection from '@/pages/with-protection'
import { Loading, Modal, Order, OrderInfo, ProfileMenu } from '@/components'
import { useDispatch, useSelector } from '@/services/store'
import { useNotification } from '@/providers/notification-provider'
import { loadIngredients } from '@/services/ingredients/actions'
import { getAllIngredients } from '@/services/ingredients/reducer'
import { wsConnectProfileOrders, wsDisconnectProfileOrders } from '@/services/profile-orders/actions'
import { useOrdersDetail } from '@/utils/hoocks'
import { getAccessToken } from '@/utils/local-storage-helper'
import { getProfileOrders } from '@/services/profile-orders/reducer'
import { WsOrderDetail } from '@/types'

export const OrdersPage: React.FC = () => {
  const dispatch = useDispatch()
  const orders = useSelector(getProfileOrders)
  const ingredients = useSelector(getAllIngredients)
  const { loading, error } = useSelector((state) => state.ingredients)
  const notification = useNotification()
  const ordersDetail = useOrdersDetail(orders, ingredients)
  const [visible, setVisible] = useState<boolean>(false)
  const order = window.history.state.order

  const toggleModal = useCallback((order: WsOrderDetail | null) => {
    if (order) {
      setVisible(true)
      window.history.replaceState({ order: order }, '', `/profile/orders/${order._id}`)
    } else {
      setVisible(false)
      window.history.replaceState({ order: null }, '', `/profile/orders`)
    }
  }, [])

  useEffect(() => {
    if (error) notification?.notify('error', error)
  }, [error, notification])

  useEffect(() => {
    dispatch(loadIngredients())
    const token = getAccessToken()?.replace('Bearer ', '')
    dispatch(wsConnectProfileOrders(`${__WS_URI__}/orders?token=${token}`))
    return () => {
      dispatch(wsDisconnectProfileOrders())
    }
  }, [])

  if (loading || error) return <Loading />

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={`${styles.profileLeftSide} mr-15`}>
          <ProfileMenu />
          <div className={styles.profileFooter}>
            <p className={'text text_type_main-default text_color_inactive'}>
              В этом разделе вы можете
              <br /> увидеть список заказов
            </p>
          </div>
        </div>
        <div className={styles.orderRightSide}>
          {ordersDetail.map((order, i) => (
            <Order
              toggleModal={toggleModal}
              showStatus={true}
              key={i}
              order={order}
              style={{ marginBottom: '24px' }}
            />
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

export const OrdersPageWithProtected = withProtection(OrdersPage)
