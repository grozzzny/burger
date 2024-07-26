import React, { ReactNode } from 'react'
import styles from './index.module.css'

interface ModalOverlayProps {
  children: ReactNode
  onClose: () => void
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose }) => {
  return (
    <div className={`${styles.modalOverlay}`} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
