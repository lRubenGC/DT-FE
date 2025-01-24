import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  DtSelectButtonComponent,
  SelectButtonOptions,
} from '@shared/components/dt-select-button/dt-select-button.component';
import { filter, map, Observable } from 'rxjs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DtUserMenuComponent } from './components/user-menu/user-menu.component';

@Component({
  selector: 'dt-header',
  standalone: true,
  imports: [
    CommonModule,
    DtSelectButtonComponent,
    SearchBarComponent,
    RouterLink,
    DtUserMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //#region SERVICES
  private readonly router = inject(Router);
  //#endregion SERVICES

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

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}
