import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerEventDisplayComponent } from './tracker-event-display.component';

describe('TrackerEventDisplayComponent', () => {
  let component: TrackerEventDisplayComponent;
  let fixture: ComponentFixture<TrackerEventDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerEventDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerEventDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
