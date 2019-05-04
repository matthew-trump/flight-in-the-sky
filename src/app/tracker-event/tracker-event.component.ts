import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { TrackerService } from '../tracker.service';
import { TrackerApplication } from '../tracker.application';

@Component({
  selector: 'app-tracker-event',
  templateUrl: './tracker-event.component.html',
  styleUrls: ['./tracker-event.component.scss']
})
export class TrackerEventComponent implements OnInit {


  event: TrackerApplication;
  time: any;
  debug: boolean;

  current: number;


  constructor(private route: ActivatedRoute, private trackerService: TrackerService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['event']) {

        this.event = this.trackerService.getApplication(params['event']);


        if (this.event) {

          this.trackerService.setEvent(this.event);

          this.debug = typeof this.route.snapshot.queryParams["debug"] !== 'undefined';
          this.event.debug = this.debug;

          var stage = this.route.snapshot.queryParams["stage"];

          if (stage) {

            this.event.simulationOffset = this.event.config.testData.times[stage] - new Date().getTime();
          } else {

            this.event.simulationOffset = 0;
          }

          let timerObj = timer(this.event.config.application.eventStateTimerDelay, this.event.config.application.eventStateTimerInterval);


          timerObj.subscribe(t => {
            this.current = Date.now() + this.event.simulationOffset;
            this.trackerService.updateState(this.event, this.current);
          });

        }

      }

    });
  }

}

