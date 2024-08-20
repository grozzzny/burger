import React, { useCallback, useState } from 'react'
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient, TargetType } from '@/types'
import { IngredientDetails, Modal } from '@/components'
import { useDrag } from 'react-dnd'
import { addIngredient, setBun } from '@/services/burger-constructor/reducer'
import { useDispatch } from '@/services/store'
import { selectIngredient } from '@/services/selected-ingredient/reducer'

interface IngredientItemProps {
  item: Ingredient
  count?: number
}

export const IngredientItem: React.FC<IngredientItemProps> = ({ item, count }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const toggleModal = useCallback((open: boolean) => {
    if (open) {
      setVisible(true)
      window.history.replaceState({}, '', `/ingredients/${item._id}`)
      dispatch(selectIngredient(item))
    } else {
      setVisible(false)
      window.history.replaceState({}, '', `/`)
      dispatch(selectIngredient(null))
    }
  }, [])

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
      <div ref={drag} style={{ opacity }} className={styles.card} onClick={() => toggleModal(true)}>
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
        <Modal onClose={() => toggleModal(false)}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  )
}
