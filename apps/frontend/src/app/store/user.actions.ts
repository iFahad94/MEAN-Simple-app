import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction('[User List] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User List] Load Users Failure', props<{ error: any }>());

export const loginUser = createAction('[Auth] Login User', props<{ username: string; password: string }>());
export const loginUserSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const signUpUser = createAction('[Auth] Sign Up User', props<{ username: string; email: string; password: string }>());
export const signUpUserSuccess = createAction('[Auth] Sign Up Success', props<{ user: User }>());
export const signUpUserFailure = createAction('[Auth] Sign Up Failure', props<{ error: any }>());
