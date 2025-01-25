import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  DT_LANGS,
  LanguageService,
} from '@shared/services/language/language.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { ErrorToastComponent } from './errors/components/error-toast/error-toast.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SeoComponent } from './seo/seo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SeoComponent,
    HeaderComponent,
    RouterOutlet,
    ErrorToastComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // private readonly platform = inject(PLATFORM_ID);
  // private readonly document = inject(DOCUMENT);
  private readonly cookie = inject(SsrCookieService);
  private readonly language = inject(LanguageService);

  constructor() {
    this.language.changeLang((this.cookie.get('lang') as DT_LANGS) || 'en');
    // if (isPlatformBrowser(this.platform)) {
    //   console.warn('browser');
    //   // Use document
    // }
    // if (isPlatformServer(this.platform)) {
    //   console.warn('server');
    //   // Use document injected (this.document)
    // }
  }
}
