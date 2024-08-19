import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink } from 'react-router-dom'

export const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={`${styles.menu} pt-4 pb-4`}>
          <div className={styles.leftButtons}>
            <a href="#" className={`${styles.navItem} ${styles.navItemActive} mr-2`}>
              <BurgerIcon type="primary" /> <span className={'text text_type_main-default'}>Конструктор</span>
            </a>
            <a href="#" className={`${styles.navItem} mr-a`}>
              <ListIcon type="secondary" /> <span className={'text text_type_main-default'}>Лента заказов</span>
            </a>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.rightButtons}>
            <NavLink to="/profile" className={`${styles.navItem} ml-a`}>
              <ProfileIcon type="secondary" /> <span className={'text text_type_main-default'}>Личный кабинет</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
