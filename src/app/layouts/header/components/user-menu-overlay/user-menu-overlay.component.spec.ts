import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuOverlayComponent } from './user-menu-overlay.component';

describe('UserMenuOverlayComponent', () => {
  let component: UserMenuOverlayComponent;
  let fixture: ComponentFixture<UserMenuOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
