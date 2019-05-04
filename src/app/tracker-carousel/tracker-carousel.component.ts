import { Component, Input, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { TrackerApplication } from '../tracker.application';
import * as Hammer from 'hammerjs';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';

interface TrackerAppState {
  state: any;
};

@Component({
  selector: 'app-tracker-carousel',
  templateUrl: './tracker-carousel.component.html',
  styleUrls: ['./tracker-carousel.component.scss']
})

export class TrackerCarouselComponent implements OnInit {
  @Input()
  event: TrackerApplication;

  state: any;

  state$: Observable<any>;


  images: any[] = [];
  active: number = 0;
  transition: string;
  pagination: boolean = true;

  currentCount: number = 0;

  refIndex: number = 0;

  firstUpdate: boolean = false;

  constructor(private store: Store<TrackerAppState>) {
    this.state$ = this.store.select('state');
  }

  ngOnInit() {
    this.state$.subscribe((state) => {
      this.state = state;
      //see DEPRECATED section below
      //this will NOT update images using the old enroute multi-image 
      //should add:    || this.state.enroute as in message list to make it work

      if (!this.firstUpdate || this.state.changeOfStage || this.state.becameDeterminate) {
        this.firstUpdate = true;
        this.updateImages();
      }

    });

    this.active = 0;



    let timerObj = timer(
      this.event.config.application.carouselDelay,
      this.event.config.application.carouselInterval
    );

    timerObj.subscribe(t => {
      this.refIndex = this.refIndex + 1;
      this.rotateActive();
      /**
      if(!this.event.config.application.carouselImageUpdateFrequency  || 
            (this.refIndex % this.event.config.application.carouselImageUpdateFrequency == 0)){
               this.updateImages();
      }
      **/
    });
  }

  public rotateActive() {

    if (!this.images) {
      return;
    }

    var increment = true;
    if (this.images[this.active]) {
      var countAs = this.images[this.active].countAs;

      if (countAs > 1) {
        if (this.currentCount < countAs) {
          this.currentCount = this.currentCount + 1;
          increment = false;
        } else {
          this.currentCount = 0;
        }
      }
    }
    if (increment) {
      this.incrementActiveImage(1)
    }


  }
  public panEnd(event: any) {
    if (event.direction == Hammer.DIRECTION_RIGHT) {
      this.incrementActiveImage(-1);
    } else if (event.direction == Hammer.DIRECTION_LEFT) {
      this.incrementActiveImage(1);
    }
  }

  public incrementActiveImage(increment: number) {

    var previousActive = this.active;
    this.active = this.active + increment;
    if (this.active < 0) {
      this.active = this.images.length - 1;
    } else if (this.active > this.images.length - 1) {
      this.active = 0;
    }
    if (this.images[previousActive]) {
      this.images[previousActive].active = false;
    }
    if (this.images[this.active]) {
      this.images[this.active].active = true;
    }

  }

  public updateImages() {
    if (!this.state || this.state.indeterminate) {
      return;
    }
    if (!this.event.config.carousel[this.state.stage]) {
      return;
    }
    let configured = this.event.config.carousel[this.state.stage].images;


    let images = [];

    if (configured) {
      for (var i = 0, len = configured.length; i < len; i++) {
        let image = configured[i];

        if (typeof image === 'string') {
          images.push({ src: image, active: i == 0, isEnrouteMap: false, countAs: 1 });
        } else {
          let type = image.type;
          /**
          //DEPRECATED
          if (type==='enroute') {
            let imageObjs = image.images;
            var src       = null;

           
                for (var j=0, len2=image.images.length; j<len2; j++) {
                  let obj = image.images[j];
                  let perc = obj[1];

                  if (perc < this.state.complete) {
                    src = obj[0];
                  } else {
                    break;
                  }
                }
     
            
            images.push({src: src, active: i == 0, isEnrouteMap : true, countAs : image.countAs });
          }else{
          **/
          images.push({ src: image.src, active: i == 0, isEnrouteMap: image.isEnrouteMap, countAs: image.countAs });
          /**
          }
          **/
        }
      }
    }
    if (!this.imagesEqual(images, this.images)) {
      this.images = images;
      this.active = 0;
    }
    this.transition = this.event.config.carousel[this.state.stage].transition;
    this.pagination = this.event.config.carousel[this.state.stage].pagination;

  }
  public imagesEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i].src !== b[i].src) return false;
    }
    return true;
  }
}
