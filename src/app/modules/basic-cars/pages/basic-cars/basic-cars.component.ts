import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasicCarCardComponent } from '@modules/basic-cars/components/basic-car-card/basic-car-card.component';
import { BasicCarsCarsSkeletonComponent } from '@modules/basic-cars/components/basic-cars-cars-skeleton/basic-cars-cars-skeleton.component';
import { BasicCarsFiltersSkeletonComponent } from '@modules/basic-cars/components/basic-cars-filters-skeleton/basic-cars-filters-skeleton.component';
import {
  BasicCarPayload,
  BasicCarResponse,
  BasicCarsFilters,
  BasicCarsGrouped,
} from '@modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from '@modules/basic-cars/services/basic-cars.service';
import { TranslateModule } from '@ngx-translate/core';
import { DtInputDropdownComponent } from '@shared/components/dt-input-dropdown/dt-input-dropdown.component';
import { USER_PROPERTY } from '@shared/models/filters.models';
import {
  filter,
  map,
  merge,
  Observable,
  pairwise,
  scan,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { DtLayoutComponent } from 'src/app/layouts/dt-layout/dt-layout.component';

@Component({
    selector: 'basic-cars',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        DtInputDropdownComponent,
        BasicCarCardComponent,
        DtLayoutComponent,
        BasicCarsFiltersSkeletonComponent,
        BasicCarsCarsSkeletonComponent,
    ],
    templateUrl: './basic-cars.component.html',
    styleUrl: './basic-cars.component.scss'
})
export class BasicCarsComponent {
  //#region SERVICES
  private readonly basicCarsService = inject(BasicCarsService);
  //#endregion SERVICES

  //#region PAYLOAD
  public payload = new FormGroup({
    year: new FormControl<number | undefined>(undefined),
    mainSerie: new FormControl<string | undefined>(undefined),
    exclusiveSerie: new FormControl<string | undefined>(undefined),
    userProperty: new FormControl<USER_PROPERTY | undefined>(undefined),
  });
  private payloadChanges$: Observable<BasicCarPayload> =
    this.payload.valueChanges.pipe(
      scan<BasicCarPayload>((prev, curr) => {
        if (prev.year !== curr.year) {
          curr.mainSerie = null;
          curr.exclusiveSerie = null;
          this.payload.patchValue(
            {
              mainSerie: null,
              exclusiveSerie: null,
            },
            { emitEvent: false },
          );
        }
        return curr;
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  //#endregion PAYLOAD

  //#region DATA
  public data$: Observable<BasicCarResponse> = this.payloadChanges$.pipe(
    startWith({ year: undefined }),
    switchMap((payload) => this.getBasicCarsData(payload)),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  //#endregion DATA

  //#region VALUE
  public groupedCars$: Observable<BasicCarsGrouped> = this.data$.pipe(
    map(({ cars }) => cars),
  );
  //#endregion VALUE

  //#region FILTERS
  private onYearChange$: Observable<number> = this.payloadChanges$.pipe(
    pairwise(),
    filter(([prev, curr]) => prev.year !== curr.year),
    map(([_, curr]) => curr),
    filter(({ year }) => !!year),
    map(({ year }) => year!),
    share(),
  );
  public yearSelected$ = merge(
    this.data$.pipe(
      take(1),
      map(({ filters: { year } }) => year),
    ),
    this.payloadChanges$.pipe(map(({ year }) => year)),
  );
  public filters$: Observable<BasicCarsFilters> = merge(
    this.data$.pipe(
      take(1),
      map(({ filters }) => filters.year),
    ),
    this.onYearChange$,
  ).pipe(
    tap((year) => this.payload.patchValue({ year }, { emitEvent: false })),
    switchMap((year) => this.getBasicFilters(year!)),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  //#endregion FILTERS

  //#region CARS COUNT
  public carsCount$: Observable<{ carsOwned: number; carsShowed: number }> =
    this.data$.pipe(
      map(({ carsOwned, carsShowed }) => ({ carsOwned, carsShowed })),
    );
  //#endregion CARS COUNT

  //#region LOADING
  public filtersLoading$: Observable<boolean> = merge(
    merge(this.data$.pipe(take(1)), this.onYearChange$).pipe(map(() => true)),
    this.filters$.pipe(map(() => false)),
  );
  public carsLoading$: Observable<boolean> = merge(
    this.payloadChanges$.pipe(map(() => true)),
    this.data$.pipe(map(() => false)),
  ).pipe(startWith(true));
  //#endregion LOADING

  private getBasicCarsData(payload: BasicCarPayload) {
    return this.basicCarsService
      .getData(payload)
      .pipe(map((resp) => (resp.ok ? resp.data : new BasicCarResponse())));
  }

  private getBasicFilters(year: number) {
    return this.basicCarsService
      .getFilters({ year })
      .pipe(map((resp) => (resp.ok ? resp.data : new BasicCarsFilters())));
  }
}
