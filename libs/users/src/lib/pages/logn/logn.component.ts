import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from '@meerev/users';

@Component({
  selector: 'users-logn',
  templateUrl: './logn.component.html',
  styles: [
  ]
})
export class LognComponent implements OnInit {
  loginFormGroup!: FormGroup
  isSubmitted: boolean = false
  authError: boolean = false
  errorMessage: string = 'Invalid Login Details'

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }) 
  }

  onSubmit() {
    this.isSubmitted = true

    if(this.loginFormGroup.invalid) return

    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
    }

    this.authService.login(loginData).subscribe(data => {
      this.authError = false
      this.localStorageService.setToken(data.token)
      this.router.navigate(['/'])
      console.log(data)
    }, (error: HttpErrorResponse) => {
      this.authError = true
      if(error.status !== 400) {
        this.errorMessage = 'Error in the server. Please try again later'
      }
    })
  }

  get loginForm() {
    return this.loginFormGroup.controls
  }

}
