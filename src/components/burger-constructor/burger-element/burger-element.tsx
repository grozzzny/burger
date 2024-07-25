import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from '@/types'
import styles from './burger-element.module.css'

interface BurgerElementProps {
  item: Item
  isLocked: boolean
  type?: 'top' | 'bottom'
  isDrag?: boolean
}

export const BurgerElement: React.FC<BurgerElementProps> = ({ item, isLocked, type, isDrag = false }) => {
  let name = item.name
  if (type === 'top') name += ' (верх)'
  if (type === 'bottom') name += ' (низ)'
  return (
    <div className={styles.element}>
      <div className={styles.drag}>{isDrag && <DragIcon type="primary" />}</div>
      <ConstructorElement
        extraClass="ml-8"
        type={type}
        isLocked={isLocked}
        text={name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  )
}
