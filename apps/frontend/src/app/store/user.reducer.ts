import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loginUser, loginUserSuccess, loginUserFailure, signUpUser, signUpUserSuccess, signUpUserFailure } from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  currentUser: User | null;
  error: any;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  currentUser: null,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  
  on(loginUser, state => ({ ...state, loading: true })),
  on(loginUserSuccess, (state, { user }) => ({ ...state, currentUser: user, loading: false })),
  on(loginUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(signUpUser, state => ({ ...state, loading: true })),
  on(signUpUserSuccess, (state, { user }) => ({ ...state, currentUser: user, loading: false })),
  on(signUpUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
