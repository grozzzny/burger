import React, { useMemo } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem, IngredientsGroup } from '@/components'
import { ITEM_MAIN_NAME } from '@/constants'
import { Item } from '@/types'

enum Tabs {
  Buns = 'buns',
  Sauces = 'sauces',
  Fillings = 'fillings'
}

interface BurgerIngredientsProps {
  items: Item[]
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ items }) => {
  const [current, setCurrent] = React.useState<Tabs>(Tabs.Buns)
  const itemsBun = useMemo(() => items.filter((item) => item.type === 'bun').slice(0, 2), [items])
  const itemsSauce = useMemo(() => items.filter((item) => item.type === 'sauce').slice(0, 2), [items])
  const itemsMain = useMemo(() => items.filter((item) => item.type === 'main').slice(0, 4), [items])
  return (
    <div className={styles.content}>
      <div className={styles.fixedBlock}>
        <h2 className={`${styles.heading} text text_type_main-large mb-5`}>Соберите бургер</h2>
        <div className={styles.tabs}>
          <Tab value={Tabs.Buns} active={current === Tabs.Buns} onClick={(value) => setCurrent(value as Tabs)}>
            Булки
          </Tab>
          <Tab value={Tabs.Sauces} active={current === Tabs.Sauces} onClick={(value) => setCurrent(value as Tabs)}>
            Соусы
          </Tab>
          <Tab value={Tabs.Fillings} active={current === Tabs.Fillings} onClick={(value) => setCurrent(value as Tabs)}>
            Начинки
          </Tab>
        </div>
      </div>
      <div className={styles.scrollableBlock}>
        <IngredientsGroup label={'Булки'}>
          {itemsBun.map((item) => (
            <IngredientItem count={item._id === ITEM_MAIN_NAME ? 1 : undefined} key={item._id} item={item} />
          ))}
        </IngredientsGroup>
        <IngredientsGroup label={'Соусы'}>
          {itemsSauce.map((item) => (
            <IngredientItem key={item._id} item={item} />
          ))}
        </IngredientsGroup>
        <IngredientsGroup label={'Начинки'}>
          {itemsMain.map((item) => (
            <IngredientItem key={item._id} item={item} />
          ))}
        </IngredientsGroup>
      </div>
    </div>
  )
}
