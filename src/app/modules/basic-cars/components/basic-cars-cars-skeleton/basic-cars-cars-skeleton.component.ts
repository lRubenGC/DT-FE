import { Component } from '@angular/core';
import { getRandomNumberBetween } from '@shared/helpers/utils';

@Component({
    selector: 'basic-cars-cars-skeleton',
    imports: [],
    templateUrl: './basic-cars-cars-skeleton.component.html',
    styleUrl: './basic-cars-cars-skeleton.component.scss'
})
export class BasicCarsCarsSkeletonComponent {
  public readonly RANDOM_GROUPS = this.generateRandomGroups();

  generateRandomGroups(): { itemsLength: number[] }[] {
    const groupsLength = getRandomNumberBetween(1, 3);
    return Array.from({ length: groupsLength }).map(() => ({
      itemsLength: Array.from(
        { length: getRandomNumberBetween(2, 6) },
        () => 0,
      ),
    }));
  }
}
