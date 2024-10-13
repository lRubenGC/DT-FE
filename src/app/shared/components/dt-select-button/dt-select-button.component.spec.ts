import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtSelectButtonComponent } from './dt-select-button.component';

describe('DtSelectButtonComponent', () => {
  let component: DtSelectButtonComponent;
  let fixture: ComponentFixture<DtSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtSelectButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
