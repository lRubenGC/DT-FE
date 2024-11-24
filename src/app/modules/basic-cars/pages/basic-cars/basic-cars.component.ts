import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BASIC_CARS_DEFAULT_YEAR } from '@modules/basic-cars/models/basic-cars.constants';
import {
  BasicCarPayload,
  BasicCarResponse,
} from '@modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from '@modules/basic-cars/services/basic-cars.service';
import { USER_PROPERTY } from '@shared/models/filters.models';
import { map, Observable, switchMap, tap } from 'rxjs';

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
    year: new FormControl<number>(BASIC_CARS_DEFAULT_YEAR, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    mainSerie: new FormControl<string | null>(null),
    exclusiveSerie: new FormControl<string | null>(null),
    userProperty: new FormControl<USER_PROPERTY | null>(null),
  });
  //#endregion PAYLOAD

  //#region DATA
  public data$: Observable<BasicCarResponse> = this.payload.valueChanges.pipe(
    tap((value) => console.log('a')),
    switchMap((payload) => this.getBasicCars(payload as BasicCarPayload)),
    tap((value) => console.log('b'))
  );
  //#endregion DATA

  //#region VALUE
  public cars$: Observable<any> = this.data$
    .pipe
    // tap((value) => console.log(value))
    ();
  //#endregion VALUE

  private getBasicCars(payload: BasicCarPayload) {
    return this.basicCarsService
      .getList(payload)
      .pipe(map((resp) => (resp.ok ? resp.data : new BasicCarResponse())));
  }
}
