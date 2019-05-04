import { Component, Input, OnInit } from '@angular/core';


import { TrackerApplication } from '../tracker.application';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';

interface TrackerAppState {
  state: any;
};

@Component({
  selector: 'app-tracker-countdown-clock',
  templateUrl: './tracker-countdown-clock.component.html',
  styleUrls: ['./tracker-countdown-clock.component.scss']
})
export class TrackerCountdownClockComponent implements OnInit {


  @Input()
  event: TrackerApplication;

  state: any;

  state$: Observable<any>;

  current: number = 0;

  countdown: any = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",

    days1: "0",
    days2: "0",
    hours1: "0",
    hours2: "0",
    minutes1: "0",
    minutes2: "0",
    seconds1: "0",
    seconds2: "0"

  };

  fields: any = {
    days: true,
    hours: true,
    minutes: true,
    seconds: true,

    days1: true,
    days2: true,
    hours1: true,
    hours2: true,
    minutes1: true,
    minutes2: true,
    seconds1: true,
    seconds2: true
  }





  constructor(private store: Store<TrackerAppState>) {
    this.state$ = this.store.select('state');
  }



  ngOnInit() {

    this.state$.subscribe((state) => {
      this.state = state;
    });

    //should unsubscribe: https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription/41177163
    let timerObj = timer(0, this.event.config.application.clockInterval);

    timerObj.subscribe(t => {


      this.setCurrentTime();
      this.refreshCountdown();
      this.refreshFields();
    });

  }
  public setCurrentTime() {
    if (this.state.stage === 'landed'
      || (this.current < 0 && this.state.linger)) {
      this.current = 0;
    } else {
      this.current = this.state.arrivalTime - this.state.timeRequested;
    }
  }
  public refreshCountdown() {

    var date = new Date(this.current);


    var days = date.getUTCDate() - 1;
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();

    if (days < 10) {
      this.countdown.days = "0" + String(days);
    } else {
      this.countdown.days = String(days);
    }

    if (hours < 10) {
      this.countdown.hours = "0" + String(hours);
    } else {
      this.countdown.hours = String(hours);
    }

    if (minutes < 10) {
      this.countdown.minutes = "0" + String(minutes);
    } else {
      this.countdown.minutes = String(minutes);
    }

    if (seconds < 10) {
      this.countdown.seconds = "0" + String(seconds);
    } else {
      this.countdown.seconds = String(seconds);
    }


    this.countdown.days1 = this.countdown.days.substring(0, 1);
    this.countdown.days2 = this.countdown.days.substring(1, 2);
    this.countdown.hours1 = this.countdown.hours.substring(0, 1);
    this.countdown.hours2 = this.countdown.hours.substring(1, 2);

    this.countdown.minutes1 = this.countdown.minutes.substring(0, 1);
    this.countdown.minutes2 = this.countdown.minutes.substring(1, 2);

    this.countdown.seconds1 = this.countdown.seconds.substring(0, 1);
    this.countdown.seconds2 = this.countdown.seconds.substring(1, 2);

  }
  public refreshFields() {
    this.fields.days = this.countdown.days !== "00";
    this.fields.hours = this.fields.days || this.countdown.hours !== "00";
    this.fields.minutes = this.fields.hours || this.countdown.minutes !== "00";
    this.fields.seconds = this.fields.minutes || this.countdown.seconds !== "00";


    this.fields.days1 = this.countdown.days1 !== "0";
    this.fields.days2 = this.fields.days1 || this.countdown.days2 !== "0";

    this.fields.hours1 = this.fields.days2 || this.countdown.hours1 !== "0";
    this.fields.hours2 = this.fields.hours1 || this.countdown.hours2 !== "0";

    this.fields.minutes1 = this.fields.hours2 || this.countdown.minutes1 !== "0";
    this.fields.minutes2 = this.fields.minutes1 || this.countdown.minutes2 !== "0";

    this.fields.seconds1 = this.fields.minutes2 || this.countdown.seconds1 !== "0";
    this.fields.seconds2 = this.fields.seconds1 || this.countdown.seconds2 !== "0";


  }

}