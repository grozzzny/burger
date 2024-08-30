import React from 'react'
import styles from '@/app.module.css'
import { Link } from 'react-router-dom'
import { ResetForm } from '@/components/form'
import withProtection from '@/pages/with-protection'
import { getNotForbidden } from '@/utils/local-storage-helper'
import { Error } from '@/components'

export const ResetPasswordPage: React.FC = () => {
  if(!getNotForbidden()) return <Error code={403} label={'Доступ запрещен'}/>
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <div className={`mb-20`}>
          <ResetForm/>
        </div>
        <div className={styles.authFooter}>
          <p className={'text text_type_main-default'}>
            Вспомнили пароль?
            <Link to='/login'>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export const ResetPasswordPageWithProtected = withProtection(ResetPasswordPage)
