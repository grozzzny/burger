import React, { useCallback, useEffect, useState } from 'react'
import styles from './burger-constructor.module.css'
import { BurgerElement, BurgerElementWithDrag, CheckoutButton, Modal, OrderDetails } from '@/components'
import { TargetType } from '@/types'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from '@/services/store'
import {
  clearBunNotification,
  getBun,
  getBunNotification,
  getIngredients,
  removeIngredient,
  updateIngredients
} from '@/services/burger-constructor/reducer'
import { useNotification } from '@/providers/notification-provider'
import { calculateTotal, getArrayIds } from '@/utils/helper'
import { getIds, getOrderId, getTotal, setIds, setOrderId, setTotal } from '@/services/order/reducer'
import OrdersApi from '@/api/OrdersApi'

interface BurgerConstructorProps {}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useDispatch()
  const ingredients = useSelector(getIngredients)
  const bun = useSelector(getBun)
  const bunNotification = useSelector(getBunNotification)
  const orderId = useSelector(getOrderId)
  const ids = useSelector(getIds)
  const total = useSelector(getTotal)
  const { notify } = useNotification()

  useEffect(() => {
    const total = calculateTotal(bun, ingredients)
    dispatch(setTotal(total))
    const ids = getArrayIds(bun, ingredients)
    dispatch(setIds(ids))
  }, [bun, ingredients, dispatch])

  useEffect(() => {
    if (bunNotification) {
      notify('info', bunNotification)
      dispatch(clearBunNotification())
    }
  }, [bunNotification, dispatch, notify])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: TargetType.BurgerConstructor,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const isActive = canDrop && isOver

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(updateIngredients({ dragIndex, hoverIndex }))
  }, [])

  const removeElement = useCallback((key: string) => {
    dispatch(removeIngredient({ key }))
  }, [])

  const toggleModal = useCallback(
    (open: boolean) => {
      if (open) {
        if (!bun) {
          notify('error', 'Булка обязательна!')
        } else {
          new OrdersApi()
            .create(ids)
            .then((orderId) => {
              dispatch(setOrderId(orderId))
              setVisible(true)
            })
            .catch((err) => notify('error', err.message))
        }
      } else {
        setVisible(false)
        dispatch(setOrderId(0))
      }
    },
    [bun, notify]
  )

  return (
    <>
      <div className={`${styles.content} ${isActive ? styles.activeDrop : ''} mt-25 pl-4`} ref={drop}>
        <div className={`${styles.top} mb-4`}>
          {bun ? (
            <BurgerElement type="top" item={bun} isLocked={true} />
          ) : (
            <div className={`${styles.selectBun} ml-8`}>Выберите булку</div>
          )}
        </div>
        <div className={`${styles.center} mb-4`}>
          {ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <BurgerElementWithDrag
                removeElement={removeElement}
                moveElement={moveElement}
                index={index}
                key={item.key}
                item={item}
                isLocked={false}
              />
            ))
          ) : (
            <div className={`${styles.selectElement} ml-8`}>Перенесите сюда ингредиенты</div>
          )}
        </div>
        <div className={styles.bottom}>
          {' '}
          {bun ? (
            <BurgerElement type="bottom" item={bun} isLocked={true} />
          ) : (
            <div className={`${styles.selectBunButtom} ml-8`}></div>
          )}
        </div>
        <CheckoutButton onClick={() => toggleModal(true)} price={total} />
      </div>
      {visible && (
        <Modal onClose={() => toggleModal(false)}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </>
  )
}
