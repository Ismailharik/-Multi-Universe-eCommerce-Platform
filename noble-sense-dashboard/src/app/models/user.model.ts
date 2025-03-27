// this should be deleted
export interface User {

    active: boolean;
    id:string;
    fullName: string;
    phone: string;
    email: string;
    address:string;
    role?:string
    password: string;
}
export enum Role {
    USER = "USER", ADMIN = "ADMIN"
}
