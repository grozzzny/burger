import React from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem, IngredientsGroup } from '@/components'
import data from '@/utils/data'
import { ITEM_MAIN_ID } from '@/constants'

enum Tabs {
  Buns = 'buns',
  Sauces = 'sauces',
  Fillings = 'fillings'
}

export const BurgerIngredients: React.FC = () => {
  const [current, setCurrent] = React.useState<Tabs>(Tabs.Buns)
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
          {data
            .filter((item) => item.type === 'bun')
            .slice(0, 2)
            .map((item) => (
              <IngredientItem count={item._id === ITEM_MAIN_ID ? 1 : undefined} key={item._id} item={item} />
            ))}
        </IngredientsGroup>
        <IngredientsGroup label={'Соусы'}>
          {data
            .filter((item) => item.type === 'sauce')
            .slice(0, 4)
            .map((item) => (
              <IngredientItem key={item._id} item={item} />
            ))}
        </IngredientsGroup>
        <IngredientsGroup label={'Начинки'}>
          {data
            .filter((item) => item.type === 'main')
            .slice(0, 4)
            .map((item) => (
              <IngredientItem key={item._id} item={item} />
            ))}
        </IngredientsGroup>
      </div>
    </div>
  )
}
