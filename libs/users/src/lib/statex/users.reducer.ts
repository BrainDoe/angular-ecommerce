import { User } from '@meerev/users';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
  user: User,
  isAuthenticated: boolean
}


export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UserState;
}

export const initialUsersState: UserState = {
  user: null!,
  isAuthenticated: false
}

const usersReducer = createReducer(
  initialUsersState, 
  on(UsersActions.buildUserSession, (state) => ({...state})),
  //@ts-ignore
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({...state, user: action.user, isAuthenticated: true })),
  //@ts-ignore
  on(UsersActions.buildUserSessionFailure, (state, action) => ({...state, user: null, isAuthenticated: false })),
)


export function reducer(state: UserState | undefined, action: Action) {
  return usersReducer(state, action);
}
