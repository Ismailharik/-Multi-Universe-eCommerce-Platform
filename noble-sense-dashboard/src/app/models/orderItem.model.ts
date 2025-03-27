import { IProduct } from "./product.model";

export interface OrderItem{
    id: number,
    totalPrice:number,
    quantity: number,
    product:IProduct,
    priority:number

}