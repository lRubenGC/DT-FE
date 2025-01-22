import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { DISCORD_INVITATION } from '@shared/models/urls.constants';
import { DtButtonComponent } from '../../../shared/components/dt-button/dt-button.component';
import { HomeCarCardComponent } from '../../components/home-car-card/home-car-card.component';

@Component({
  selector: 'dt-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DtButtonComponent,
    HomeCarCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public readonly DISCORD_INVITATION = DISCORD_INVITATION;
  private readonly authService = inject(AuthService);
  public userProfile$ = this.authService.userProfile$;
}
