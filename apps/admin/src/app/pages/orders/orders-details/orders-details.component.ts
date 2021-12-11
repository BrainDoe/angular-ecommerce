import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order, OrdersService } from '@meerev/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../orders-status-constants';

@Component({
  selector: 'admin-orders-details',
  templateUrl: './orders-details.component.html',
  styles: [
  ]
})
export class OrdersDetailsComponent implements OnInit {
  // order?: Order
  order?: any
  orderStatuses?: any = []
  selectedStatus? : any

  constructor(private ordersService: OrdersService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mapOrderStatuses()
    this.getOrder()
  }

  private mapOrderStatuses() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

  // this.route.params.subscribe((params: Params) => {
  //   this.id = +params['id']
  //   this.meal = this.mealsService.getMeal(this.id);

  private getOrder() {
    this.route.params.subscribe((params: Params) => {
      const paramId = params['id']
      if(paramId) {
        this.ordersService.getOrder(paramId).subscribe((order: Order) => {
          this.order = order
          console.log('this is order from subscription ', order.id)
          console.log('this. is this.order ', this.order.id)
          this.selectedStatus = order.status
        })
      }
    })
  }

  onStatusChanged(event: any) {
    this.ordersService.updateOrder({status: event.value}, this.order.id).subscribe((order: Order) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order updated!'
      })
    }, (err) => {
      this.messageService.add({
        severity: 'Error',
        summary: 'error',
        detail: 'Order not updated!'
      })
    })
  }

}
