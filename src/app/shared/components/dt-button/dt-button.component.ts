import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type DT_ICONS = 'close' | 'search';

@Component({
  selector: 'dt-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dt-button.component.html',
  styleUrl: './dt-button.component.scss',
})
export class DtButtonComponent {
  @Input({ required: true }) type!: 'icon' | 'button';
  @Input() header: string = '';
  @Input() icon: DT_ICONS | null = null;
  @Input() title: string | null = null;
  @Input() buttonClass: string = '';
}
