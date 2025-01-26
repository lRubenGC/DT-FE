import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'image-viewer',
    imports: [],
    templateUrl: './image-viewer.component.html',
    styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent {
  public dialogRef = inject(DialogRef<{ a: number }, { b: number }>);
  public src: string = inject(DIALOG_DATA);
}
