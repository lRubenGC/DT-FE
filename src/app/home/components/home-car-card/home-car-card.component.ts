import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dt-home-car-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-car-card.component.html',
  styleUrl: './home-car-card.component.scss',
})
export class HomeCarCardComponent {
  @Input() src: string = '';
  @Input() title: string = '';
  @Input() disabled: boolean = false;
}
