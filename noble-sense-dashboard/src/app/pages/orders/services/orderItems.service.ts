import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderItemsService {
  private apiBaseUrl = environment.host + '/api/v1/order-items';

  constructor(private http: HttpClient) {}
  public getProductCounts(startDate: Date, endDate: Date): Observable<Map<string, number>> {
    const start = new Date(startDate);
    start.setDate(start.getDate() + 1);

    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const params = new HttpParams()
      .set('startDate', start.toISOString().split('T')[0])
      .set('endDate', end.toISOString().split('T')[0]);
      
    return this.http.get<Map<string, number>>(`${this.apiBaseUrl}/product-count`, { params });
  }
}
