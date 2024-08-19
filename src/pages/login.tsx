import React from 'react'
import styles from '@/app.module.css'
import { LoginForm } from '@/components/form'
import { Link } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Вход
        </h1>
        <div className={`mb-20`}>
          <LoginForm/>
        </div>
        <div className={styles.authFooter}>
          <p className={'text text_type_main-default mb-4'}>
            Вы — новый пользователь?
            <Link to='/register'>Зарегистрироваться</Link>
          </p>
          <p className={'text text_type_main-default'}>
            Забыли пароль?
            <Link to='/forgot-password'>Восстановить пароль</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
