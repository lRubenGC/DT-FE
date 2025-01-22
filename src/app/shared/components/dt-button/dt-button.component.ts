import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  | 'discord'
  | 'error'
  | 'eye-close'
  | 'eye-open'
  | 'favorite'
  | 'lock'
  | 'mail'
  | 'open-in-full'
  | 'search'
  | 'user';

// Para añadir colores, ir a tailwind.config.js y añadirlos en la safelist
export type SAFELIST_COLORS =
  | 'orange'
  | 'yellow'
  | 'green'
  | 'sky'
  | 'red'
  | 'transparent';

@Component({
  selector: 'dt-button',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterLink],
  templateUrl: './dt-button.component.html',
  styleUrl: './dt-button.component.scss',
})
export class DtButtonComponent {
  //#region INPUTS
  @Input({ required: true }) type!: 'icon' | 'button' | 'link';
  @Input() header: string = '';
  @Input() icon: DT_ICONS | null = null;
  @Input() title: string | null = null;
  @Input() buttonColor: SAFELIST_COLORS = 'orange';
  @Input() buttonClass: string = '';
  @Input() headerClass: string = '';
  @Input() iconFill: string = '#202020';
  @Input() iconSize: string = '24px';
  @Input() href: string = '';
  @Input() isInternalRoute: boolean = true;
  @Input() hrefId: number = 0;
  @Input() target: '_self' | '_blank' = '_self';
  @Input({ alias: 'loading' }) set loadingSetter(v: boolean | null) {
    if (v === null) return;
    this.loading$.next(v);
  }
  public loading$ = new BehaviorSubject<boolean>(false);
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() onClick = new EventEmitter<void>();
  //#endregion OUTPUTS

  public onButtonClick(event: Event) {
    event.stopPropagation();
    this.onClick.emit();
  }
}
