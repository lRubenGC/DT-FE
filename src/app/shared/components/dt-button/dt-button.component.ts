import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'dt-button',
  standalone: true,
  imports: [],
  templateUrl: './dt-button.component.html',
  styleUrl: './dt-button.component.scss',
})
export class DtButtonComponent {
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
