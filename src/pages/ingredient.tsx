import React, { useEffect } from 'react'
import styles from '@/app.module.css'
import { IngredientDetails, Loading, NotFound } from '@/components'
import { useDispatch, useSelector } from '@/services/store'
import { getIngredient } from '@/services/ingredients/reducer'
import { loadIngredients } from '@/services/ingredients/actions'
import { useNotification } from '@/providers/notification-provider'
import { useParams } from 'react-router-dom'

export const IngredientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { notify } = useNotification()
  const dispatch = useDispatch()
  const ingredient = useSelector((state) => getIngredient(state, id!))

  const { loading, error } = useSelector((state) => state.ingredients)

  useEffect(() => {
    dispatch(loadIngredients())
  }, [])

  useEffect(() => {
    if (error) notify('error', error)
  }, [error, notify])

  if (loading || error) return <Loading />

  if (!ingredient) return <NotFound label='Ингредиент не найден'/>

  return (
    <div className={styles.ingredientContainer}>
      <div className={styles.ingredientContent}>
        <IngredientDetails item={ingredient} />
      </div>
    </div>
  )
}
