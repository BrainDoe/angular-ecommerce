import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { LognComponent } from './pages/logn/logn.component';

// PRIMENG MODULES
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import * as fromUsers from './state/users.reducer';
// import { UsersEffects } from './state/users.effects';
import * as fromUsers from './statex/users.reducer';
import { UsersEffects } from './statex/users.effects';
import { UsersFacade } from './statex/users.facade';

export const usersRoutes: Route[] = [
  { path: 'login', component: LognComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [LognComponent],
  providers: [UsersFacade],
})
export class UsersModule {}
