import { Component, OnInit } from '@angular/core';

import { CartService } from '@meerev/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'meerev-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private cartService: CartService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      });
    });
  }

}
