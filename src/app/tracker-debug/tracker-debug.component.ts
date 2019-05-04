import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TrackerApplication } from '../tracker.application';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";



interface TrackerAppState {
  state: any;
};

@Component({
  selector: 'app-tracker-debug',
  templateUrl: './tracker-debug.component.html',
  styleUrls: ['./tracker-debug.component.scss']
})
export class TrackerDebugComponent implements OnInit, OnDestroy {

  @Input()
  event: TrackerApplication;

  state: Observable<any>;
  private subscription: Subscription;


  direction: string;

  compass: Array<string> = [
    "N", "NbE", "NNE", "NEbN", "NE", "NEbE", "ENE", "EbN", "E", "EbS", "ESE", "SEbE", "SE", "SEbS", "SSE", "SbE",
    "S", "SbW", "SSW", "SWbS", "SW", "SWbW", "WSW", "WbS", "W", "WbN", "WNW", "NWbW", "NW", "NWbN", "NNW", "NbW", "N"
  ];

  constructor(private store: Store<TrackerAppState>) {
    this.state = this.store.select('state');
  }

  ngOnInit() {
    this.state.subscribe((state) => {
      if (state.stage === 'enroute' && state.enroute) {


        let mult = Math.floor(((state.enroute.heading * 1.0) + 5.625) / 11.25);


        this.direction = mult >= 0 && mult < this.compass.length ? this.compass[mult] : "";


      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

