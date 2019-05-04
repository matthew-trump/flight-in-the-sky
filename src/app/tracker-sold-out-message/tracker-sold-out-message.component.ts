import { Component, Input, OnInit } from '@angular/core';


import { TrackerService } from '../tracker.service';
import { TrackerApplication } from '../tracker.application';


@Component({
  selector: 'app-tracker-sold-out-message',
  templateUrl: './tracker-sold-out-message.component.html',
  styleUrls: ['./tracker-sold-out-message.component.scss']
})
export class TrackerSoldOutMessageComponent implements OnInit {

  @Input()
  event: TrackerApplication;

  @Input()
  flightIndex: number;

  messages: any = {};
  eventIsOver: boolean = false;

  constructor() { }

  ngOnInit() {
    var messages;
    this.eventIsOver = this.flightIndex == this.event.config.flights.length - 1;

    if (this.flightIndex < this.event.config.flights.length) {
      messages = this.event.config.soldout.messages[this.flightIndex];
    } else if (this.eventIsOver) {
      messages = this.event.config.soldout.messages[this.event.config.soldout.messages.length - 1];
    } else {
      messages = this.event.config.soldout.messages[0];
    }

    if (!messages) {
      messages = this.event.config.soldout.messages[0];
    }
    this.messages = messages;

  }



}
