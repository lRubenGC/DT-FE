import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { DtOverlayService } from '@shared/services/dt-overlay/dt-overlay.service';

@Component({
  selector: 'dt-user-menu-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu-overlay.component.html',
  styleUrl: './user-menu-overlay.component.scss',
})
export class UserMenuOverlayComponent {
  private readonly authService = inject(AuthService);
  private readonly overlay = inject(DtOverlayService);

  public userProfile$ = this.authService.userProfile$;

  public openLanguageDialog() {
    this.overlay.openOverlay(
      UserMenuOverlayComponent,
      document.querySelector('#language-dropdown') as HTMLElement,
    );
  }
}
