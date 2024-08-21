import React from 'react'
import styles from './index.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useNotification } from '@/providers/notification-provider'
import { useDispatch } from '@/services/store'
import { logout } from '@/services/auth/actions'

export interface ProfileMenuProps {}

export const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { notify } = useNotification()

  const handleLogout = async () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        notify('success', 'Вы успешно вышли из системы!')
        navigate('/login')
      })
      .catch((err) => {
        notify('error', err)
      })
  }

  return (
    <ul className={`${styles.profileMenu} mb-20`}>
      <li>
        <NavLink
          to={`/profile`}
          end={true}
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? styles.profileMenuActive : 'text_color_inactive'}`
          }
        >
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/profile/orders`}
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? styles.profileMenuActive : 'text_color_inactive'}`
          }
        >
          История заказов
        </NavLink>
      </li>
      <li>
        <Link to="#" onClick={handleLogout} className={`text text_type_main-medium text_color_inactive`}>
          Выйти
        </Link>
      </li>
    </ul>
  )
}
