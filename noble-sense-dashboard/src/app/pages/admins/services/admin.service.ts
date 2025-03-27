import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserPage } from 'src/app/models/userPage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl =environment.host+ "/api/v1/admins";
  private registerUrl = environment.host+ "/api/v1/register-users";
  constructor(private http: HttpClient) { }

  public findAllAdmins(page: number, size: number): Observable<UserPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<UserPage>(this.apiUrl, { params });
  }


  addAdmin(user:User):Observable<User>{
    return this.http.post<User>(this.registerUrl,user);
  }
  deleteAdmin(userId: string):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`)
  }
  updateAdmin(admin: User):Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${admin.id}`,admin)
  }

}
