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
            <NavLink to="/" className={`${styles.navItem} ${styles.navItemActive} text text_type_main-default mr-2`}>
              <BurgerIcon type="primary" /> Конструктор
            </NavLink>
            <NavLink to="/orders" className={`${styles.navItem} text text_type_main-default text_color_inactive mr-a`}>
              <ListIcon type="secondary" /> Лента заказов
            </NavLink>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.rightButtons}>
            <NavLink to="/profile" className={`${styles.navItem} text text_type_main-default text_color_inactive ml-a`}>
              <ProfileIcon type="secondary" /> Личный кабинет
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
