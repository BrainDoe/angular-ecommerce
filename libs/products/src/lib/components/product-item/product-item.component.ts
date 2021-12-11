import { Component, Input, OnInit } from '@angular/core';

import { Product } from '@meerev/products';
import { CartService, CartItem } from '@meerev/orders';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'products-products-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product

  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id!,
      quantity: 1
    }

    this.cartService.setCartItem(cartItem)
  }

}

