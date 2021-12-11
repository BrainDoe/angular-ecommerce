import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { environment } from '@env/environment'
import { environment} from '../../../../../environments/environment'
import { Order } from '@meerev/orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: string = environment.apiUrl + 'orders'
  productapiUrl: string = environment.apiUrl + 'products'

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl)
  }

  getOrder(id: Order): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}/${id}`)
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order)
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, orderStatus)
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  getProduct(id: string): Observable<any>{
    return this.http.get<any>(`${this.productapiUrl}/${id}`)
  }
}
