import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BasicCarPayload,
  BasicCarResponse,
  BasicCarsFilters,
  BasicCarsGrouped,
} from '@modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from '@modules/basic-cars/services/basic-cars.service';
import { DtDropdownComponent } from '@shared/components/dt-dropdown/dt-dropdown.component';
import { USER_PROPERTY } from '@shared/models/filters.models';
import {
  filter,
  map,
  merge,
  Observable,
  pairwise,
  shareReplay,
  skip,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'basic-cars',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DtDropdownComponent],
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
  private payloadChanges$ = this.payload.valueChanges.pipe(
    startWith({
      year: undefined,
    })
  );
  //#endregion PAYLOAD

  //#region DATA
  public data$: Observable<BasicCarResponse> = this.payloadChanges$.pipe(
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
  private onYearChange$: Observable<number> = merge(
    this.data$.pipe(
      take(1),
      tap(({ filters }) =>
        this.payload.patchValue(filters, { emitEvent: false })
      ),
      filter(({ filters: { year } }) => !!year),
      map(({ filters: { year } }) => year!)
    ),
    this.payloadChanges$.pipe(
      skip(1),
      pairwise(),
      filter(
        ([prevPayload, currPayload]) => prevPayload.year !== currPayload.year
      ),
      map(([_, currPayload]) => currPayload.year),
      filter((year) => !!year),
      map((year) => year!)
    )
  );
  public filters$: Observable<BasicCarsFilters> = this.onYearChange$.pipe(
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
