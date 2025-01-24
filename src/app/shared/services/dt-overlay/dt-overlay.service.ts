import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';

export interface DTOverlayOptions {
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DtOverlayService {
  private readonly overlay = inject(Overlay);

  openOverlay(
    component: any,
    target: HTMLElement,
    positions?: ConnectedPosition,
    options?: DTOverlayOptions,
  ) {
    const overlayRef = this.overlay.create({
      hasBackdrop: options?.hasBackdrop ?? true,
      backdropClass:
        options?.backdropClass ?? 'cdk-overlay-transparent-backdrop',
      panelClass: options?.panelClass ?? 'shadow-xl',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: positions?.originX ?? 'center',
            originY: positions?.originY ?? 'bottom',
            overlayX: positions?.overlayX ?? 'end',
            overlayY: positions?.overlayY ?? 'top',
          },
        ]),
    });
    const componentPotal = new ComponentPortal(component);
    const componentRef = overlayRef.attach(componentPotal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
