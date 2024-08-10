import React from 'react'
import styles from './app.module.css'
import { AppHeader, BurgerConstructor, BurgerIngredients } from '@/components'
import { NotificationProvider } from '@/providers/notification-provider'

const Layout: React.FC = () => {


  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </>
  )
}

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Layout />
    </NotificationProvider>
  )
}

export default App
