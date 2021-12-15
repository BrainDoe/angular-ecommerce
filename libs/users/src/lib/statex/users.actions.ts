import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';

export const buildUserSession = createAction('[Users] Build User Session');

export const init = createAction('[Users Page] Init');

export const buildUserSessionSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user: UsersEntity[] | any[] | any }>()
);

export const buildUserSessionFailure = createAction('[Users] Build User Session Failure');
