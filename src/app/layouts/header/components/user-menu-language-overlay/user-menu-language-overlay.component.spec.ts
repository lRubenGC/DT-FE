import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuLanguageOverlayComponent } from './user-menu-language-overlay.component';

describe('UserMenuLanguageOverlayComponent', () => {
  let component: UserMenuLanguageOverlayComponent;
  let fixture: ComponentFixture<UserMenuLanguageOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuLanguageOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuLanguageOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
