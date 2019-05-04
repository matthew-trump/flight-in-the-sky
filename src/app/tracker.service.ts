import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';


import { TrackerApplication } from './tracker.application';
import { TrackerEventState } from './tracker-event-state';
import * as TrackerEventStateActions from './tracker-event-state.actions';

import trackerThemes from "../config/tracker.json";
import trackerEvents from "../config/tracker-events.json";
import trackerTests from "../config/tracker-tests.json";


@Injectable({
    providedIn: 'root'
})
export class TrackerService {

    timer: any;
    events: any = {};


    constructor(private http: HttpClient,
        private store: Store<TrackerEventState>,
        private db: AngularFireDatabase,
        private auth: AngularFireAuth) {
        /**
        We are not using Firebase auth at the moment. If desired, this is configuration should be added in environment.ts
        firebaseUser: {
          username: 'zeke@thebriga.de',
          password: 'fleisch4Giant!verite'
        }
        and this code should be uncommented here
        auth.auth.signInWithEmailAndPassword(environment.firebaseUser.username,environment.firebaseUser.password).then((user)=>{}).catch(()=>{
          console.log("Firebase authentication failed:",environment.firebaseUser.username);
        });
        **/
    }

    getApplication(id: any) {
        let config = trackerEvents[id];
        if (!config) {
            return null;
        }
        if (typeof this.events[id] === 'undefined') {
            this.events[id] = new TrackerApplication(id, config, trackerThemes, trackerTests);
        }
        return this.events[id];
    }
    public setEvent(event: TrackerApplication) {
        this.db.object('/events/' + event.id).valueChanges().subscribe((eventR: any) => {
            console.log("EVENT", eventR);
            if (eventR) {
                if (eventR.flights && eventR.flights[eventR.currentFlightIndex]) {
                    console.log("FB", event.id, eventR.currentFlightIndex, eventR.flights[eventR.currentFlightIndex]);
                    this.updateFlightValues(event, eventR.flights[eventR.currentFlightIndex]);
                }
            }



        });
    }

    public updateState(event: TrackerApplication, current: number) {


        for (var i = 0, len = event.config.flights.length; i < len; i++) {

            let flightIndex = i;
            let flight = event.config.flights[flightIndex];


            let timeDeparture = flight.departureTime;
            let timeTakeoff = flight.takeoffTime;
            let timeEstimatedLanding = flight.estimatedLandingTime;
            let timeArrival = flight.arrivalTime;

            let availableFor = (typeof flight.availableFor !== 'undefined') ? flight.availableFor : event.config.application.timeAfterArrivalUntilSoldOut;
            let soldOutFor = (typeof flight.soldOutFor !== 'undefined') ? flight.soldOutFor : event.config.application.timeShowingSoldOut;


            if (current < (timeDeparture - event.config.application.preflightThreshold)) {
                if (flightIndex == 0) {

                    let state = {
                        stage: 'countdown',
                        components: event.config.components['countdown'],
                        departureTime: timeDeparture,
                        arrivalTime: timeArrival,
                        timeRequested: current,
                        flightIndex: flightIndex
                    };
                    this.store.dispatch(new TrackerEventStateActions.Update(state));
                    return state;
                } else {

                    let state = {
                        stage: 'recountdown',
                        components: event.config.components['recountdown'],
                        departureTime: timeDeparture,
                        arrivalTime: timeArrival,
                        timeRequested: current,
                        flightIndex: flightIndex
                    };
                    this.store.dispatch(new TrackerEventStateActions.Update(state));
                    return state;
                }

            } else if (current < timeDeparture) {

                let state = {
                    stage: 'preflight',
                    components: event.config.components['preflight'],
                    departureTime: timeDeparture,
                    arrivalTime: timeArrival,
                    timeRequested: current,
                    flightIndex: flightIndex
                };
                this.store.dispatch(new TrackerEventStateActions.Update(state));
                return state;

            } else if (current < timeArrival && timeTakeoff <= 0) {

                let state = {
                    stage: 'boarded',
                    components: event.config.components['boarded'],
                    departureTime: timeDeparture,
                    arrivalTime: timeArrival,
                    timeRequested: current,
                    indeterminate: !(flight.recorded > 0),
                    flightIndex: flightIndex
                };
                this.store.dispatch(new TrackerEventStateActions.Update(state));
                return state;


            } else if (timeTakeoff > 0 && timeEstimatedLanding > 0 && current < timeEstimatedLanding) {




                flight.originLocation = event.config.airports[flight.origin].location;
                flight.destinationLocation = event.config.airports[flight.destination].location;


                var totalFlightTime = timeArrival - timeTakeoff;
                var currentFlightTime = (Date.now() + event.simulationOffset) - timeTakeoff;

                var complete = currentFlightTime / totalFlightTime;

                if (complete > 1.0) {
                    complete = 1.0;
                    currentFlightTime = totalFlightTime;
                }
                var substage = -1;
                if (event.config.enrouteSubstages) {
                    for (var j = 0, len2 = event.config.enrouteSubstages.length; j < len2; j++) {
                        let rComplete = event.config.enrouteSubstages[j];
                        if (rComplete < complete) {
                            substage = j;
                        } else {
                            break;
                        }
                    }
                }

                let state = {
                    stage: 'enroute',
                    components: event.config.components['enroute'],
                    departureTime: timeDeparture,
                    takeoffTime: timeTakeoff,
                    estimatedLandingTime: timeEstimatedLanding,
                    arrivalTime: timeArrival,
                    flight: flight,
                    timeRequested: current,
                    complete: complete,
                    substage: substage,
                    currentFlightTime: currentFlightTime,
                    totalFlightTime: totalFlightTime,
                    flightIndex: flightIndex,
                    enroute: flight.enroute
                };
                this.store.dispatch(new TrackerEventStateActions.Update(state));
                return state;

            } else if (current < timeArrival + availableFor) {

                let state = {
                    stage: 'landed',
                    components: event.config.components['landed'],
                    departureTime: timeDeparture,
                    arrivalTime: timeArrival,
                    flight: flight,
                    timeRequested: current,
                    complete: 1.0,
                    indeterminate: false,
                    flightIndex: flightIndex
                };
                this.store.dispatch(new TrackerEventStateActions.Update(state));
                return state;

            } else if (current < (timeArrival + availableFor + soldOutFor)) {

                let state = {
                    stage: 'soldout',
                    components: event.config.components['soldout'],
                    departureTime: timeDeparture,
                    arrivalTime: timeArrival,
                    flight: flight,
                    timeRequested: current,
                    flightIndex: flightIndex
                };
                this.store.dispatch(new TrackerEventStateActions.Update(state));
                return state;

            }


        }

        let state = {
            stage: 'done',
            components: event.config.components['done'],
            timeRequested: current,
            flightIndex: event.config.flights.length - 1
        };
        this.store.dispatch(new TrackerEventStateActions.Update(state));
        return state;
    }

    public updateFlightValues(event, result) {
        let flights = event.config.flights;
        if (typeof result.flightIndex !== 'undefined') {
            let flightIndex = result.flightIndex;

            let tDeparture0 = event.config.flights[flightIndex].departureTime;
            let tDeparture1 = result.departureTime;

            let tArrival0 = event.config.flights[flightIndex].arrivalTime;
            let tArrival1 = result.arrivalTime;

            let deltaD = tDeparture1 - tDeparture0;
            let deltaA = tArrival1 - tArrival0;




            if (deltaD != 0) {

                console.log(result.ident, flightIndex, "UPDATING DEPARTURE", event.config.flights[flightIndex].departure, result.departure);


                event.config.flights[flightIndex].departure = result.departure;
                event.config.flights[flightIndex].departureTime = result.departureTime;
            }


            if (result.takeoffTime) {
                let tTakeoff0 = event.config.flights[flightIndex].takeoffTime;
                let tTakeoff1 = result.takeoffTime;

                let deltaT = tTakeoff1 - tTakeoff0;
                if (deltaT != 0) {

                    console.log(result.ident, flightIndex, "DETECTED TAKEOFF", result.takeoff);
                    event.config.flights[flightIndex].takeoff = result.takeoff;
                    event.config.flights[flightIndex].takeoffTime = result.takeoffTime;
                }
            }

            if (result.estimatedLandingTime) {
                let tEstimatedLanding0 = event.config.flights[flightIndex].estimatedLandingTime;
                let tEstimatedLanding1 = result.estimatedLandingTime;

                let deltaT = tEstimatedLanding1 - tEstimatedLanding0;
                if (deltaT != 0) {

                    console.log(result.ident, flightIndex, "DETECTED ESTIMATED LANDING", result.estimatedLanding);
                    event.config.flights[flightIndex].estimatedLanding = result.estimatedLanding;
                    event.config.flights[flightIndex].estimatedLandingTime = result.estimatedLandingTime;
                }
            }

            if (deltaA !== 0) {

                console.log(result.ident, flightIndex, "UPDATING ARRIVAL TIME", event.config.flights[flightIndex].arrival, result.arrival);

                event.config.flights[flightIndex].arrival = result.arrival;
                event.config.flights[flightIndex].arrivalTime = result.arrivalTime;

            }

            if (typeof result.enroute !== 'undefined') {

                let groundspeedFpS = result.enroute.groundspeed * 1.69;

                if (result.enroute.latitude || result.enroute.longitude) {


                    let headingRadians = result.enroute.heading * Math.PI / 180;

                    let speedX = groundspeedFpS * Math.sin(headingRadians);
                    let speedY = groundspeedFpS * Math.cos(headingRadians);

                    let radiusOfEarthFeet = 5280 * 3958;

                    let cosLatitude = Math.cos(result.enroute.latitude * Math.PI / 180);

                    let latitudinalSpeed = (speedY / radiusOfEarthFeet) * 180 / Math.PI;
                    let longitudinalSpeed = (speedX / radiusOfEarthFeet) * 180 / (Math.PI * cosLatitude);

                    result.enroute.longitudinalspeed = longitudinalSpeed;
                    result.enroute.latitudinalspeed = latitudinalSpeed;
                }
                console.log("ENROUTE", result.enroute.altitude, result.enroute.latitude, result.enroute.longitude, result.enroute.groundspeed);
                event.config.flights[flightIndex].enroute = result.enroute;
            } else {
                delete event.config.flights[flightIndex].enroute;
            }
            event.config.flights[flightIndex].recorded = result.recorded;

        }




    }


}
