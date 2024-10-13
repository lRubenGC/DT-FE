import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { SeoComponent } from './seo/seo.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SeoComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      console.warn('browser');
      // Use document
    }
    if (isPlatformServer(this.platform)) {
      console.warn('server');
      // Use document injected (this.document)
    }
  }
}
