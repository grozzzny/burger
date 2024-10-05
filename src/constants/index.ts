import { WsOrderStatus } from '@/types'

export const labelStatus: Record<WsOrderStatus, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан'
}
