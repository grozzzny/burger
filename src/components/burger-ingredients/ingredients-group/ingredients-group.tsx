import React, { ReactNode, RefObject } from 'react'
import styles from './ingredients-group.module.css'
import { TabEnum } from '@/components/burger-ingredients/burger-ingredients'

interface IngredientsGroupProps {
  tab: TabEnum
  children?: ReactNode
  label: string
  refSection?: RefObject<HTMLDivElement>
}

export const IngredientsGroup: React.FC<IngredientsGroupProps> = ({ tab, children, label, refSection }) => {
  return (
    <section ref={refSection} data-tab={tab}>
      <h3 className={'text text_type_main-medium'}>{label}</h3>
      <div className={`${styles.items} pt-6 pb-10 pl-4`}>{children}</div>
    </section>
  )
}
