import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarsFiltersSkeletonComponent } from './basic-cars-filters-skeleton.component';

describe('BasicCarsFiltersSkeletonComponent', () => {
  let component: BasicCarsFiltersSkeletonComponent;
  let fixture: ComponentFixture<BasicCarsFiltersSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarsFiltersSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCarsFiltersSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
