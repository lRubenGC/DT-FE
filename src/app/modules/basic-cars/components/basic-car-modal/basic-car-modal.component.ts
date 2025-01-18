import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';
import { TranslateModule } from '@ngx-translate/core';
import { DtRequestButtonComponent } from '@shared/components/dt-request-button/dt-request-button.component';
import { FrontResponse } from '@shared/services/crud/crud.service';
import { DtButtonComponent } from '../../../../shared/components/dt-button/dt-button.component';

@Component({
  selector: 'basic-car-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    DtRequestButtonComponent,
    DtButtonComponent,
    TranslateModule,
  ],
  templateUrl: './basic-car-modal.component.html',
  styleUrl: './basic-car-modal.component.scss',
})
export class BasicCarModalComponent implements OnDestroy {
  public dialogRef = inject(DialogRef<BasicCarDTO, BasicCarDTO>);
  public car: BasicCarDTO = inject(DIALOG_DATA);

  ngOnDestroy(): void {
    this.dialogRef.close(this.car);
  }

  public onCarAction(
    resp: FrontResponse<null>,
    car: BasicCarDTO,
    action: 'hasCar' | 'wantsCar' | 'deleteCar',
  ): void {
    const hasCar = action === 'hasCar' ? 1 : 0;
    const wantsCar = action === 'wantsCar' ? 1 : 0;
    if (resp.ok) {
      this.car = { ...car, hasCar, wantsCar };
    }
  }
}
