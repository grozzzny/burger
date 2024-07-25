import React from 'react'
import { BurgerIcon, Button, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export const AppHeader: React.FC = () => {
  return (
    <header>
      <div className={styles.content}>
        <div className={`${styles.menu} pt-4 pb-4`}>
          <div className={styles.leftButtons}>
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              extraClass={`${styles.navButton} ${styles.navButtonActive} mr-2`}
            >
              <BurgerIcon type="primary" /> <span className={'text text_type_main-default'}>Конструктор</span>
            </Button>
            <Button htmlType="button" type="secondary" size="small" extraClass={`${styles.navButton} mr-a`}>
              <ListIcon type="secondary" /> <span className={'text text_type_main-default'}>Лента заказов</span>
            </Button>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.rightButtons}>
            <Button htmlType="button" type="secondary" size="small" extraClass={`${styles.navButton} ml-a`}>
              <ProfileIcon type="secondary" /> <span className={'text text_type_main-default'}>Личный кабинет</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
