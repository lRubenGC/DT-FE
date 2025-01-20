import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarComponent } from './basic-car.component';

describe('BasicCarComponent', () => {
  let component: BasicCarComponent;
  let fixture: ComponentFixture<BasicCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
