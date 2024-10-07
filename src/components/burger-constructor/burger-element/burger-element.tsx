import React, { CSSProperties, RefObject } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '@/types'
import styles from './burger-element.module.css'
import withDrag from './with-drag'

export interface BurgerElementProps {
  item: Ingredient
  isLocked: boolean
  type?: 'top' | 'bottom'
  isDrag?: boolean
  style?: CSSProperties
  refItem?: RefObject<HTMLDivElement>
  handleClose?: () => void
}

export const BurgerElement: React.FC<BurgerElementProps> = ({
  refItem,
  item,
  isLocked,
  type,
  style,
  isDrag = false,
  handleClose
}) => {
  let name = item.name
  if (type === 'top') name += ' (верх)'
  if (type === 'bottom') name += ' (низ)'
  return (
    <div data-cy={type} ref={refItem} style={style} className={styles.element}>
      <div className={styles.drag}>{isDrag && <DragIcon type="primary" />}</div>
      <ConstructorElement
        extraClass="ml-8"
        type={type}
        isLocked={isLocked}
        handleClose={handleClose}
        text={name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  )
}

export const BurgerElementWithDrag = withDrag(BurgerElement)
