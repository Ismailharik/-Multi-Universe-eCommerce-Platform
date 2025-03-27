import { IProduct } from "./product-type"

export interface IReview{
    fullName:string
    email:string
    starsNumber:number
    description:string
    date:string
    product?:IProduct
    approved?:boolean
}