import { Component, Input, OnInit } from '@angular/core';
import { TrackerApplication } from '../tracker.application';

@Component({
  selector: 'app-tracker-menu',
  templateUrl: './tracker-menu.component.html',
  styleUrls: ['./tracker-menu.component.scss']
})
export class TrackerMenuComponent implements OnInit {


  @Input()
  event: TrackerApplication;


  menu: any = {};

  constructor() { }


  ngOnInit() {
    this.menu = this.event.config.menu;

  }

}
