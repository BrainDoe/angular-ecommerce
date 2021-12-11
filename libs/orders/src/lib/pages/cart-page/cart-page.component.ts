import {  Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrdersService, CartService } from '@meerev/orders';
import { CartItemDetailed } from './../../model/cart.model';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemDetailed: CartItemDetailed[] = [];
  cartCount: number = 0;

  endSubs$: Subject<any> = new Subject();

  constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.cartItemDetailed = [];
      this.cartCount = cart.items.length ?? 0;
      cart.items.forEach(cartItem => {
        this.ordersService.getProduct(cartItem.productId).subscribe(product => {
          this.cartItemDetailed.push({
            product: product,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  updateCateItemQuantity(event: any, cartItem: CartItemDetailed) {
    console.log(event.value)
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }

}
