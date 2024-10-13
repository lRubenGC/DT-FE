import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCarsComponent } from './premium-cars.component';

describe('PremiumCarsComponent', () => {
  let component: PremiumCarsComponent;
  let fixture: ComponentFixture<PremiumCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
