import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '@meerev/products';
import { CategoriesService } from '@meerev/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
form!: FormGroup
isSubmitted: boolean = false
editMode: boolean = false
currentCategoryID!: string

  constructor(private formBuilder: FormBuilder, 
              private categoriesService: CategoriesService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })

    this.checkEditMode()
  }

  get categoryForm() {
    return this.form.controls
  }

  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return
    }

    const category: Category = {
      id: this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if(this.editMode) {
      this.updateCategory(category)
    } else {
      this.createCategory(category)
    }

    this.form.reset()
  }

  private createCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe((category: Category) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} created` })

      setTimeout(() => {
        this.location.back()
      }, 2000)
      // timer(2000).toPromise().then(done => {
      //   this.location.back()
      // })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not created' })
    })
  }

  private updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated' })

      setTimeout(() => {
        this.location.back()
      }, 2000)
      // timer(2000).toPromise().then(done => {
      //   this.location.back()
      // })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not updated' })
    })
  }

  private checkEditMode() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.id) {
        this.editMode = true
        this.currentCategoryID = params.id
        this.categoriesService.getCategory(params.id).subscribe((category: Category) => {
          // const catName = category.name
          this.categoryForm.name.setValue(category.name)
          this.categoryForm.icon.setValue(category.icon)
          this.categoryForm.color.setValue(category.color)
          // console.log(category)
          // console.log(category.id)
          // console.log(params.id)
        })
      }
    })
  }

  onCancel() {
    this.router.navigate(['categories'])
  }

}
