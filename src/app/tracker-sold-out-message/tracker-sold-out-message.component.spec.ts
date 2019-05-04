import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerSoldOutMessageComponent } from './tracker-sold-out-message.component';

describe('TrackerSoldOutMessageComponent', () => {
  let component: TrackerSoldOutMessageComponent;
  let fixture: ComponentFixture<TrackerSoldOutMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerSoldOutMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerSoldOutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
