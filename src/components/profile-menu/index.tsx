import React from 'react'
import styles from './index.module.css'
import { NavLink } from 'react-router-dom'

export interface ProfileMenuProps {}

export const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  return (
    <ul className={`${styles.profileMenu} mb-20`}>
      <li>
        <NavLink to={`/profile`} className={`text text_type_main-medium`}>Профиль</NavLink>
      </li>
      <li>
        <NavLink to={`/profile/orders`} className={`text text_type_main-medium`}>История заказов</NavLink>
      </li>
      <li>
        <NavLink to={`/logout`} className={`text text_type_main-medium`}>Выход</NavLink>
      </li>
    </ul>
  )
}
