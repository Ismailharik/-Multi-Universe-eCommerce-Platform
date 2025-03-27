type IReview = {
  user?:string;
  name:string;
  email:string;
  rating:number;
  review:string;
  date:string;
}
export interface IProduct {
  id: number;
  sku: string;
  title: string;
  // slug: string;
  unit: string;
  imageURLs: string[];
  parent: string;
  price: number;
  discount: number;
  quantity: number;
  brand: string;
  status: string;
  // reviews?: IReview[];
  productType: string;
  description: string;
  additionalInformation:any
  sizes?: any;
  featured: boolean;
  sellCount: number;
  offerDate?: {
    startDate: string;
    endDate: string;
  };
  tags?: string[];
  videoId?: string;
  categoryId: number;
  orderQuantity?: number;
}
export interface ProductPage{
  totalPages:number
  page:number
  size:number
  first:boolean
  last:boolean
  products:IProduct[]
} 