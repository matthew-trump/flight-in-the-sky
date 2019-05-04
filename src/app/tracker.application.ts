export class TrackerApplication {
    id: string;
    config: any;
    state: any;
    simulationOffset: number;

    threshold: any;

    active: boolean;

    reset: boolean;

    debug: boolean;


    constructor(id: string, config: any, themes: any, tests: any) {

        this.config = config;

        this.config.id = id;
        this.id = id;

        let theme = themes[this.config.theme] ? themes[this.config.theme] : themes["skypie"];

        for (key in theme) {
            if (theme.hasOwnProperty(key)) {
                this.config[key] = theme[key];
            }
        }


        if (this.config.type === "extrapolated") {
            this.config.flights = [];
            const firstDeparture = this.config.dateBegin + " " + this.config.timeScheduledDeparture;
            const firstArrival = this.config.dateBegin + " " + this.config.timeScheduledArrival;
            const lastDeparture = this.config.dateEnd + " " + this.config.timeScheduledDeparture;
            const lastArrival = this.config.dateEnd + " " + this.config.timeScheduledArrival;

            const firstDepartureTime = Date.parse(firstDeparture);
            const firstArrivalTime = Date.parse(firstArrival);

            const lastDepartureTime = Date.parse(lastDeparture);
            const lastArrivalTime = Date.parse(lastArrival);

            let iDepartureTime = firstDepartureTime;
            let iArrivalTime = firstArrivalTime;

            this.config.flights.push({
                number: this.config.flightNumber,
                origin: this.config.origin,
                destination: this.config.destination,
                departure: (new Date(iDepartureTime)).toUTCString(),
                arrival: (new Date(iArrivalTime)).toUTCString()
            });

            if (lastDepartureTime > firstDepartureTime) {
                while (iDepartureTime < lastDepartureTime) {
                    iDepartureTime = iDepartureTime + (24 * 3600000);
                    iArrivalTime = iArrivalTime + (24 * 3600000);

                    this.config.flights.push({
                        number: this.config.flightNumber,
                        origin: this.config.origin,
                        destination: this.config.destination,
                        departure: (new Date(iDepartureTime)).toUTCString(),
                        arrival: (new Date(iDepartureTime)).toUTCString()
                    });
                }
            }





        }

        for (var i = 0, len = this.config.flights.length; i < len; i++) {
            var flight = this.config.flights[i];

            this.config.flights[i].departureTime = Date.parse(flight.departure);
            this.config.flights[i].arrivalTime = Date.parse(flight.arrival);

            this.config.flights[i].takeoffTime = 0;
        }

        this.config.testData = { times: {} };
        for (var key in tests) {
            if (tests.hasOwnProperty(key)) {
                let index = tests[key].flightIndex;
                if (index < 0) {
                    index = this.config.flights.length + index;
                }

                let flight = this.config.flights[index];
                let base = Date.parse(flight[tests[key].field]);
                let time = base + (tests[key].adjust * 1000);

                this.config.testData.times[key] = time;
            }
        }


    }




}
