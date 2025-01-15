import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarModalComponent } from './basic-car-modal.component';

describe('BasicCarModalComponent', () => {
  let component: BasicCarModalComponent;
  let fixture: ComponentFixture<BasicCarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
