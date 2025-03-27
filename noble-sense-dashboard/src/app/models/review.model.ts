import { IProduct } from './product.model';

export interface IReview {
  id: number;
  description: string;
  starsNumber: number;
  fullName: string;
  email: string;
  isApproved: boolean;
  product: IProduct;
}
