import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpRequest,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: (req: HttpRequest<unknown>) => true,
        includeHeaders: [],
        includePostRequests: true,
      })
    ),
    provideHttpClient(withFetch()),
    provideHttpClient(),
    provideAngularSvgIcon(),
  ],
};
