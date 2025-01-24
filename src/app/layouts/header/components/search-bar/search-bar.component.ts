import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DtButtonComponent } from '@shared/components/dt-button/dt-button.component';
import { DtInputTextComponent } from '@shared/components/dt-input-text/dt-input-text.component';

@Component({
  selector: 'dt-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    DtInputTextComponent,
    DtButtonComponent,
    TranslateModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  public searchCar(event: Event): void {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    if (!value) return;
    console.log(value);
  }
}
