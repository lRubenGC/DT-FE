import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCarsCarsSkeletonComponent } from './basic-cars-cars-skeleton.component';

describe('BasicCarsCarsSkeletonComponent', () => {
  let component: BasicCarsCarsSkeletonComponent;
  let fixture: ComponentFixture<BasicCarsCarsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCarsCarsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCarsCarsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
