import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import {
  DtSelectButtonComponent,
  SelectButtonOptions,
} from '@shared/components/dt-select-button/dt-select-button.component';
import { filter, map, Observable, switchMap } from 'rxjs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UserDTO } from '@auth/models/auth.models';
import { DtOverlayService } from '@shared/services/dt-overlay/dt-overlay.service';
import { UserMenuOverlayComponent } from './components/user-menu-overlay/user-menu-overlay.component';

@Component({
    selector: 'dt-header',
    imports: [
        CommonModule,
        DtSelectButtonComponent,
        SearchBarComponent,
        RouterLink,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //#region USER PROFILE
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private onRouteChange$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
  );
  public userProfile$ = this.onRouteChange$.pipe(
    switchMap(() => this.authService.userProfile$),
  );
  //#endregion USER PROFILE

  //#region LEFT BUTTONS
  public readonly LEFT_BUTTONS_OPTIONS: { id: string; label: string }[] = [
    { id: '/basic-cars', label: 'HEADER.pages.basicCars' },
    { id: '/special-cars', label: 'HEADER.pages.specialCars' },
    { id: '/premium-cars', label: 'HEADER.pages.premiumCars' },
  ];
  public leftButtonsOptions$: Observable<SelectButtonOptions[]> =
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: any) =>
        this.LEFT_BUTTONS_OPTIONS.map(({ label, id }) => ({
          id,
          label,
          active: id === event.url,
        })),
      ),
    );
  //#endregion LEFT BUTTONS

  //#region USER OVERLAY
  private readonly overlay = inject(DtOverlayService);
  public openOverlay(userProfile: UserDTO | null) {
    this.overlay.openOverlay(
      UserMenuOverlayComponent,
      document.querySelector('#user-dropdown') as HTMLElement,
      {
        inputs: [{ id: 'userProfile', value: userProfile }],
      },
    );
  }
  //#endregion USER OVERLAY

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}
