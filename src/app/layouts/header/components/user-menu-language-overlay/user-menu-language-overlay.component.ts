import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserMenuItemComponent } from '../user-menu-item/user-menu-item.component';

@Component({
  selector: 'user-menu-language-overlay',
  standalone: true,
  imports: [TranslateModule, UserMenuItemComponent],
  templateUrl: './user-menu-language-overlay.component.html',
  styleUrl: './user-menu-language-overlay.component.scss',
})
export class UserMenuLanguageOverlayComponent {
  public changeLanguage(lang: string) {}
}
