import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { AuthGaurdService } from '@meerev/users';
import { CartService } from './services/cart.service';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';


import { ConfirmationService, MessageService } from 'primeng/api';
import { CartPageComponent } from './pages/cart-page/cart-page.component'
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';


export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent},
  { path: 'checkout', canActivate: [AuthGaurdService], component: CheckoutPageComponent},
  { path: 'success', component: ThankYouComponent},
  { path: 'payment/:session_id/:quantity/:name/:price', component: PaymentPageComponent},
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ordersRoutes), BadgeModule, ButtonModule, InputNumberModule, FormsModule, InputTextModule, DropdownModule, InputMaskModule, ReactiveFormsModule],
  providers: [],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    PaymentPageComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    PaymentPageComponent,
  ]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initLocalStorage();
  }
}
