import { User } from "./user.model"

// this should be deleted
export interface UserPage {
    first:boolean
    last:boolean
    page:number
    size:number
    totalPages:number
    users:User[]

}
export enum Role {
    USER, ADMIN, MANAGER
}