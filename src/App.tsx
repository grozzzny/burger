import React from 'react'
import styles from './app.module.css'
import { AppHeader, BurgerConstructor, BurgerIngredients } from '@/components'

const App: React.FC = () => {
  return (
    <>
      <AppHeader/>
      <main>
        <div className={styles.container}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </div>
      </main>
    </>
  )
}

export default App
