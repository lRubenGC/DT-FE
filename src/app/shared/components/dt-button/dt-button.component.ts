import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

export type DT_ICONS =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'close'
  | 'search';

@Component({
  selector: 'dt-button',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './dt-button.component.html',
  styleUrl: './dt-button.component.scss',
})
export class DtButtonComponent {
  @Input({ required: true }) type!: 'icon' | 'button';
  @Input() header: string = '';
  @Input() icon: DT_ICONS | null = null;
  @Input() title: string | null = null;
  @Input() buttonClass: string = '';
  @Input() iconFill: string = '#202020';
  @Output() onClick = new EventEmitter<void>();
}
