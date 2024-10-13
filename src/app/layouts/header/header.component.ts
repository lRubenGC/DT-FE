import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  DtSelectButtonComponent,
  SelectButtonOptions,
} from '@shared/components/dt-select-button/dt-select-button.component';
import { map, Observable } from 'rxjs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'dt-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoDirective,
    DtSelectButtonComponent,
    SearchBarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //#region SERVICES
  private activatedRoute = inject(ActivatedRoute);
  //#endregion SERVICES

  //#region LEFT BUTTONS
  public readonly LEFT_BUTTONS_OPTIONS: { label: string; route: string }[] = [
    { label: 'Básicos', route: 'basic-cars' },
    { label: 'Especiales', route: 'special-cars' },
    { label: 'Premium', route: 'premium-cars' },
  ];
  public leftButtonsOptions$: Observable<SelectButtonOptions[]> =
    this.activatedRoute.url.pipe(
      map((r) =>
        this.LEFT_BUTTONS_OPTIONS.map(({ label, route }) => ({
          label,
          active: route === r[0].path,
        }))
      )
    );
  //#endregion LEFT BUTTONS
}
