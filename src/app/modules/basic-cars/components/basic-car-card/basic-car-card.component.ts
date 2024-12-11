import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'dt-basic-car-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-car-card.component.html',
  styleUrl: './basic-car-card.component.scss',
})
export class BasicCarCardComponent {
  @Input({ required: true, alias: 'car' }) set carSetter(v: BasicCarDTO) {
    this.car$.next(v);
  }
  public car$ = new ReplaySubject<BasicCarDTO>(1);
}
