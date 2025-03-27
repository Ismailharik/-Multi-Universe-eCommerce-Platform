export interface IUser{
    id?:string;
    fullName: string;
    phone: string;
    email: string;
    address:string;
    role?:string;
    active?:boolean;
}