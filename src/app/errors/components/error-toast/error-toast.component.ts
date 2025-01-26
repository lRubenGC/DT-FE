import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { fadeAnimation } from '@shared/animations/fade';
import { merge, Subject, switchMap, timer } from 'rxjs';
import { DtButtonComponent } from '../../../shared/components/dt-button/dt-button.component';
import { ErrorsService } from '../../services/errors.service';

@Component({
    selector: 'dt-error-toast',
    imports: [CommonModule, DtButtonComponent, TranslateModule],
    templateUrl: './error-toast.component.html',
    styleUrl: './error-toast.component.scss',
    animations: [fadeAnimation]
})
export class ErrorToastComponent {
  private readonly errorsService = inject(ErrorsService);
  public errors$ = this.errorsService.errors;

  //#region VISIBILITY
  private open$ = this.errors$;
  public close = new Subject<void>();
  private close$ = merge(
    this.close,
    this.open$.pipe(switchMap(() => timer(3000))),
  );
  public visible$ = merge(this.open$, this.close$);
  //#endregion VISIBILITY
}
