import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCarouselComponent } from './tracker-carousel.component';

describe('TrackerCarouselComponent', () => {
  let component: TrackerCarouselComponent;
  let fixture: ComponentFixture<TrackerCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
