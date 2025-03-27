import { IOrderItem } from './orderItem-type';
import { IUser } from './user-type';

export interface IOrder {
  user: IUser;
  orderNote: string;
  address:string;
  country:string
  totalPrice: number;
  shipCost:number;


  orderItems: IOrderItem[];
  date: Date;
}
