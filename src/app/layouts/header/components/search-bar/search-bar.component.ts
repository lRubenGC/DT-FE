import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SEARCH_TYPE } from '@modules/search/models/search.models';
import { TranslateModule } from '@ngx-translate/core';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';
import {
  DtSelectButtonComponent,
  SelectButtonOptions,
} from '@shared/components/dt-select-button/dt-select-button.component';
import { DtClickOutsideDirective } from '@shared/directives/click-outside-directive';
import {
  BehaviorSubject,
  defer,
  filter,
  map,
  merge,
  Observable,
  share,
  Subject,
  tap,
  withLatestFrom,
} from 'rxjs';

@Component({
  selector: 'dt-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    DtButtonComponent,
    TranslateModule,
    DtSelectButtonComponent,
    DtClickOutsideDirective,
    FormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  //#region OPTIONS
  public optionSelected = new BehaviorSubject<SEARCH_TYPE>('cars');
  public options$: Observable<SelectButtonOptions[]> = this.optionSelected.pipe(
    map((optionSelected) => [
      {
        label: 'SEARCH.title.cars',
        id: 'cars',
        active: optionSelected === 'cars',
      },
      {
        label: 'SEARCH.title.users',
        id: 'users',
        active: optionSelected === 'users',
      },
    ]),
  );
  //#endregion OPTIONS

  //#region ON SEARCH
  private readonly router = inject(Router);
  public query = new Subject<string>();
  public query$ = merge(
    this.query,
    defer(() => this.onSearch$.pipe(map(() => ''))),
  );
  public onSearch = new Subject<void>();
  public onSearch$ = this.onSearch.pipe(
    withLatestFrom(this.query, this.optionSelected),
    filter(([_, query]) => !!query),
    tap(([_, query, optionSelected]) =>
      this.router.navigate([`/search/${optionSelected}/${query}`]),
    ),
    share(),
  );
  //#endregion ON SEARCH

  //#region VISIBILITY
  public optionsVisibility = new BehaviorSubject<{ visible: boolean }>({
    visible: false,
  });
  public optionsVisibility$: Observable<{ visible: boolean }> = merge(
    this.optionsVisibility,
    this.onSearch.pipe(map(() => ({ visible: false }))),
  );
  //#endregion VISIBILITY

  public searchCar(event: Event): void {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    if (!value) return;
    console.log(value);
  }
}
