import { Injectable } from '@angular/core';
import { UserDTO } from '@auth/models/auth.models';
import { CrudService } from '@shared/services/crud/crud.service';
import { SearchCarsPayload, SearchCarsResponse } from '../models/search.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends CrudService {
  public getCars(payload: SearchCarsPayload) {
    return this.post<SearchCarsPayload, SearchCarsResponse>(
      '/api/search/get-cars',
      payload,
    );
  }

  public getUsers(query: string) {
    return this.post<{ query: string }, UserDTO[]>('/api/search/get-users', {
      query,
    });
  }
}
