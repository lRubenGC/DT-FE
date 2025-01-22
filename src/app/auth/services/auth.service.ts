import { Injectable } from '@angular/core';
import { UserDTO } from '@auth/models/auth.models';
import { CrudService } from '@shared/services/crud/crud.service';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService {
  private getUserProfile() {
    return this.post<string, UserDTO>('/api/auth/get-user-profile', '');
  }

  public userProfile$: Observable<UserDTO | null> = this.getUserProfile().pipe(
    map((resp) => (resp.ok ? resp.data : null)),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

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
