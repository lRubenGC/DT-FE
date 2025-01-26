import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CrudService, FrontResponse } from '@shared/services/crud/crud.service';
import { map, merge, shareReplay, Subject, switchMap, tap } from 'rxjs';
import {
  DT_ICONS,
  DtButtonComponent,
  SAFELIST_COLORS,
} from '../dt-button/dt-button.component';

@Component({
    selector: 'dt-request-button',
    imports: [CommonModule, DtButtonComponent],
    templateUrl: './dt-request-button.component.html',
    styleUrl: './dt-request-button.component.scss'
})
export class DtRequestButtonComponent<
  TBody extends object,
  TResponse extends object,
> {
  //#region INPUTS
  @Input({ required: true }) endpoint!: string;
  @Input({ required: true }) body!: TBody;
  @Input() icon: DT_ICONS | null = null;
  @Input() iconFill: string = '#202020';
  @Input() buttonColor: SAFELIST_COLORS = 'orange';
  @Input() buttonClass: string = '';
  @Input() header: string = '';
  @Input() headerClass: string = '';
  @Input() title: string | null = null;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() onResponse = new EventEmitter<FrontResponse<TResponse>>();
  //#endregion OUTPUTS

  //#region SERVICES
  private readonly http = inject(CrudService);
  //#endregion SERVICES

  //#region ON CLICK
  public onClick = new Subject<void>();
  public onClick$ = this.onClick.pipe(
    switchMap(() => this.http.post<TBody, TResponse>(this.endpoint, this.body)),
    tap((resp) => this.onResponse.emit(resp)),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  //#endregion ON CLICK

  //#region LOADING
  public loading$ = merge(
    this.onClick.pipe(map(() => true)),
    this.onClick$.pipe(map(() => false)),
  );
  //#endregion LOADING
}
