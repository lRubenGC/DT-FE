import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'en' | 'es';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // private readonly cookie = inject(SsrCookieService);
  private readonly translate = inject(TranslateService);
  public currentLang: Lang = 'en';
  public changeLang(lang: Lang): void {
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    this.currentLang = lang;
    // this.cookie.set('lang', lang);
  }
}
