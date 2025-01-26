import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserMenuItemComponent } from '../user-menu-item/user-menu-item.component';
import {
  DT_LANGS,
  LanguageService,
} from '@shared/services/language/language.service';

@Component({
    selector: 'user-menu-language-overlay',
    imports: [TranslateModule, UserMenuItemComponent],
    templateUrl: './user-menu-language-overlay.component.html',
    styleUrl: './user-menu-language-overlay.component.scss'
})
export class UserMenuLanguageOverlayComponent {
  private readonly languageService = inject(LanguageService);
  public changeLanguage(lang: DT_LANGS) {
    this.languageService.changeLang(lang);
  }
}
