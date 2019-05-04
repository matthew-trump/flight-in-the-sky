export interface TrackerEventState {
    stage: string;

    flightIndex: number;
    timeRequested: number;

    components: any;



    departureTime: number;
    arrivalTime: number;

    currentFlightTime: number;
    totalFlightTime: number;



    linger: number;

    flight: any;
    enroute: any;

    complete: number;



}