import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DtRrssIconComponent } from '@shared/components/rrss-icon/rrss-icon.component';
import {
  BUY_ME_A_COFFEE_LINK,
  DISCORD_LINK,
} from '@shared/models/urls.constants';

@Component({
  selector: 'dt-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink, DtRrssIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public readonly DISCORD_LINK = DISCORD_LINK;
  public readonly BUY_ME_A_COFFEE_LINK = BUY_ME_A_COFFEE_LINK;
}
