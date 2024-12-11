import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarCardComponent } from './basic-car-card.component';

describe('BasicCarCardComponent', () => {
  let component: BasicCarCardComponent;
  let fixture: ComponentFixture<BasicCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
