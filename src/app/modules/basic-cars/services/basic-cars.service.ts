import { Injectable } from '@angular/core';
import { CrudService } from '@shared/services/crud.service';
import {
  BasicCarPayload,
  BasicCarResponse,
  BasicCarsFilters,
} from '../models/basic-cars.models';

@Injectable({
  providedIn: 'root',
})
export class BasicCarsService extends CrudService {
  public getData(payload: BasicCarPayload) {
    return this.post<BasicCarPayload, BasicCarResponse>(
      '/api/basic-cars/get-list',
      payload
    );
  }

  public getFilters(payload: { year: number }) {
    return this.post<{ year: number }, BasicCarsFilters>(
      '/api/basic-cars/get-filters',
      payload
    );
  }
}
