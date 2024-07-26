import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.css'
import { NotificationType } from '@/types'

interface NotificationProps {
  type: NotificationType
  message: string
}

export const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  return ReactDOM.createPortal(
    <div className={`${styles.notification} ${styles[type]}`}>
      <p className="text text_type_main-medium">{message}</p>
    </div>,
    document.getElementById('react-notifications')!
  )
}
