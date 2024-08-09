import React, { RefObject, useCallback, useMemo, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem, IngredientsGroup } from '@/components'
import { Item } from '@/types'

export enum TabEnum {
  Buns = 'buns',
  Sauces = 'sauces',
  Fillings = 'fillings'
}

interface BurgerIngredientsProps {
  items: Item[]
}

const labels: Record<TabEnum, string> = {
  [TabEnum.Buns]: 'Булки',
  [TabEnum.Sauces]: 'Соусы',
  [TabEnum.Fillings]: 'Начинки'
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ items }) => {
  const [current, setCurrent] = React.useState<TabEnum>(TabEnum.Buns)

  const refs: Record<TabEnum, RefObject<HTMLDivElement>> = {
    [TabEnum.Buns]: useRef<HTMLDivElement>(null),
    [TabEnum.Sauces]: useRef<HTMLDivElement>(null),
    [TabEnum.Fillings]: useRef<HTMLDivElement>(null)
  }

  const itemsSort: Record<TabEnum, Item[]> = useMemo(() => {
    return {
      [TabEnum.Buns]: items.filter((item) => item.type === 'bun'),
      [TabEnum.Sauces]: items.filter((item) => item.type === 'sauce'),
      [TabEnum.Fillings]: items.filter((item) => item.type === 'main')
    }
  }, [items])

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
