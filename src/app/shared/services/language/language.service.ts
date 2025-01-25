import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export type DT_LANGS = 'en' | 'es' | 'pt';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly cookie = inject(SsrCookieService);
  private readonly translate = inject(TranslateService);
  public changeLang(lang: DT_LANGS): void {
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 100);
    this.cookie.set('lang', lang, { expires });
  }
}
