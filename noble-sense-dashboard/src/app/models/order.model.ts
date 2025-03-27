import { OrderItem } from "./orderItem.model";
import { User } from "./user.model";

export interface Order {
  id?:string
  user: User;
  orderNote: string;
  address:string;
  country:string;
  totalPrice: number;
  shipCost:number;


  orderItems: OrderItem[];
  date: Date;

    orderStatus: OrderStatus;
  }
  

export enum OrderStatus {
    CREATED="CREATED", 
    PROCESSING="PROCESSING", 
    COMPLETED="COMPLETED"
}