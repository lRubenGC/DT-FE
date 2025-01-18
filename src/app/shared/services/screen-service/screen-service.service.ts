import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private readonly platform = inject(PLATFORM_ID);
  private widthSubject = new BehaviorSubject<number>(
    isPlatformBrowser(this.platform) ? window.innerWidth : 0,
  );
  private heightSubject = new BehaviorSubject<number>(
    isPlatformBrowser(this.platform) ? window.innerHeight : 0,
  );

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      fromEvent(window, 'resize').subscribe(() => {
        this.widthSubject.next(window.innerWidth);
        this.heightSubject.next(window.innerHeight);
      });
    }
  }

  get width$() {
    return this.widthSubject.asObservable();
  }

  get height$() {
    return this.heightSubject.asObservable();
  }

  get width(): number {
    return isPlatformBrowser(this.platform) ? window.innerWidth : 0;
  }

  get height(): number {
    return isPlatformBrowser(this.platform) ? window.innerHeight : 0;
  }
}
