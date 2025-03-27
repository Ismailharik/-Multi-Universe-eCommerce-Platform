import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderPage } from 'src/app/models/OrderPage.model';
import { OrderStatusCount } from 'src/app/models/order-status-count.model';
import { Order, OrderStatus } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiBaseUrl = environment.host + '/api/v1/orders';

  constructor(private http: HttpClient) {}

  findAllOrders(page: number, size: number): Observable<OrderPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<OrderPage>(this.apiBaseUrl, { params });
  }
  /*
    this api search by order status and sort data by date then by primaryOrder
  */
  findAllOrdersByStatus(
    page: number,
    size: number,
    orderStatus: OrderStatus
  ): Observable<OrderPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<OrderPage>(
      `${this.apiBaseUrl}/status/${orderStatus}`,
      { params }
    );
  }
  findOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiBaseUrl}/${orderId}`);
  }
  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }
  updateOrder(orderId: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiBaseUrl}/${orderId}`, order);
  }

  // this api used to count orders in a date range, and orderStatus
  ordersAnalysis(
    startDate: Date,
    endDate: Date
  ): Observable<OrderStatusCount[]> {
    const start = new Date(startDate);
    start.setDate(start.getDate() + 1);

    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const params = new HttpParams()
      .set('startDate', start.toISOString().split('T')[0])
      .set('endDate', end.toISOString().split('T')[0]);
    return this.http.get<OrderStatusCount[]>(`${this.apiBaseUrl}/count`, {
      params,
    });
  }
  filterOrdersByDateAndStatus(
    page: number,
    size: number,
    startDate: Date,
    endDate: Date,
    orderStatus: OrderStatus
  ): Observable<OrderPage> {
    const start = new Date(startDate);
    start.setDate(start.getDate() + 1);

    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    console.log(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('startDate', start.toISOString().split('T')[0])
      .set('endDate', end.toISOString().split('T')[0])
      .set('status', orderStatus);

    return this.http.get<OrderPage>(`${this.apiBaseUrl}/filter`, { params });
  }

  getOrderSummaryByDishPrice(startDate: Date, endDate: Date): Observable<any> {
    const start = new Date(startDate);
    start.setDate(start.getDate() + 1);

    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const params = new HttpParams()
      .set('startDate', start.toISOString().split('T')[0])
      .set('endDate', end.toISOString().split('T')[0]);
    return this.http.get<any>(`${this.apiBaseUrl}/summary-by-dish-price`, { params });
  }
}
