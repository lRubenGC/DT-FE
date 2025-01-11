import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtLayoutComponent } from './dt-layout.component';

describe('DtLayoutComponent', () => {
  let component: DtLayoutComponent;
  let fixture: ComponentFixture<DtLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DtLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
