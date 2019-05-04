import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCountdownClockComponent } from './tracker-countdown-clock.component';

describe('TrackerCountdownClockComponent', () => {
  let component: TrackerCountdownClockComponent;
  let fixture: ComponentFixture<TrackerCountdownClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCountdownClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCountdownClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
