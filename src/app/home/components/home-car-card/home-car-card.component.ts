import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'dt-home-car-card',
    imports: [CommonModule, RouterLink],
    templateUrl: './home-car-card.component.html',
    styleUrl: './home-car-card.component.scss'
})
export class HomeCarCardComponent {
  @Input() src: string = '';
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() href: string = '';
}
