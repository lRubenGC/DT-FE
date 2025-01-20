import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarMiniCardComponent } from './basic-car-mini-card.component';

describe('BasicCarMiniCardComponent', () => {
  let component: BasicCarMiniCardComponent;
  let fixture: ComponentFixture<BasicCarMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarMiniCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicCarMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
