import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DtInputDropdownComponent } from '@shared/components/dt-input-dropdown/dt-input-dropdown.component';
import {
  CAR_TYPE,
  ORDER_TYPE,
  USER_PROPERTY,
} from '@shared/models/filters.models';
import {
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { DtLayoutComponent } from '../../../layouts/dt-layout/dt-layout.component';
import { BasicCarCardComponent } from '../../basic-cars/components/basic-car-card/basic-car-card.component';
import { BasicCarsCarsSkeletonComponent } from '../../basic-cars/components/basic-cars-cars-skeleton/basic-cars-cars-skeleton.component';
import {
  CAR_TYPE_OPTIONS,
  ORDER_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  USER_PROPERTY_OPTIONS,
} from '../models/search.constants';
import {
  SEARCH_TYPE,
  SearchCarsPayload,
  SearchCarsResponse,
} from '../models/search.models';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'dt-search',
  standalone: true,
  imports: [
    CommonModule,
    DtLayoutComponent,
    TranslateModule,
    DtInputDropdownComponent,
    ReactiveFormsModule,
    FormsModule,
    BasicCarsCarsSkeletonComponent,
    BasicCarCardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  //#region SERVICES
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(SearchService);
  //#endregion SERVICES

  //#region ROUTE PARAMS
  public routeParams$ = this.route.paramMap.pipe(
    filter(
      (paramMap) =>
        typeof paramMap.get('query') === 'string' &&
        (paramMap.get('searchType') === 'cars' ||
          paramMap.get('searchType') === 'users'),
    ),
    map((paramMap) => ({
      query: paramMap.get('query') as string,
      searchType: paramMap.get('searchType') as SEARCH_TYPE,
    })),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  //#endregion ROUTE PARAMS

  //#region FILTERS
  public readonly SEARCH_TYPE_OPTIONS = SEARCH_TYPE_OPTIONS;
  public readonly CAR_TYPE_OPTIONS = CAR_TYPE_OPTIONS;
  public readonly USER_PROPERTY_OPTIONS = USER_PROPERTY_OPTIONS;
  public readonly ORDER_OPTIONS = ORDER_OPTIONS;
  //#endregion FILTERS

  //#region PAYLOAD
  public searchType = new Subject<SEARCH_TYPE>();
  public searchType$: Observable<SEARCH_TYPE> = merge(
    this.routeParams$.pipe(
      take(1),
      map(({ searchType }) => searchType),
    ),
    this.searchType,
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  public payload = new FormGroup({
    carType: new FormControl<CAR_TYPE | undefined>(undefined),
    userProperty: new FormControl<USER_PROPERTY | undefined>(undefined),
    order: new FormControl<ORDER_TYPE | undefined>(undefined),
  });
  private payloadChanges$: Observable<{
    searchType: SEARCH_TYPE;
    carType?: CAR_TYPE | null;
    userProperty?: USER_PROPERTY | null;
    order?: ORDER_TYPE | null;
  }> = combineLatest([
    this.searchType$,
    this.payload.valueChanges.pipe(
      startWith({ carType: null, order: null, userProperty: null }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    ),
  ]).pipe(
    map(([searchType, { carType, order, userProperty }]) => ({
      searchType,
      carType,
      order,
      userProperty,
    })),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  //#endregion PAYLOAD

  //#region CARS
  public carsResult$ = combineLatest([
    this.routeParams$,
    this.payloadChanges$,
  ]).pipe(
    filter(([_, { searchType }]) => searchType === 'cars'),
    switchMap(([{ query }, { carType, order, userProperty }]) =>
      this.getCars({ query, carType, order, userProperty }),
    ),
    tap((v) => console.log(v)),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  //#endregion CARS

  //#region USERS
  public users$ = combineLatest([this.searchType$, this.routeParams$]).pipe(
    filter(([searchType]) => searchType === 'users'),
    switchMap(([_, { query }]) => this.getUsers(query)),
  );
  //#endregion USERS

  //#region LOADING
  public carsResultLoading$: Observable<boolean> = merge(
    this.payloadChanges$.pipe(map(() => true)),
    this.carsResult$.pipe(map(() => false)),
  ).pipe(startWith(true));
  //#endregion LOADING

  private getCars(payload: SearchCarsPayload) {
    return this.searchService
      .getCars(payload)
      .pipe(map((resp) => (resp.ok ? resp.data : new SearchCarsResponse())));
  }

  private getUsers(query: string) {
    return this.searchService
      .getUsers(query)
      .pipe(map((resp) => (resp.ok ? resp.data : [])));
  }

  public areCarsAvaiable(
    carTypeInForm: FormControl<CAR_TYPE | null | undefined>,
    carType: string,
  ) {
    return !carTypeInForm.value || carTypeInForm.value === carType;
  }
}
