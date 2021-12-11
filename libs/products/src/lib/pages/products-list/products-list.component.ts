import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product, ProductsService, CategoriesService, Category } from '@meerev/products';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsCategories: Category[] = [];
  isCategoryPage!: boolean;

  endSubs$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
      params.categoryId ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    // this._getProducts();
    this._getProductsCategories();
  }

  private _getProducts(categoriesFilter?: any[]) {
    this.productsService.getProducts(categoriesFilter).pipe(takeUntil(this.endSubs$)).subscribe((products: Product[]) => {
      this.products = products
    })
  }

  private _getProductsCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((categories: Category[]) => {
      this.productsCategories = categories;
    })
  }

  categoryFilter() {
    const selectedCategories = this.productsCategories
      .filter((category: Category) => category.checked)
      .map(category => category.id)
    // console.log(selectedCategories)
    this._getProducts(selectedCategories)
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
