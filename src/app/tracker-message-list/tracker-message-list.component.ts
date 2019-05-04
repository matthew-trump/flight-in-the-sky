import { Component, Input, OnInit } from '@angular/core';

import { TrackerApplication } from '../tracker.application';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface TrackerAppState {
  state: any;
};

@Component({
  selector: 'app-tracker-message-list',
  templateUrl: './tracker-message-list.component.html',
  styleUrls: ['./tracker-message-list.component.scss']
})
export class TrackerMessageListComponent implements OnInit {

  @Input()
  event: TrackerApplication;


  state: any;

  state$: Observable<any>;

  messages: any[];

  current: number;

  selectedIndex: number = 0;



  constructor(private store: Store<TrackerAppState>) {
    this.state$ = this.store.select('state');
  }

  ngOnInit() {

    this.state$.subscribe((state) => {

      this.state = state;

      if (this.state.changeOfStage || this.state.becameDeterminate || this.state.enroute) {
        this.current = Date.now() + this.event.simulationOffset;
        this.refreshMessageList();
      }
    });
  }

  public getAltitudeInFeet() {
    if (!this.state.enroute || !this.event.config.application.messageSubstitution) {
      return '30,000';
    }
    var s = String(this.state.enroute.altitude * 100);
    var len = s.length;
    if (len > 3) {
      return s.slice(0, len - 3) + ',' + s.slice(len - 3);
    } else {
      return s;
    }
  }
  public refreshMessageList() {


    var index = -2;


    this.messages = this.state.enroute ?
      this.event.config.messageListMessages[this.state.stage].map((obj) => {
        return obj.substitute ? Object.assign({}, obj, {
          message: obj.message
            .replace('ALTITUDE_IN_FEET', this.getAltitudeInFeet())
        }) : obj;
      }) : this.event.config.messageListMessages[this.state.stage];

    if (this.messages) {
      for (var i = 0, len = this.messages.length; i < len; i++) {

        let message = this.messages[i];

        var timeAfter = null;
        var dateAfter = null;

        if (typeof message.timeRemaining !== 'undefined') {
          if (message.timeRemaining != -1) {

            let timeRemaining = message.timeRemaining.split(":");

            let milliseconds = parseInt(timeRemaining[0]) * 3600000 + parseInt(timeRemaining[1]) * 60000;

            var refTime = this.state[message.relativeTo];

            timeAfter = refTime - milliseconds;
            dateAfter = new Date(timeAfter);

          } else {
            timeAfter = Number.MAX_SAFE_INTEGER;
          }


        } else if (typeof message.complete !== 'undefined') {

          if (message.complete < 0.0) {
            timeAfter = 0;
          } else if (typeof this.state.totalFlightTime !== 'undefined') {

            timeAfter = this.state.departureTime + (message.complete * this.state.totalFlightTime);
            dateAfter = new Date(timeAfter);
          }

        } else if (typeof message.dateAfter !== 'undefined') {

          dateAfter = message.dateAfter;
          timeAfter = Date.parse(dateAfter);
        }

        if (timeAfter !== null && this.messages[i]) {

          this.messages[i].active = false;
        }


        this.messages[i].active = false;
        if (index == -2 && !this.state.indeterminate) {

          if (this.current < timeAfter) {
            index = i - 1;
            this.messages[i - 1].active = true;
          } else if (i == len - 1) {
            index = i;
            this.messages[i].active = true;
          }
        }

      }
    }
    this.selectedIndex = index;

  }


}

