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

interface BurgerConstructorProps {}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useDispatch()
  const ingredients = useSelector(getIngredients)
  const bun = useSelector(getBun)
  const bunNotification = useSelector(getBunNotification)
  const { notify } = useNotification()

  useEffect(() => {
    if (bunNotification) {
      notify('info', bunNotification)
      dispatch(clearBunNotification())
    }
  }, [bunNotification, dispatch])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: TargetType.BurgerConstructor,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const isActive = canDrop && isOver
  if (isActive) console.log('isActive')

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(updateIngredients({ dragIndex, hoverIndex }))
  }, [])

  const removeElement = useCallback((key: string) => {
    dispatch(removeIngredient({ key }))
  }, [])

  return (
    <>
      <div className={`${styles.content} mt-25 pl-4`} ref={drop}>
        <div className={`${styles.top} mb-4`}>{bun && <BurgerElement type="top" item={bun} isLocked={true} />}</div>
        <div className={`${styles.center} mb-4`}>
          {ingredients.map((item, index) => (
            <BurgerElementWithDrag
              removeElement={removeElement}
              moveElement={moveElement}
              index={index}
              key={item.key}
              item={item}
              isLocked={false}
            />
          ))}
        </div>
        <div className={styles.bottom}>{bun && <BurgerElement type="bottom" item={bun} isLocked={true} />}</div>
        <CheckoutButton onClick={() => setVisible(true)} price={610} />
      </div>
      {visible && (
        <Modal onClose={() => setVisible(false)}>
          <OrderDetails orderId="034536" />
        </Modal>
      )}
    </>
  )
}
