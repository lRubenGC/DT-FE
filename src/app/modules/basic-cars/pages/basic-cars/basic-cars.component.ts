import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BasicCarPayload,
  BasicCarResponse,
  BasicCarsGrouped,
} from '@modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from '@modules/basic-cars/services/basic-cars.service';
import { USER_PROPERTY } from '@shared/models/filters.models';
import { map, Observable, shareReplay, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'basic-cars',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  private payloadChanges$ = this.payload.valueChanges.pipe(startWith({}));
  //#endregion PAYLOAD

  //#region DATA
  public data$: Observable<BasicCarResponse> = this.payloadChanges$.pipe(
    switchMap((payload) => this.getBasicCars(payload)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  //#endregion DATA

  //#region VALUE
  public groupedCars$: Observable<BasicCarsGrouped> = this.data$.pipe(
    map(({ cars }) => cars)
  );
  //#endregion VALUE

  //#region FILTERS
  public filters$: Observable<BasicCarPayload> = this.data$.pipe(
    tap(({ filters }) =>
      this.payload.patchValue(filters, { emitEvent: false })
    ),
    map(({ filters }) => filters)
  );
  //#endregion FILTERS

  //#region CARS COUNT
  public carsCount$: Observable<{ carsOwned: number; carsShowed: number }> =
    this.data$.pipe(
      map(({ carsOwned, carsShowed }) => ({ carsOwned, carsShowed }))
    );
  //#endregion CARS COUNT

  private getBasicCars(payload: BasicCarPayload) {
    return this.basicCarsService
      .getList(payload)
      .pipe(map((resp) => (resp.ok ? resp.data : new BasicCarResponse())));
  }
}
