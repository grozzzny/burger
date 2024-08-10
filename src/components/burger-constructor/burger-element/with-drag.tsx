import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { BurgerElementProps } from './burger-element'
import { useDrag } from 'react-dnd'
import { TargetType } from '@/types'

interface WithDragProps {
  index: number
  moveElement: (dragIndex: number, hoverIndex: number) => void
  removeElement: (key: string) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const withDrag = <P extends BurgerElementProps>(Component: React.ComponentType<P>) => {
  return (props: P & WithDragProps) => {
    const { moveElement, index, removeElement } = props
    const ref = useRef<HTMLDivElement>(null)

    const [{}, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
      accept: TargetType.SortIngredient,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        }
      },
      hover(item: DragItem, monitor) {
        if (!ref.current) return
        const dragIndex = item.index
        const hoverIndex = index
        if (!hoverIndex || dragIndex === hoverIndex) return
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
        moveElement(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    })

    const [{ isDragging }, drag] = useDrag({
      type: TargetType.SortIngredient,
      item: () => {
        return { id: props.item._id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
      <Component
        handleClose={() => removeElement(props.item.key!)}
        refItem={ref}
        style={{ opacity }}
        isDrag={true}
        {...props}
      />
    )
  }
}

export default withDrag
