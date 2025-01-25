import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';

interface DTOverlayOptions {
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
}

interface OverlayInputs {
  id: string;
  value: any;
}

@Injectable({
  providedIn: 'root',
})
export class DtOverlayService {
  private readonly overlay = inject(Overlay);

  public openOverlay(
    component: any,
    target: HTMLElement,
    props?: {
      positions?: ConnectedPosition;
      options?: DTOverlayOptions;
      inputs?: OverlayInputs[];
    },
  ) {
    const overlayRef = this.overlay.create({
      hasBackdrop: props?.options?.hasBackdrop ?? true,
      backdropClass:
        props?.options?.backdropClass ?? 'cdk-overlay-transparent-backdrop',
      panelClass: props?.options?.panelClass ?? 'shadow-xl',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: props?.positions?.originX ?? 'center',
            originY: props?.positions?.originY ?? 'bottom',
            overlayX: props?.positions?.overlayX ?? 'end',
            overlayY: props?.positions?.overlayY ?? 'top',
          },
        ]),
    });
    const componentPotal = new ComponentPortal(component);
    const componentRef = overlayRef.attach(componentPotal);
    props?.inputs?.forEach(({ id, value }) => componentRef.setInput(id, value));
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
