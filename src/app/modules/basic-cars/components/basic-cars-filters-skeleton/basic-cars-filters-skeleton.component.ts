import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DtInputDropdownComponent } from '@shared/components/dt-input-dropdown/dt-input-dropdown.component';

@Component({
  selector: 'basic-cars-filters-skeleton',
  standalone: true,
  imports: [DtInputDropdownComponent, TranslateModule],
  templateUrl: './basic-cars-filters-skeleton.component.html',
  styleUrl: './basic-cars-filters-skeleton.component.scss',
})
export class BasicCarsFiltersSkeletonComponent {}
