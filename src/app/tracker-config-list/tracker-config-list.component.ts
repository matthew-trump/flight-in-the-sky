import { Component, OnInit } from '@angular/core';

import { TrackerApplication } from '../tracker.application';
import tracker from "../../config/tracker.json";
import trackerEvents from "../../config/tracker-events.json";
@Component({
  selector: 'app-tracker-config-list',
  templateUrl: './tracker-config-list.component.html',
  styleUrls: ['./tracker-config-list.component.scss']
})
export class TrackerConfigListComponent implements OnInit {

  constructor() { }

  events: any[] = [];

  ngOnInit() {
    var events = trackerEvents;
    for (var id in events) {
      if (events.hasOwnProperty(id)) {
        var event = events[id];
        event.id = id;
        this.events.push(event);
      }
    }

  }

}

