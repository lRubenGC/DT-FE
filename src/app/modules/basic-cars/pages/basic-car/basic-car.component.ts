import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicCarMiniCardComponent } from '@modules/basic-cars/components/basic-car-mini-card/basic-car-mini-card.component';
import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';
import { BasicCarsService } from '@modules/basic-cars/services/basic-cars.service';
import { TranslateModule } from '@ngx-translate/core';
import { DtRequestButtonComponent } from '@shared/components/dt-request-button/dt-request-button.component';
import { FrontResponse } from '@shared/services/crud/crud.service';
import { map, merge, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { DtImageOverlayComponent } from '../../../../shared/components/dt-image-overlay/dt-image-overlay.component';

@Component({
    selector: 'app-basic-car',
    imports: [
        CommonModule,
        DtImageOverlayComponent,
        TranslateModule,
        DtRequestButtonComponent,
        BasicCarMiniCardComponent,
    ],
    templateUrl: './basic-car.component.html',
    styleUrl: './basic-car.component.scss'
})
export class BasicCarComponent {
  //#region ID
  private readonly activatedRoute = inject(ActivatedRoute);
  public id$: Observable<number> = this.activatedRoute.params.pipe(
    map((params) =>
      !params['id'] || isNaN(Number(params['id'])) ? 0 : Number(params['id']),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  //#endregion ID

  //#region CAR
  private readonly basicCarsService = inject(BasicCarsService);
  private car: Observable<BasicCarDTO | null> = this.id$.pipe(
    switchMap((id) => this.basicCarsService.getSingle(id)),
    map((resp) => (resp.ok ? resp.data : null)),
  );
  private carUpdated = new Subject<BasicCarDTO>();
  public car$ = merge(this.car, this.carUpdated);
  //#endregion CAR

  //#region SIMILAR CARS
  public similarCars$: Observable<BasicCarDTO[]> = this.id$.pipe(
    switchMap((id) => this.basicCarsService.getSimilarCars(id)),
    map((resp) => (resp.ok ? resp.data : [])),
  );
  //#endregion SIMILAR CARS

  public onCarAction(
    resp: FrontResponse<null>,
    car: BasicCarDTO,
    action: 'hasCar' | 'wantsCar' | 'deleteCar',
  ): void {
    const hasCar = action === 'hasCar' ? 1 : 0;
    const wantsCar = action === 'wantsCar' ? 1 : 0;
    if (resp.ok) {
      this.carUpdated.next({ ...car, hasCar, wantsCar });
    }
  }
}
