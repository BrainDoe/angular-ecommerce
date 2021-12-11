import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ConfirmationService, MessageService } from 'primeng/api';

import { OrdersService, Order } from '@meerev/orders'

import { ORDER_STATUS } from '../orders-status-constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})

export class OrdersListComponent implements OnInit {
  orders: Order[] = []
  orderStatus = ORDER_STATUS

  constructor(private ordersService: OrdersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrders()
  }

  private getOrders() {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders
      // console.log(this.orders)
    })
  }

  deleteOrder(id: string) {
    // Confirm deletion
    this.confirmationService.confirm({
      message: "Are You sure?",
      header: "Delete Order",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.ordersService.deleteOrder(id).subscribe(response => {
          this.getOrders()
    
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order deleted' })
    
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order not deleted' })
        })
      },
      reject: () => {}
    })
  }

  orderDetail(id: string) {
    this.router.navigateByUrl(`order-details/${id}`)
  }

}
