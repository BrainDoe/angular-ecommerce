import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OrderItem } from './../../model/orderItem.model';
import { Order } from './../../model/order.model';
import { UsersService } from '@meerev/users';
import { ORDER_STATUS } from '@meerev/orders';
import { Cart } from './../../model/cart.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string | any;
  countries: any[] | any = [];

  endSubs$: Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData()
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: [''],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0, // status: Object.keys(ORDER_STATUS)[0], // ALTERNATIVELY
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        console.log('Order successfull')
        // Redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  private _autoFillUserData() {
    this.usersService.observeCurrentUser().pipe(takeUntil(this.endSubs$)).subscribe(user => {
      // console.log(user.phone)
      if(user) {
        this.userId = user.id;
        this.checkoutForm.name.setValue(user.name);
        this.checkoutForm.email.setValue(user.email);
        this.checkoutForm.phone.setValue(user.phone);
        this.checkoutForm.city.setValue(user.city);
        this.checkoutForm.street.setValue(user.street);
        this.checkoutForm.country.setValue(user.country);
        this.checkoutForm.zip.setValue(user.zip);
        this.checkoutForm.apartment.setValue(user.apartment);
      }
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
