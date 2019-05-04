import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { TrackerService } from '../tracker.service';
import { TrackerApplication } from '../tracker.application';


@Component({
  selector: 'app-tracker-config-event',
  templateUrl: './tracker-config-event.component.html',
  styleUrls: ['./tracker-config-event.component.scss']
})
export class TrackerConfigEventComponent implements OnInit {

  event: TrackerApplication;
  timeKeys: any[];

  constructor(private route: ActivatedRoute, private trackerService: TrackerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['event']) {

        this.event = this.trackerService.getApplication(params['event']);


        if (this.event) {
          this.timeKeys = Object.keys(this.event.config.testData.times);

        }
      }
    });
  }

}
