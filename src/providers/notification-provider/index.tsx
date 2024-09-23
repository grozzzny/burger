import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { Notification } from '@/components'
import { NotificationType } from '@/types'

interface NotificationConfig {
  type: NotificationType
  message: string
}

interface NotificationContextProps {
  notify: (type: NotificationType, message: string) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationConfig | null>(null)

  const notify = useCallback((type: NotificationType, message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
