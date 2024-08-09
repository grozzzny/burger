import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { BurgerElementProps } from './burger-element'
import { useDrag } from 'react-dnd'

interface WithDragProps {
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ITEM_TYPE_CARD = 'card'

const withDrag = <P extends BurgerElementProps>(Component: React.ComponentType<P>) => {
  return (props: P & WithDragProps) => {
    const { moveCard, index } = props
    const ref = useRef<HTMLDivElement>(null)
    const [{}, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
      accept: ITEM_TYPE_CARD,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        }
      },
      hover(item: DragItem, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index

        // Don't replace items with themselves
        if (!hoverIndex || dragIndex === hoverIndex) {
          return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }

        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      }
    })

    const [{ isDragging }, drag] = useDrag({
      type: ITEM_TYPE_CARD,
      item: () => {
        return { id: props.item._id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return <Component refItem={ref} style={{ opacity }} isDrag={true} {...props}  />
  }
}

export default withDrag
