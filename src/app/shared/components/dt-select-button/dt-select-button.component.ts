import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface SelectButtonOptions {
  id: string;
  active: boolean;
  label: string;
}

@Component({
  selector: 'dt-select-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './dt-select-button.component.html',
  styleUrl: './dt-select-button.component.scss',
})
export class DtSelectButtonComponent {
  @Input({ required: true }) options: SelectButtonOptions[] | null = [];
  @Output() optionSelected = new EventEmitter<string>();
}
