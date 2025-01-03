import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtInputTextComponent } from './dt-input-text.component';

describe('DtInputTextComponent', () => {
  let component: DtInputTextComponent;
  let fixture: ComponentFixture<DtInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtInputTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
