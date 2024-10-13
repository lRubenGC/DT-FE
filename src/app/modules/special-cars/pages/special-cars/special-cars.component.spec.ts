import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCarsComponent } from './special-cars.component';

describe('SpecialCarsComponent', () => {
  let component: SpecialCarsComponent;
  let fixture: ComponentFixture<SpecialCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
