import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';
import { DtRequestButtonComponent } from '@shared/components/dt-request-button/dt-request-button.component';
import { FrontResponse } from '@shared/services/crud.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'dt-basic-car-card',
  standalone: true,
  imports: [CommonModule, DtButtonComponent, DtRequestButtonComponent],
  templateUrl: './basic-car-card.component.html',
  styleUrl: './basic-car-card.component.scss',
})
export class BasicCarCardComponent {
  //#region VM
  @Input({ required: true, alias: 'car' }) set carSetter(v: BasicCarDTO) {
    this.car$.next(v);
  }
  public car$ = new ReplaySubject<BasicCarDTO>(1);
  //#endregion VM

  public onCarAction(
    resp: FrontResponse<null>,
    car: BasicCarDTO,
    action: 'hasCar' | 'wantsCar' | 'deleteCar',
  ): void {
    const hasCar = action === 'hasCar' ? 1 : 0;
    const wantsCar = action === 'wantsCar' ? 1 : 0;
    if (resp.ok) {
      this.car$.next({ ...car, hasCar, wantsCar });
    }
  }
}
