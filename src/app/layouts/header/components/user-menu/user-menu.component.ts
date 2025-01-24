import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { DtOverlayService } from '@shared/services/dt-overlay/dt-overlay.service';
import { UserMenuOverlayComponent } from '../user-menu-overlay/user-menu-overlay.component';

@Component({
  selector: 'dt-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class DtUserMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly overlay = inject(DtOverlayService);

  public userProfile$ = this.authService.userProfile$;

  public openOverlay() {
    this.overlay.openOverlay(
      UserMenuOverlayComponent,
      document.querySelector('#user-dropdown') as HTMLElement,
    );
  }
}
