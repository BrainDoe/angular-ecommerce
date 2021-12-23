import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  productName!: string;
  productPrice!: number;
  productQuantity!: number

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productName = params['name'];
      this.productPrice = +params['price'];
      this.productQuantity = +params['quantity'];
    })
  }

  successPage() {
    this.router.navigate(['/success']);
  }

}
