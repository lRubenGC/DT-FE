import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type DT_LANGS = 'en' | 'es' | 'pt';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // private readonly cookie = inject(SsrCookieService);
  private readonly translate = inject(TranslateService);
  public currentLang: DT_LANGS = 'en';
  public changeLang(lang: DT_LANGS): void {
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    this.currentLang = lang;
    // this.cookie.set('lang', lang);
  }
}
