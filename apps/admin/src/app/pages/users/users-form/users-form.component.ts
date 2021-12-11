import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { timer } from 'rxjs';

import { UsersService, User } from '@meerev/users';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries'

declare const require: any

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  editMode: boolean = false
  isSubmitted: boolean = false
  form!: FormGroup
  currentUserID!: string
  countries: any[] = []

  constructor(private formBuilder: FormBuilder, 
              private usersService: UsersService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.initForm()
    this.checkEditMode()
    this.getCountries()
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      street: [''],
      apartment: [''],
      zip: [''],
      isAdmin: [false],
      city: [''],
      country: [''],
    })
  }

  private checkEditMode() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.id) {
        this.editMode = true
        this.currentUserID = params.id
        this.usersService.getUser(params.id).subscribe((user: User) => {
          this.userForm.name.setValue(user.name)
          this.userForm.email.setValue(user.email)
          this.userForm.isAdmin.setValue(user.isAdmin)
          this.userForm.street.setValue(user.street)
          this.userForm.apartment.setValue(user.apartment)
          this.userForm.zip.setValue(user.zip)
          this.userForm.city.setValue(user.city)
          this.userForm.country.setValue(user.country)

          this.userForm.password.setValue([])
          this.userForm.password.updateValueAndValidity()
          // console.log(user)
          // console.log(user.id)
          // console.log(params.id)
        })
      }
    })
  }

  private getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"))
    this.countries = Object.entries(countriesLib.getNames('en', { select: 'official'} )).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  onSubmit() {
    this.isSubmitted = true

    if(this.form.invalid) {
      return
    }

    const user: User = {
      id: this.currentUserID,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      street: this.userForm.street.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
      password: this.userForm.password.value,
      isAdmin: this.userForm.isAdmin.value,
      zip: this.userForm.zip.value,
      apartment: this.userForm.apartment.value
    }

    if(this.editMode) {
      this.updateUser(user)
    } else {
      this.createUser(user)
    }

    this.form.reset()
  }

  private createUser(user: User) {
    this.usersService.createUser(user).subscribe((user: User) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} created` })
    
      timer(2000).toPromise().then(done => {
        this.location.back()
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not created' })
    })
  }

  private updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated' })

      // setTimeout(() => {
      //   this.location.back()
      // }, 2000)
      timer(2000).toPromise().then(done => {
        this.location.back()
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not updated' })
    })
  }

  onCancel() {
    this.router.navigate(['users'])
  }

  get userForm() {
    return this.form.controls
  }

}
