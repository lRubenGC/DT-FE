import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';
import { DtRequestButtonComponent } from '@shared/components/dt-request-button/dt-request-button.component';
import { FrontResponse } from '@shared/services/crud.service';
import { Observable, ReplaySubject } from 'rxjs';
import { BasicCarModalComponent } from '../basic-car-modal/basic-car-modal.component';

@Component({
  selector: 'basic-car-card',
  standalone: true,
  imports: [
    CommonModule,
    DtButtonComponent,
    DtRequestButtonComponent,
    DialogModule,
  ],
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

  private readonly dialog = inject(Dialog);
  public openDialog(car: BasicCarDTO): void {
    const dialogRef = this.dialog.open(BasicCarModalComponent, {
      height: 'auto',
      width: '800px',
      panelClass: 'my-dialog',
      data: car,
    });

    (dialogRef.closed as Observable<BasicCarDTO>).subscribe(
      (car: BasicCarDTO) => {
        this.car$.next(car);
      },
    );
  }

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
