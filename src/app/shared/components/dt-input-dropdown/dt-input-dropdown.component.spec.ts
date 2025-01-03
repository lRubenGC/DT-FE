import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtInputDropdownComponent } from './dt-input-dropdown.component';

describe('DtInputDropdownComponent', () => {
  let component: DtInputDropdownComponent;
  let fixture: ComponentFixture<DtInputDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtInputDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DtInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
