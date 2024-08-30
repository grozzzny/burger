import React from 'react'
import styles from '@/app.module.css'
import withProtection from '@/pages/with-protection'
import { ProfileForm } from '@/components/form'
import { ProfileMenu } from '@/components'

export const ProfilePage: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileLeftSide} mr-15`}>
        <ProfileMenu/>
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
