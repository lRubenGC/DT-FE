import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface SelectButtonOptions {
  active: boolean;
  label: string;
}

@Component({
  selector: 'dt-select-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dt-select-button.component.html',
  styleUrl: './dt-select-button.component.scss',
})
export class DtSelectButtonComponent {
  @Input({ required: true }) options: SelectButtonOptions[] | null = [];
}
