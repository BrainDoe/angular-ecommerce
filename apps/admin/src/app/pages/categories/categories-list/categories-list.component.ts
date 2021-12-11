import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators'


import { CategoriesService, Category } from '@meerev/products'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = []
  endSubs$: Subject<any> = new Subject()

  constructor(
              private categoriesService: CategoriesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCategories()
    // this.endSubs$.complete()
  }

  deleteCategory(id: string) {
    // Confirm deletion
    this.confirmationService.confirm({
      message: "Are You sure?",
      header: "Delete Category",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.categoriesService.deleteCategories(id).subscribe(response => {
          this.getCategories()
    
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted' })
    
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not deleted' })
        })
      },
      reject: () => {}
    })
  }

  updateCategory(id: string) {
    this.router.navigateByUrl(`categories/form/${id}`)
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories
    }).unsubscribe()
  }

}
