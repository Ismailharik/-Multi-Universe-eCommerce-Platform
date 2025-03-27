export interface IReclamation{
    id: number
    fullName:string
    email:string
    phone:string
    message:string
    answered:boolean
}

export interface IReclamationsPage{
    reclamations:IReclamation[]
    page:number;
    size:number;
    first:boolean;
    last:boolean;
    totalPages:number;
}