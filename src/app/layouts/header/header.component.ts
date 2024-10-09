import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { DcButtonComponent } from '@shared/components/dc-button/dc-button.component';

@Component({
  selector: 'dt-header',
  standalone: true,
  imports: [TranslocoDirective, DcButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
