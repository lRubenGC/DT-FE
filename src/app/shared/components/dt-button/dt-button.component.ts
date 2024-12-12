import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BehaviorSubject } from 'rxjs';

export type DT_ICONS =
  | 'add'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'close'
  | 'delete'
  | 'favorite'
  | 'open-in-full'
  | 'search';

// Para añadir colores, ir a tailwind.config.js y añadirlos en la safelist
export type SAFELIST_COLORS = 'orange' | 'yellow' | 'green' | 'sky' | 'red';

@Component({
  selector: 'dt-button',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './dt-button.component.html',
  styleUrl: './dt-button.component.scss',
})
export class DtButtonComponent {
  //#region INPUTS
  @Input({ required: true }) type!: 'icon' | 'button';
  @Input() header: string = '';
  @Input() icon: DT_ICONS | null = null;
  @Input() title: string | null = null;
  @Input() buttonColor: SAFELIST_COLORS = 'orange';
  @Input() buttonClass: string = '';
  @Input() iconFill: string = '#202020';
  @Input({ alias: 'loading' }) set loadingSetter(v: boolean | null) {
    if (!v) return;
    this.loading$.next(v);
  }
  public loading$ = new BehaviorSubject<boolean>(false);
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() onClick = new EventEmitter<void>();
  //#endregion OUTPUTS
}
