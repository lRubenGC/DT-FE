import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtButtonComponent } from './dt-button.component';

describe('DtButtonComponent', () => {
  let component: DtButtonComponent;
  let fixture: ComponentFixture<DtButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DtButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
