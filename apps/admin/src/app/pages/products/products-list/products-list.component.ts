import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@meerev/products';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { Product } from '../../models/product.model';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = []

  constructor(private productsService: ProductsService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
    
  }

  private getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products
    })
  }

  deleteProduct(id: string) {
    // Confirm deletion
    this.confirmationService.confirm({
      message: "Are You sure?",
      header: "Delete Product",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.productsService.deleteProduct(id).subscribe(response => {
          this.getProducts()
    
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted' })
    
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not deleted' })
        })
      },
      reject: () => {}
    })
  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`)
  }

}
