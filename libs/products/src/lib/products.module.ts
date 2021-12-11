import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersModule } from './../../../orders/src/lib/orders.module';
import { UixModule } from './../../../uix/src/lib/uix.module';

// Components
import { SearchComponent } from './components/search/search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

// Primeng Modules
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';


const productsRoutes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'category/:categoryId', component: ProductsListComponent },
  { path: 'product/:productId', component: ProductDetailsComponent },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(productsRoutes), FormsModule, OrdersModule, UixModule, ButtonModule, CheckboxModule, RatingModule, InputNumberModule],
  declarations: [
    SearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  exports: [SearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductDetailsComponent]
})
export class ProductsModule {}
