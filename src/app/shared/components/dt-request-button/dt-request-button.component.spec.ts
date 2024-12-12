import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtRequestButtonComponent } from './dt-request-button.component';

describe('DtRequestButtonComponent', () => {
  let component: DtRequestButtonComponent;
  let fixture: ComponentFixture<DtRequestButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtRequestButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtRequestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
