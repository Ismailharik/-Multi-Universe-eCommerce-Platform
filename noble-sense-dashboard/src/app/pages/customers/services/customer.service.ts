import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  User } from 'src/app/models/user.model';
import { UserPage } from 'src/app/models/userPage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private apiUrl = environment.host + "/api/v1/customers";
  private registerUrl = environment.host + "/api/v1/register-users";
  constructor(private http: HttpClient) { }


  public findAllCustomers(page: number, size: number): Observable<UserPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<UserPage>(this.apiUrl, { params });
  }

  findByName(keyword: string, page: number, size: number): Observable<UserPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('keyword', keyword);

    return this.http.get<UserPage>(`${this.apiUrl}/search`, { params });
  }
  addCustomer(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }
  deleteCustomer(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`)
  }
  updateCustomer(customer: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${customer.id}`, customer)
  }
  changeCustomerPassword(phone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { phone, password },{ responseType: 'text' })
  }


}
