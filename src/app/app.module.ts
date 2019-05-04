import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { TrackerEventStateReducer } from './tracker-event-state.reducer';

import { TrackerComponent } from './tracker/tracker.component';
import { TrackerEventComponent } from './tracker-event/tracker-event.component';
import { TrackerEventDisplayComponent } from './tracker-event-display/tracker-event-display.component';
import { TrackerDebugComponent } from './tracker-debug/tracker-debug.component';
import { TrackerCarouselComponent } from './tracker-carousel/tracker-carousel.component';
import { TrackerCountdownClockComponent } from './tracker-countdown-clock/tracker-countdown-clock.component';
import { TrackerMenuComponent } from './tracker-menu/tracker-menu.component';
import { TrackerMessageListComponent } from './tracker-message-list/tracker-message-list.component';
import { TrackerSoldOutMessageComponent } from './tracker-sold-out-message/tracker-sold-out-message.component';
import { TrackerConfigComponent } from './tracker-config/tracker-config.component';
import { TrackerConfigEventComponent } from './tracker-config-event/tracker-config-event.component';
import { TrackerConfigListComponent } from './tracker-config-list/tracker-config-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    TrackerEventComponent,
    TrackerEventDisplayComponent,
    TrackerDebugComponent,
    TrackerCarouselComponent,
    TrackerCountdownClockComponent,
    TrackerMenuComponent,
    TrackerMessageListComponent,
    TrackerSoldOutMessageComponent,
    TrackerConfigComponent,
    TrackerConfigEventComponent,
    TrackerConfigListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ state: TrackerEventStateReducer }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }