import { Injectable } from '@angular/core';
import { CrudService } from '@shared/services/crud.service';
import { BasicCarPayload, BasicCarResponse } from '../models/basic-cars.models';

@Injectable({
  providedIn: 'root',
})
export class BasicCarsService extends CrudService {
  public getList(payload: BasicCarPayload) {
    return this.post<BasicCarPayload, BasicCarResponse>(
      '/api/basic-cars/get-list',
      payload
    );
  }
}
