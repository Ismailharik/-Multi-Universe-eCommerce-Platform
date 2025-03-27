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
}
