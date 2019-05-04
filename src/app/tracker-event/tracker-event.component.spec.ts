import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerEventComponent } from './tracker-event.component';

describe('TrackerEventComponent', () => {
  let component: TrackerEventComponent;
  let fixture: ComponentFixture<TrackerEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
