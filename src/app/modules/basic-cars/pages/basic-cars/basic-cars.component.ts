import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasicCarCardComponent } from '@modules/basic-cars/components/basic-car-card/basic-car-card.component';
import {
  BasicCarPayload,
  BasicCarResponse,
  BasicCarsFilters,
  BasicCarsGrouped,
} from '@modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from '@modules/basic-cars/services/basic-cars.service';
import { DtInputDropdownComponent } from '@shared/components/dt-input-dropdown/dt-input-dropdown.component';
import { USER_PROPERTY } from '@shared/models/filters.models';
import {
  filter,
  map,
  merge,
  Observable,
  pairwise,
  scan,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'basic-cars',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DtInputDropdownComponent,
    BasicCarCardComponent,
  ],
  templateUrl: './basic-cars.component.html',
  styleUrl: './basic-cars.component.scss',
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
            { emitEvent: false }
          );
        }
        return curr;
      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  //#endregion PAYLOAD

  //#region DATA
  public data$: Observable<BasicCarResponse> = this.payloadChanges$.pipe(
    startWith({ year: undefined }),
    switchMap((payload) => this.getBasicCarsData(payload)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  //#endregion DATA

  //#region VALUE
  public groupedCars$: Observable<BasicCarsGrouped> = this.data$.pipe(
    map(({ cars }) => cars)
  );
  //#endregion VALUE

  //#region FILTERS
  private onYearChange$: Observable<number> = this.data$.pipe(
    pairwise(),
    filter(([prev, curr]) => prev.filters.year !== curr.filters.year),
    map(([_, curr]) => curr),
    filter(({ filters: { year } }) => !!year),
    map(({ filters: { year } }) => year!)
  );
  public filters$: Observable<BasicCarsFilters> = merge(
    this.data$.pipe(
      take(1),
      map(({ filters }) => filters.year)
    ),
    this.onYearChange$
  ).pipe(
    tap((year) => this.payload.patchValue({ year }, { emitEvent: false })),
    switchMap((year) => this.getBasicFilters(year!))
  );
  //#endregion FILTERS

  //#region CARS COUNT
  public carsCount$: Observable<{ carsOwned: number; carsShowed: number }> =
    this.data$.pipe(
      map(({ carsOwned, carsShowed }) => ({ carsOwned, carsShowed }))
    );
  //#endregion CARS COUNT

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
