import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDebugComponent } from './tracker-debug.component';

describe('TrackerDebugComponent', () => {
  let component: TrackerDebugComponent;
  let fixture: ComponentFixture<TrackerDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
