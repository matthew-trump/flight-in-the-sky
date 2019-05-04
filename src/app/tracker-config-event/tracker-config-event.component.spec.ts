import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerConfigEventComponent } from './tracker-config-event.component';

describe('TrackerConfigEventComponent', () => {
  let component: TrackerConfigEventComponent;
  let fixture: ComponentFixture<TrackerConfigEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerConfigEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerConfigEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
