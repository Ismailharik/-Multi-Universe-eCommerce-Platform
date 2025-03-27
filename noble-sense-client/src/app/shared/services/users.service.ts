import { IUser } from '@/types/user-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
export class UsersService{
    private baseUrl = environment.host +"/api/v1/register-users"
    constructor(private http:HttpClient){}

    public saveUserInformations(user:IUser){
        return this.http.post<IUser>(this.baseUrl,user )
    }
}