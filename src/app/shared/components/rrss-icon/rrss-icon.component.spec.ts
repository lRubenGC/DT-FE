import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRrssIconComponent } from './rrss-icon.component';

describe('DtRrssIconComponent', () => {
  let component: DtRrssIconComponent;
  let fixture: ComponentFixture<DtRrssIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtRrssIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DtRrssIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
