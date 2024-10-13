import { Component } from '@angular/core';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';

@Component({
  selector: 'dt-search-bar',
  standalone: true,
  imports: [DtButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {}
