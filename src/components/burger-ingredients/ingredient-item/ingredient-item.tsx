import React, { useState } from 'react'
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Item } from '@/types'
import { IngredientDetails, Modal } from '@/components'

interface IngredientItemProps {
  item: Item
  count?: number
}

export const IngredientItem: React.FC<IngredientItemProps> = ({ item, count }) => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <div className={styles.card} onClick={() => setVisible(true)}>
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
