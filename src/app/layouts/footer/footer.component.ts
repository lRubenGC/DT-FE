import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DISCORD_INVITATION } from '@shared/models/urls.constants';
import { DtButtonComponent } from '../../shared/components/dt-button/dt-button.component';

@Component({
  selector: 'dt-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink, DtButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  //#region DISCORD
  public readonly DISCORD_INVITATION = DISCORD_INVITATION;
  public isDiscordHovered: boolean = false;
  //#endregion DISCORD
}
