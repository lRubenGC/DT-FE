import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';

@Component({
  selector: 'basic-car-modal',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './basic-car-modal.component.html',
  styleUrl: './basic-car-modal.component.scss',
})
export class BasicCarModalComponent {
  public dialogRef = inject<DialogRef<BasicCarDTO>>(DialogRef<BasicCarDTO>);
  public car: BasicCarDTO = inject(DIALOG_DATA);
}
