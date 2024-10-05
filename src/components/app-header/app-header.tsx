import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from '@/services/store'
import { getCurrentUser } from '@/services/auth/reducer'

export const AppHeader: React.FC = () => {
  const currentUser = useSelector(getCurrentUser)

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={`${styles.menu} pt-4 pb-4`}>
          <div className={styles.leftButtons}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navItem} text text_type_main-default mr-2 ${
                  isActive ? styles.navItemActive : 'text_color_inactive'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  Конструктор
                </>
              )}
            </NavLink>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `${styles.navItem} text text_type_main-default mr-a ${
                  isActive ? styles.navItemActive : 'text_color_inactive'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  Лента заказов
                </>
              )}
            </NavLink>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.rightButtons}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.navItem} text text_type_main-default ml-a ${
                  isActive ? styles.navItemActive : 'text_color_inactive'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  {currentUser ? currentUser.email : 'Личный кабинет'}
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
