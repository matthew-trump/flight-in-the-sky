import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerMenuComponent } from './tracker-menu.component';

describe('TrackerMenuComponent', () => {
  let component: TrackerMenuComponent;
  let fixture: ComponentFixture<TrackerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
