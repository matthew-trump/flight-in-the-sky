import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerConfigListComponent } from './tracker-config-list.component';

describe('TrackerConfigListComponent', () => {
  let component: TrackerConfigListComponent;
  let fixture: ComponentFixture<TrackerConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
