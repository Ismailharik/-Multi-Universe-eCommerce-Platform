export interface ICoupon {
  id: string;
  title: string;
  logo: string;
  couponCode: string;
  endTime: string;
  discountPercentage: number;
  minimumAmount: number;
  productType: string;
}