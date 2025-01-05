import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';
import {
  BehaviorSubject,
  map,
  merge,
  Subject,
  switchMap,
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
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
  public readonly registerForm = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
  //#endregion FORMS

  //#region FORM VISIBLE
  public formVisible$ = new BehaviorSubject<'login' | 'register'>('login');
  //#endregion FORM VISIBLE

  //#region REQUEST
  public sendForm = new Subject<void>();
  public request$ = this.sendForm.pipe(
    withLatestFrom(this.formVisible$),
    switchMap(([_, formVisible]) =>
      formVisible === 'login'
        ? this.authService.login(this.loginForm.getRawValue())
        : this.authService.register(this.registerForm.getRawValue())
    )
  );
  //#endregion REQUEST

  //#region LOADING
  public loading$ = merge(
    this.sendForm.pipe(map(() => true)),
    this.request$.pipe(map(() => false))
  );
  //#endregion LOADING
}
