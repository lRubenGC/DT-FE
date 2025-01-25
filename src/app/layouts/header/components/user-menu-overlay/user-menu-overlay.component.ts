import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { DtOverlayService } from '@shared/services/dt-overlay/dt-overlay.service';
import { UserMenuItemComponent } from '../user-menu-item/user-menu-item.component';
import { UserMenuLanguageOverlayComponent } from '../user-menu-language-overlay/user-menu-language-overlay.component';
import { UserDTO } from '@auth/models/auth.models';
import { Router } from '@angular/router';
import { Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'dt-user-menu-overlay',
  standalone: true,
  imports: [CommonModule, TranslateModule, UserMenuItemComponent],
  templateUrl: './user-menu-overlay.component.html',
  styleUrl: './user-menu-overlay.component.scss',
})
export class UserMenuOverlayComponent {
  @Input() userProfile: UserDTO | null = null;

  //#region SERVICES
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly overlay = inject(DtOverlayService);
  //#endregion SERVICES

  public logOut = new Subject<void>();
  public logOut$ = this.logOut.pipe(
    switchMap(() => this.authService.logout()),
    tap((resp) => resp.ok && this.router.navigate(['/home'])),
  );

  public openLanguageDialog() {
    this.overlay.openOverlay(
      UserMenuLanguageOverlayComponent,
      document.querySelector('#language-dropdown') as HTMLElement,
    );
  }

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
