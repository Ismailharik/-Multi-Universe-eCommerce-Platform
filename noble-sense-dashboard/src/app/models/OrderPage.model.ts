import { Order } from "./order.model";
import { User } from "./user.model";
export interface OrderPage{
    id:number,
    orders:Order[]
    totalPages: number,
    page: number,
    size: number,
    first: boolean,
    last: boolean
}