import React from 'react'
import styles from '@/app.module.css'
import { Link } from 'react-router-dom'
import { RegisterForm } from '@/components/form'

export const RegisterPage: React.FC = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Регистрация
        </h1>
        <div className={`mb-20`}>
          <RegisterForm/>
        </div>
        <div className={styles.authFooter}>
          <p className={'text text_type_main-default'}>
            Уже зарегистрированы?
            <Link to='/login'>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
