import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.css'
import { ModalOverlay } from '@/components'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${styles.modal} p-10 pb-15`}>
        <div className={`${styles.close}`}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('react-modals')!
  )
}
