import update from 'immutability-helper'
import React, { useCallback, useState } from 'react'
import styles from './burger-constructor.module.css'
import { BurgerElement, BurgerElementWithDrag, CheckoutButton, Modal, OrderDetails } from '@/components'
import { ITEM_MAIN_NAME } from '@/constants'
import { Item } from '@/types'
import { useDrop } from 'react-dnd'

interface BurgerConstructorProps {
  items: Item[]
}

export const DND_TARGET_TYPE_BOX = 'box'

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ items }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const itemMain = items.find((item) => item.name === ITEM_MAIN_NAME)
  const ingredients = items.filter((item) => item.name !== ITEM_MAIN_NAME)
  const [cards, setCards] = useState<Item[]>(ingredients)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DND_TARGET_TYPE_BOX,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const isActive = canDrop && isOver
  console.log('isActive', isActive)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item]
        ]
      })
    )
  }, [])

  return (
    <>
      <div className={`${styles.content} mt-25 pl-4`} ref={drop}>
        <div className={`${styles.top} mb-4`}>
          {itemMain && <BurgerElement type="top" item={itemMain} isLocked={true} />}
        </div>
        <div className={`${styles.center} mb-4`}>
          {cards.map((item, index) => (
            <BurgerElementWithDrag moveCard={moveCard} index={index} key={item._id} item={item} isLocked={false} />
          ))}
        </div>
        <div className={styles.bottom}>
          {itemMain && <BurgerElement type="bottom" item={itemMain} isLocked={true} />}
        </div>
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
