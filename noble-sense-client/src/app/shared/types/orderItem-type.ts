import { IOrder } from "./order-type";
import { IProduct } from "./product-type";

export interface IOrderItem{
    id?:number;
    totalPrice:number;
    quantity:number;
    product:IProduct;
    order?:IOrder
}