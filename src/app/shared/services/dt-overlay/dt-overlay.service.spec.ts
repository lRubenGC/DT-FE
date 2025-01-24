import { TestBed } from '@angular/core/testing';

import { DtOverlayService } from './dt-overlay.service';

describe('DtOverlayService', () => {
  let service: DtOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
