import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product, ProductsService } from '@meerev/products';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSub$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
    this.productsService.getFeaturedProducts(4).pipe(takeUntil(this.endSub$)).subscribe((featuredProducts) => {
      this.featuredProducts = featuredProducts;
    })
  }

  ngOnDestroy(): void {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
