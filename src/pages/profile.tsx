import React from 'react'
import styles from '@/app.module.css'
import { NavLink } from 'react-router-dom'
import withProtection from '@/pages/with-protection'
import { ProfileForm } from '@/components/form'

export const ProfilePage: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileLeftSide} mr-15`}>
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
        <div className={styles.profileFooter}>
          <p className={'text text_type_main-default text_color_inactive'}>В этом разделе вы можете<br/> изменить свои персональные данные</p>
        </div>
      </div>
      <div className={styles.profileRightSide}>
        <ProfileForm />
      </div>
    </div>
  )
}

export const ProfilePageWithProtected = withProtection(ProfilePage)
