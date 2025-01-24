import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

export type RRSS_ICONS = 'discord-colored' | 'buy-me-a-coffee-colored';

@Component({
  selector: 'dt-rrss-icon',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './rrss-icon.component.html',
  styleUrl: './rrss-icon.component.scss',
})
export class DtRrssIconComponent {
  @Input() icon: RRSS_ICONS | null = null;
  @Input() title: string = '';
  @Input() href: string = '';
  @Input() iconSize: string = '24px';
}
