import React, { useEffect, useState } from 'react'
import styles from './app.module.css'
import { AppHeader, BurgerConstructor, BurgerIngredients, Loading } from '@/components'
import IngredientsApi from '@/api/IngredientsApi'
import { Item } from '@/types'
import { NotificationProvider, useNotification } from '@/providers/notification-provider'

const Layout: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { notify } = useNotification()

  useEffect(() => {
    setLoading(true)
    new IngredientsApi()
      .fetchItems()
      .then((data) => {
        setItems(data)
      })
      .catch((err) => {
        console.error(err)
        notify('error', err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.container}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <BurgerIngredients items={items} />
              <BurgerConstructor items={items} />
            </>
          )}
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
