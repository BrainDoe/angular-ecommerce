import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService, Product, CategoriesService, Category } from '@meerev/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup
  editMode: boolean = false
  isSubmitted: boolean = false
  categories: Category[] = []
  imageDisplay?: string | ArrayBuffer | null
  currentProductID!: string

  constructor(private formBuilder: FormBuilder, 
              private productsService: ProductsService,
              private categoriesService: CategoriesService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.initForm()
    this.getCategories()
    this.checkEditMode()
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  get productForm() {
    return this.form.controls
  }

  private  getCategories() {
    this.categoriesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories
    })
  }

  private checkEditMode() {
    this.activatedRoute.params.subscribe((params: Params )=> {
      if(params.id) {
        this.editMode = true
        this.currentProductID = params.id
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name)
          this.productForm.category.setValue(product.category?.id)
          this.productForm.brand.setValue(product.brand)
          this.productForm.price.setValue(product.price)
          this.productForm.countInStock.setValue(product.countInStock)
          this.productForm.description.setValue(product.description)
          this.productForm.isFeatured.setValue(product.isFeatured)
          this.productForm.numReviews.setValue(product.numReviews)
          this.imageDisplay = product.image
          this.productForm.image.setValidators([])
          this.productForm.image.updateValueAndValidity()
          console.log(product)
          console.log(product.id)
          console.log(params.id)
          console.log(this.imageDisplay)
        })
      }
    })
  }

  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return
    }

    const productFormData = new FormData()
    // productFormData.append('name', this.productForm.name.value)
    // productFormData.append('brand', this.productForm.brand.value)
    // productFormData.append('price', this.productForm.price.value)
    // productFormData.append('category', this.productForm.category.value)
    // productFormData.append('countInStock', this.productForm.countInStock.value)
    // productFormData.append('description', this.productForm.description.value)
    // productFormData.append('richDescription', this.productForm.richDescription.value)
    // productFormData.append('image', this.productForm.image.value)
    // productFormData.append('isFeatured', this.productForm.isFeatured.value)

    // Better To Loop Through the keys of the productForm
    Object.keys(this.productForm).map(key => {
      productFormData.append(key, this.productForm[key].value)
    })

    if(this.editMode) {
      this.updateProduct(productFormData)
    } else {
      this.addProduct(productFormData)
    }
  }

  private updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductID).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated' })

      setTimeout(() => {
        this.location.back()
      }, 2000)
      // timer(2000).toPromise().then(done => {
      //   this.location.back()
      // })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not updated' })
    })
  }

  private addProduct(product: FormData) {
    this.productsService.createProduct(product).subscribe((product: Product) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} created` })

      setTimeout(() => {
        this.location.back()
      }, 2000)
      // timer(2000).toPromise().then(done => {
      //   this.location.back()
      // })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not created' })
    })
  }

  onCancel() {

  }

  onImageChange(event: any) {
    const file = event.target.files[0]
    if(file) {
      this.form.patchValue({image: file})
      this.form.get('image')?.updateValueAndValidity()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }

}
