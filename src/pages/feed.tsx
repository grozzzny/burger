import React, { useEffect } from 'react'
import styles from '@/app.module.css'
import { ListOrders, Loading, OrderStatus } from '@/components'
import { useDispatch, useSelector } from '@/services/store'
import {
  getFeedOrders,
  getOrdersDone,
  getOrdersPending,
  getTotalOrders,
  getTotalTodayOrders
} from '@/services/feed-orders/reducer'
import { wsConnectFeedOrders, wsDisconnectFeedOrders } from '@/services/feed-orders/actions'
import { loadIngredients } from '@/services/ingredients/actions'
import { useNotification } from '@/providers/notification-provider'
import { getAllIngredients } from '@/services/ingredients/reducer'
import { useOrdersDetail } from '@/utils/hoocks'

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch()
  const orders = useSelector(getFeedOrders)
  const totalOrders = useSelector(getTotalOrders)
  const totalTodayOrders = useSelector(getTotalTodayOrders)
  const ordersDone = useSelector(getOrdersDone)
  const ordersPending = useSelector(getOrdersPending)
  const ingredients = useSelector(getAllIngredients)
  const { loading, error } = useSelector((state) => state.ingredients)
  const notification = useNotification()
  const ordersDetail = useOrdersDetail(orders, ingredients)

  useEffect(() => {
    if (error) notification?.notify('error', error)
  }, [error, notification])

  useEffect(() => {
    dispatch(loadIngredients())
    dispatch(wsConnectFeedOrders(`${__WS_URI__}/orders/all`))
    return () => {
      dispatch(wsDisconnectFeedOrders())
    }
  }, [])

  if (loading || error) return <Loading />

  return (
    <div className={styles.container} style={{ gap: 60 }}>
      <ListOrders orders={ordersDetail} />
      <OrderStatus
        total={totalOrders}
        totalToday={totalTodayOrders}
        ordersDone={ordersDone}
        ordersPending={ordersPending}
      />
    </div>
  )
}
