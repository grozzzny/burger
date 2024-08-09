import React, { useState } from 'react'
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '@/types'
import { IngredientDetails, Modal } from '@/components'
import { useDrag } from 'react-dnd'
import { DND_TARGET_TYPE_BOX } from '@/components/burger-constructor/burger-constructor'

interface IngredientItemProps {
  item: Ingredient
  count?: number
}

export const IngredientItem: React.FC<IngredientItemProps> = ({ item, count }) => {
  const [visible, setVisible] = useState<boolean>(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_TARGET_TYPE_BOX,
    item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log({ item })
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))

  const opacity = isDragging ? 0.4 : 1

  return (
    <>
      <div ref={drag} style={{ opacity }} className={styles.card} onClick={() => setVisible(true)}>
        {count && (
          <div className={styles.count}>
            <Counter count={count} size="default" />
          </div>
        )}
        <div className={`${styles.preview} ml-4 mr-4 mb-1`}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className={`${styles.price} mb-1`}>
          <span className="text text_type_digits-default">{item.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.name}>
          <span className="text text_type_main-default">{item.name}</span>
        </div>
      </div>
      {visible && (
        <Modal onClose={() => setVisible(false)}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  )
}
