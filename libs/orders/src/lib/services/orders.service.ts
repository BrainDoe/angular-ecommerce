import { map, switchMap, timestamp } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { environment } from '@env/environment'
import { environment} from '../../../../../environments/environment'
import { Order } from '../model/order.model';
import { OrderItem } from '../model/orderItem.model';
import { Observable } from 'rxjs';
import { StripeService } from 'ngx-stripe'

// FAKE SESSION MODEL
export interface FakeSessionModel {
  id: string;
  payment_method_types: string[] | any;
  line_items: any;
  mode: string;
  success_url: string;
  cancel_url: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: string = environment.apiUrl + 'orders'
  productapiUrl: string = environment.apiUrl + 'products'

  constructor(private http: HttpClient, private stripeService: StripeService) { }

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

  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.productapiUrl}/${id}`)
  }

  createFakeCheckoutSession(orderItem: OrderItem[]): Observable<FakeSessionModel> {
    return this.http.post<FakeSessionModel>(`${this.apiUrl}/create-checkout-session`, orderItem);
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post(`${this.apiUrl}/create-checkout-session`, orderItem).pipe(
      //@ts-ignore
      switchMap((session: {id: string}) => {
        return this.stripeService.redirectToCheckout({sessionId: session.id})
      })
    )
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order))
  }

  getCachedOrderData(): Order {
    return JSON.parse(localStorage.getItem('orderData')!)
  }

  removeCachedOrderData() {
    localStorage.removeItem('orderData');
  }

}
