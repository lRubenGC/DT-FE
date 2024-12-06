import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDropdownComponent } from './dt-dropdown.component';

describe('DtDropdownComponent', () => {
  let component: DtDropdownComponent;
  let fixture: ComponentFixture<DtDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
