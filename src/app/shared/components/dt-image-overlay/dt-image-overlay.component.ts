import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Input } from '@angular/core';
import { ScreenService } from '@shared/services/screen-service/screen-service.service';
import { ImageViewerComponent } from './components/image-viewer.component';

@Component({
  selector: 'dt-image-overlay',
  standalone: true,
  imports: [],
  templateUrl: './dt-image-overlay.component.html',
  styleUrl: './dt-image-overlay.component.scss',
})
export class DtImageOverlayComponent {
  @Input({ required: true }) src: string = '';

  private readonly screenService = inject(ScreenService);
  private readonly dialog = inject(Dialog);
  public enlargeImage() {
    const dialogRef: DialogRef<any, any> = this.dialog.open(
      ImageViewerComponent,
      {
        height: 'auto',
        width:
          this.screenService.width > 1440
            ? '60%'
            : this.screenService.width > 768
              ? '80%'
              : '100%',
        data: this.src,
      },
    );
  }
}
