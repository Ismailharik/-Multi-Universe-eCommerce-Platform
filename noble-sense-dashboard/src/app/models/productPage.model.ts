import { IProduct } from "./product.model";

export interface ProductPage {
    products: IProduct[];
    totalPages: number
    page: number
    size: number
    first: boolean
    last: boolean
}