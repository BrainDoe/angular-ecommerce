import { LocalStorageService, UsersService } from '@meerev/users';

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  // //@ts-ignore
  // buildUserSession$ = createEffect(() => {this.actions$.pipe(
  //   ofType(UsersActions.buildUserSession),
  //   //@ts-ignore
  //   concatMap(() => {
  //     if(this.localStorageService.isValidToken()) {
  //       const userId = this.localStorageService.getUserIdFromToken();
  //       if(userId) {
  //         this.usersService.getUser(userId).pipe(
  //           map((user) => {
  //             //@ts-ignore
  //             return UsersActions.buildUserSessionSuccess({user: user })
  //           }),
  //           catchError(() => of(UsersActions.buildUserSessionFailure()))
  //         )
  //       } else {
  //         return of(UsersActions.buildUserSessionFailure())
  //       }
  //     } else {
  //       return of(UsersActions.buildUserSessionFailure())
  //     }
  //   })
  // )} )


  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken();
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUserSessionSuccess({ user: user });
              }),
              catchError(() => of(UsersActions.buildUserSessionFailure()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailure());
          }
        } else {
          return of(UsersActions.buildUserSessionFailure());
        }
      })
    )
  );


  constructor(private readonly actions$: Actions, private localStorageService: LocalStorageService, private usersService: UsersService) {}
}
