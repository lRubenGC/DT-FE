import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtImageOverlayComponent } from './dt-image-overlay.component';

describe('DtImageOverlayComponent', () => {
  let component: DtImageOverlayComponent;
  let fixture: ComponentFixture<DtImageOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtImageOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DtImageOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
