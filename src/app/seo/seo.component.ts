import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'dt-seo',
  standalone: true,
  imports: [],
  templateUrl: './seo.component.html',
  styleUrl: './seo.component.scss',
})
export class SeoComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.title.setTitle('My fancy page/route title. Ideal length 60-70 chars');
    this.meta.addTag({
      name: 'description',
      content: 'My fancy meta description. Ideal length 120-150 characters.',
    });
  }
}
