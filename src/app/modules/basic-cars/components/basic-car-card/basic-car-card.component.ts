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
  @Input({ required: true, alias: 'car' }) set carSetter(v: BasicCarDTO) {
    this.car$.next(v);
  }
  public car$ = new ReplaySubject<BasicCarDTO>(1);

  public onCarWished(resp: FrontResponse<null>, car: BasicCarDTO): void {
    if (resp.ok) {
      this.car$.next({ ...car, wantsCar: 1 });
    }
  }

  public onCarAdd(resp: FrontResponse<null>, car: BasicCarDTO): void {
    if (resp.ok) {
      this.car$.next({ ...car, hasCar: 1, wantsCar: 0 });
    }
  }

  public onCarDeleted(resp: FrontResponse<null>, car: BasicCarDTO): void {
    if (resp.ok) {
      this.car$.next({ ...car, hasCar: 0, wantsCar: 0 });
    }
  }
}
