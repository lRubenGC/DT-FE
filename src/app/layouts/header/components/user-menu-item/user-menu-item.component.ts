import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DT_ICONS } from '@shared/components/dt-button/dt-button.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'dt-user-menu-item',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './user-menu-item.component.html',
  styleUrl: './user-menu-item.component.scss',
})
export class UserMenuItemComponent {
  @Input() icon: DT_ICONS | null = null;
  @Output() onClick = new EventEmitter<void>();
}
