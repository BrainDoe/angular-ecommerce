import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../model/cart.model';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initLocalStorage() {
    const cart: Cart = this.getCart()
    if(!cart) {

      const initialCart = {
        items: []
      }
  
      const cartJson = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY,  cartJson)
    }
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY)!;
    const cart: Cart = JSON.parse(cartJsonString)
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId)
    if(cartItemExist) {
      cart.items?.map((item) => {
        if(item.productId === cartItem.productId) {
          if(updateCartItem) {
            item.quantity = cartItem.quantity
          } else {
            item.quantity = item.quantity + cartItem.quantity
          }
        }
      })
    } else {
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJson)
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart()
    const newCart = cart.items.filter(item => item.productId !== productId)
    
    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }

  emptyCart() {
    const initialCart = {
      items: []
    }
    localStorage.setItem(CART_KEY, JSON.stringify(initialCart))
    this.cart$.next(initialCart);
  }
}
