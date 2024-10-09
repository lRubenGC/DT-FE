import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'dc-button',
  standalone: true,
  imports: [],
  templateUrl: './dc-button.component.html',
  styleUrl: './dc-button.component.scss',
})
export class DcButtonComponent {
  @Input({ required: true }) header!: string;
  @Input('bgColor') set bgColorSetter(v: string | null) {
    if (!v) {
      this.bgColor$.next('primary');
    } else {
      this.bgColor$.next(v);
    }
  }
  public bgColor$ = new Subject<string>();
  @Input() title: string | null = null;
}
