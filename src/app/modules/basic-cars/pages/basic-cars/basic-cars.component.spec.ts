import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarsComponent } from './basic-cars.component';

describe('BasicCarsComponent', () => {
  let component: BasicCarsComponent;
  let fixture: ComponentFixture<BasicCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
