import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';


import { LognComponent } from './pages/logn/logn.component';

// PRIMENG MODULES
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'

export const usersRoutes: Route[] = [
  { path: 'login', component: LognComponent}
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(usersRoutes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LognComponent
  ]
})
export class UsersModule {}
