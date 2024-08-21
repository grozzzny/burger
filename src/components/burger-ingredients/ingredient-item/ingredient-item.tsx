import React from 'react'
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient, TargetType } from '@/types'
import { useDrag } from 'react-dnd'
import { addIngredient, setBun } from '@/services/burger-constructor/reducer'
import { useDispatch } from '@/services/store'

interface IngredientItemProps {
  item: Ingredient
  toggleModal: (item: Ingredient | null) => void
  count?: number
}

export const IngredientItem: React.FC<IngredientItemProps> = ({ item, count, toggleModal }) => {
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: TargetType.BurgerConstructor,
    item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        if (item.type === 'bun') {
          dispatch(setBun(item))
        } else {
          dispatch(addIngredient(item))
        }
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
      <div ref={drag} style={{ opacity }} className={styles.card} onClick={() => toggleModal(item)}>
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
    </>
  )
}
