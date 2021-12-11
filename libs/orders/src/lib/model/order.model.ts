import { User } from '@meerev/users'
import { OrderItem } from './orderItem.model'

export class Order {
  id?: string
  orderItems?: OrderItem[] | any
  shippingAddress1?: string
  shippingAddress2?: string
  city?: string
  zip?: string
  country?: string
  phone?: string
  status: string | any
  totalPrice?: string
  user?: User | any
  dateOrdered?: string
}
