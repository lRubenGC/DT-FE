import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  share,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { DtInputTextComponent } from '../../shared/components/dt-input-text/dt-input-text.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DtButtonComponent,
    DtInputTextComponent,
    TranslateModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  //#region SERVICES
  private readonly authService = inject(AuthService);
  //#endregion SERVICES

  //#region FORMS
  public readonly loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  public readonly registerForm = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  //#endregion FORMS

  //#region FORM VISIBLE
  public formVisible$ = new BehaviorSubject<'login' | 'register'>('login');
  //#endregion FORM VISIBLE

  //#region REQUEST
  public sendForm = new Subject<void>();
  public sendForm$ = this.sendForm.pipe(
    withLatestFrom(this.formVisible$),
    filter(([_, formVisible]) =>
      formVisible === 'login' ? this.loginForm.valid : this.registerForm.valid
    ),
    share()
  );
  public request$ = this.sendForm$.pipe(
    withLatestFrom(this.formVisible$),
    switchMap(([_, formVisible]) =>
      formVisible === 'login'
        ? this.authService.login(this.loginForm.getRawValue())
        : this.authService.register(this.registerForm.getRawValue())
    ),
    share()
  );
  //#endregion REQUEST

  //#region ERRORS
  public errors$ = merge(
    this.request$.pipe(map((resp) => (resp.ok ? [] : resp.errors))),
    this.formVisible$.pipe(map(() => []))
  ).pipe(map((errors) => errors.map(({ error }) => error)));
  //#endregion ERRORS

  //#region LOADING
  public loading$ = merge(
    this.sendForm$.pipe(map(() => true)),
    this.request$.pipe(map(() => false))
  );
  //#endregion LOADING
}
