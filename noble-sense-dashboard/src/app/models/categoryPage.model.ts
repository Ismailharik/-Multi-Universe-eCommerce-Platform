import { ICategory } from "./category.model";

export interface CategoryPage{
    categories: ICategory[];
    totalPages: number
    page: number
    size: number
    first: boolean
    last: boolean
}