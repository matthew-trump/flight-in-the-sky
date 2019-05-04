import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerMessageListComponent } from './tracker-message-list.component';

describe('TrackerMessageListComponent', () => {
  let component: TrackerMessageListComponent;
  let fixture: ComponentFixture<TrackerMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
