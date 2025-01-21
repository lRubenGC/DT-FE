import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DtButtonComponent } from '../../shared/components/dt-button/dt-button.component';

@Component({
  selector: 'dt-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink, DtButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  openDiscord() {
    console.log('Si si ahora se abre tranqui');
  }
}
