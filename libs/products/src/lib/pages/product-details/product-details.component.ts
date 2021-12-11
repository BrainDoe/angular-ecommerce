import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '@meerev/orders';
import { Product, ProductsService } from '@meerev/products';
import { CartItem } from './../../../../../orders/src/lib/model/cart.model';


@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  quantity: number = 1;
  endSubs$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService, private routes: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.routes.params.subscribe((params: Params) => {
      if(params.productId) {
        this._getProduct(params.productId)
      }
    })
  }

  private _getProduct(id: string) {
    this.productsService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe((product: Product) => {
      this.product = product;
      console.log(this.product);
    })
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartItem)
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
