import React, { RefObject, useCallback, useEffect, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem, IngredientsGroup, Loading } from '@/components'
import { Ingredient } from '@/types'
import { useNotification } from '@/providers/notification-provider'
import { useDispatch, useSelector } from '@/services/store'
import { getBunIngredients, getMainIngredients, getSauceIngredients } from '@/services/ingredients/reducer'
import { loadIngredients } from '@/services/ingredients/actions'

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
  const { notify } = useNotification()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.ingredients)

  useEffect(() => {
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

  if (loading || error) return <Loading />

  return (
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
              <IngredientItem key={item._id} item={item} />
            ))}
          </IngredientsGroup>
        ))}
      </div>
    </div>
  )
}
