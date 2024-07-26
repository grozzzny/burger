import React, { useState } from 'react'
import styles from './burger-constructor.module.css'
import { BurgerElement, CheckoutButton, Modal, OrderDetails } from '@/components'
import { ITEM_MAIN_NAME } from '@/constants'
import { Item } from '@/types'

interface BurgerConstructorProps {
  items: Item[]
}

export const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ items }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const itemMain = items.find((item) => item.name === ITEM_MAIN_NAME)
  return (
    <>
      <div className={`${styles.content} mt-25 pl-4`}>
        <div className={`${styles.top} mb-4`}>
          {itemMain && <BurgerElement type="top" item={itemMain} isLocked={true} />}
        </div>
        <div className={`${styles.center} mb-4`}>
          {items
            .filter((item) => item.name !== ITEM_MAIN_NAME)
            .map((item) => (
              <BurgerElement isDrag={true} key={item._id} item={item} isLocked={false} />
            ))}
        </div>
        <div className={styles.bottom}>
          {itemMain && <BurgerElement type="bottom" item={itemMain} isLocked={true} />}
        </div>
        <CheckoutButton onClick={() => setVisible(true)} price={610} />
      </div>
      {visible && <Modal onClose={() => setVisible(false)}>
        <OrderDetails orderId='034536'/>
      </Modal>}
    </>
  )
}
