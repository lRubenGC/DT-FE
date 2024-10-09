import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcButtonComponent } from './dc-button.component';

describe('DcButtonComponent', () => {
  let component: DcButtonComponent;
  let fixture: ComponentFixture<DcButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
