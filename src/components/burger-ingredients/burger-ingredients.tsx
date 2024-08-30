import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientDetails, IngredientItem, IngredientsGroup, Loading, Modal } from '@/components'
import { Ingredient } from '@/types'
import { useNotification } from '@/providers/notification-provider'
import { useDispatch, useSelector } from '@/services/store'
import { getBunIngredients, getMainIngredients, getSauceIngredients } from '@/services/ingredients/reducer'
import { loadIngredients } from '@/services/ingredients/actions'
import { getBun, getIngredients } from '@/services/burger-constructor/reducer'
import { selectIngredient } from '@/services/selected-ingredient/reducer'

export enum TabEnum {
  Buns = 'buns',
  Sauces = 'sauces',
  Fillings = 'fillings'
}

interface BurgerIngredientsProps {}

const labels: Record<TabEnum, string> = {
  [TabEnum.Buns]: 'Булки',
  [TabEnum.Sauces]: 'Соусы',
  [TabEnum.Fillings]: 'Начинки'
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = () => {
  const [current, setCurrent] = React.useState<TabEnum>(TabEnum.Buns)
  const item = window.history.state.item
  const { notify } = useNotification()
  const dispatch = useDispatch()
  const ingredients = useSelector(getIngredients)
  const bun = useSelector(getBun)
  const { loading, error } = useSelector((state) => state.ingredients)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if (item) setVisible(true)
    dispatch(loadIngredients())
  }, [])

  useEffect(() => {
    if (error) notify('error', error)
  }, [error, notify])

  const refs: Record<TabEnum, RefObject<HTMLDivElement>> = {
    [TabEnum.Buns]: useRef<HTMLDivElement>(null),
    [TabEnum.Sauces]: useRef<HTMLDivElement>(null),
    [TabEnum.Fillings]: useRef<HTMLDivElement>(null)
  }

  const itemsSort: Record<TabEnum, Ingredient[]> = {
    [TabEnum.Buns]: useSelector(getBunIngredients),
    [TabEnum.Sauces]: useSelector(getSauceIngredients),
    [TabEnum.Fillings]: useSelector(getMainIngredients)
  }

  const onTabClick = useCallback((tab: string) => {
    setCurrent(tab as TabEnum)
    refs[tab as TabEnum].current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    Object.values(refs).forEach((ref) => {
      const tabTop = ref.current?.getBoundingClientRect().top!
      if (scrollTop > tabTop - 30) {
        const tab = ref.current?.getAttribute('data-tab') as TabEnum
        setCurrent(tab)
      }
    })
  }, [])

  const counts: Record<string, number> = useMemo(() => {
    const ingredientCounts: Record<string, number> = {}
    if (bun) ingredientCounts[bun._id] = 2
    ingredients.forEach((ingredient) => {
      if (ingredientCounts[ingredient._id]) {
        ingredientCounts[ingredient._id] += 1
      } else {
        ingredientCounts[ingredient._id] = 1
      }
    })
    return ingredientCounts
  }, [ingredients, bun])

  const toggleModal = useCallback((item: Ingredient | null) => {
    if (item) {
      setVisible(true)
      window.history.replaceState({ item: item }, '', `/ingredients/${item._id}`)
      dispatch(selectIngredient(item))
    } else {
      setVisible(false)
      window.history.replaceState({ item: null }, '', `/`)
      dispatch(selectIngredient(null))
    }
  }, [])

  if (loading || error) return <Loading />

  return (
    <>
      <div className={styles.content}>
        <div className={styles.fixedBlock}>
          <h2 className={`${styles.heading} text text_type_main-large mb-5`}>Соберите бургер</h2>
          <div className={styles.tabs}>
            {Object.keys(refs).map((tab) => (
              <Tab key={tab} value={tab} active={current === tab} onClick={onTabClick}>
                {labels[tab as TabEnum]}
              </Tab>
            ))}
          </div>
        </div>
        <div className={styles.scrollableBlock} onScroll={handleScroll}>
          {Object.entries(refs).map(([tab, ref]) => (
            <IngredientsGroup key={tab} tab={tab as TabEnum} refSection={ref} label={labels[tab as TabEnum]}>
              {itemsSort[tab as TabEnum].map((item) => (
                <IngredientItem toggleModal={toggleModal} count={counts[item._id]} key={item._id} item={item} />
              ))}
            </IngredientsGroup>
          ))}
        </div>
      </div>
      {visible && (
        <Modal onClose={() => toggleModal(null)}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  )
}
