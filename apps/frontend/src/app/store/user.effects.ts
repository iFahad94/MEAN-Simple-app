import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SignupService } from '../signup/signup.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loginUser, loginUserSuccess, loginUserFailure, signUpUser, signUpUserSuccess, signUpUserFailure } from './user.actions';
import { User } from '../models/user.model';
import { ListUsersService } from '../list-users/list-users-service';
@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private signupService: SignupService,
    private listService: ListUsersService
  ) {}

  // Effect to load users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() => this.listService.getAllUsers()
        .pipe(
          map((users: User[]) => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        ))
    )
  );

  // Effect to handle user login using AuthService
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap(action => this.authService.login({ username: action.username, password: action.password })
        .pipe(
          map((user: User) => loginUserSuccess({ user })),
          catchError(error => of(loginUserFailure({ error })))
        ))
    )
  );

  // Effect to handle user signup using SignupService
  signUpUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpUser),
      mergeMap(action => this.signupService.signup({ username: action.username, email: action.email, password: action.password })
        .pipe(
          map((user: User) => signUpUserSuccess({ user })),
          catchError(error => of(signUpUserFailure({ error })))
        ))
    )
  );
}
