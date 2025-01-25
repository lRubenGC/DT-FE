import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserDTO } from '@auth/models/auth.models';
import { CrudService } from '@shared/services/crud/crud.service';
import { filter, map, Observable, share, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService {
  //#region USER PROFILE
  private readonly router = inject(Router);
  private onRouterChange$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
  );
  private getUserProfile() {
    return this.post<string, UserDTO>('/api/auth/get-user-profile', '', {
      skipErrorsInterceptor: true,
    });
  }
  public userProfile$: Observable<UserDTO | null> = this.onRouterChange$.pipe(
    switchMap(() => this.getUserProfile()),
    map((resp) => (resp.ok ? resp.data : null)),
    share(),
  );
  //#endregion USER PROFILE

  public login(payload: { email: string; password: string }) {
    return this.post<{ email: string; password: string }, UserDTO>(
      '/api/auth/login',
      payload,
    );
  }

  public register(payload: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.post<
      { username: string; email: string; password: string },
      UserDTO
    >('/api/auth/register', payload);
  }

  public logout() {
    return this.post<'', ''>('/api/auth/logout', '');
  }
}
