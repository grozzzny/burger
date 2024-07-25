import React, { ReactNode } from 'react'
import styles from './ingredients-group.module.css'

interface IngredientsGroupProps {
  children?: ReactNode
  label: string
}

export const IngredientsGroup: React.FC<IngredientsGroupProps> = ({ children, label }) => {
  return (
    <section>
      <h3 className={'text text_type_main-medium'}>{label}</h3>
      <div className={`${styles.items} pt-6 pb-10 pl-4 pr-4`}>
        {children}
      </div>
    </section>
  )
}
