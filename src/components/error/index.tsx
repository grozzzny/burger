import React from 'react'
import styles from './index.module.css'

export interface NotFoundProps {
  label?: string
  code?: number
}

export const Error: React.FC<NotFoundProps> = ({ label = 'Страница не найдена', code = 404 }) => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className='text text_type_digits-large mb-15'>{code}</h1>
      <p className='text text_type_main-large text_color_inactive'>{label}</p>
    </div>
  )
}
