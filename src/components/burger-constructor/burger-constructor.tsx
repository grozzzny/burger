import React from 'react'
import data from '@/utils/data'
import styles from './burger-constructor.module.css'
import { BurgerElement, CheckoutButton } from '@/components'
import { ITEM_MAIN_ID } from '@/constants'
import { Item } from '@/types'

export const BurgerConstructor: React.FC = () => {
  const itemMain: Item = data.find((item) => item._id === ITEM_MAIN_ID)!
  return (
    <div className={`${styles.content} mt-25 pl-4`}>
      <div className={`${styles.top} mb-4`}>
        <BurgerElement type="top" item={itemMain} isLocked={true} />
      </div>
      <div className={`${styles.center} mb-4`}>
        {data
          .filter((item) => item._id !== ITEM_MAIN_ID)
          .map((item) => (
            <BurgerElement isDrag={true} key={item._id} item={item} isLocked={false} />
          ))}
      </div>
      <div className={styles.bottom}>
        <BurgerElement type="bottom" item={itemMain} isLocked={true} />
      </div>
      <CheckoutButton price={610}/>
    </div>
  )
}
