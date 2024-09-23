import React, { useEffect } from 'react'
import styles from '@/app.module.css'
import withProtection from '@/pages/with-protection'
import { useParams } from 'react-router-dom'
import { Loading, OrderInfo } from '@/components'
import { useDispatch, useSelector } from '@/services/store'
import { getFeedOrders } from '@/services/feed-orders/reducer'
import { getAllIngredients } from '@/services/ingredients/reducer'
import { useNotification } from '@/providers/notification-provider'
import { useOrdersDetail } from '@/utils/hoocks'
import { loadIngredients } from '@/services/ingredients/actions'
import { wsConnectFeedOrders, wsDisconnectFeedOrders } from '@/services/feed-orders/actions'

export const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const orders = useSelector(getFeedOrders)
  const ingredients = useSelector(getAllIngredients)
  const { loading, error } = useSelector((state) => state.ingredients)
  const notification = useNotification()
  const ordersDetail = useOrdersDetail(orders, ingredients)

  useEffect(() => {
    if (error) notification?.notify('error', error)
  }, [error, notification])

  const order = ordersDetail.find((item) => item._id === id)

  useEffect(() => {
    dispatch(loadIngredients())
    dispatch(wsConnectFeedOrders(`${__WS_URI__}/orders/all`))
    return () => {
      dispatch(wsDisconnectFeedOrders())
    }
  }, [])

  if (loading || error || !order) return <Loading />

  return (
    <div className={styles.orderContainer}>
      <div className={`${styles.orderContent}`}>
        <OrderInfo order={order} />
      </div>
    </div>
  )
}

export const OrderPageWithProtected = withProtection(OrderPage)
