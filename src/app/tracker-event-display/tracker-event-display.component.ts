import { Component, Input, OnInit } from '@angular/core';

import { TrackerApplication } from '../tracker.application';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface TrackerAppState {
  state: any;
};

@Component({
  selector: 'app-tracker-event-display',
  templateUrl: './tracker-event-display.component.html',
  styleUrls: ['./tracker-event-display.component.scss']
})
export class TrackerEventDisplayComponent implements OnInit {

  @Input()
  event: TrackerApplication;

  state: Observable<any>;

  display: any = {};

  constructor(private store: Store<TrackerAppState>) {
    this.state = this.store.select('state');
  }

  ngOnInit() {
    this.display = this.event.config.display;
  }

}
