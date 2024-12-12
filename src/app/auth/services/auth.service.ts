import { Injectable } from '@angular/core';
import { UserDTO } from '@auth/models/auth.models';
import { CrudService } from '@shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService {
  public login(payload: { email: string; password: string }) {
    return this.post<{ email: string; password: string }, UserDTO>(
      '/api/auth/login',
      payload
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
