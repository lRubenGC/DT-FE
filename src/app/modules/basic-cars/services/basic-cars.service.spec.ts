import { TestBed } from '@angular/core/testing';

import { BasicCarsService } from './basic-cars.service';

describe('BasicCarsService', () => {
  let service: BasicCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
