import * as TrackerEventStateActions from './tracker-event-state.actions';

export type Action = TrackerEventStateActions.Update;

const defaultState: any = {

	stage: null,
	flightIndex: null,
	timeRequested: null,

	components: {},



	departureTime: null,
	takeoffTime: null,
	arrivalTime: null,

	currentFlightTime: null,
	totalFlightTime: null,



	linger: null,

	flight: null,
	enroute: null,


	complete: null
};

export function TrackerEventStateReducer(state: any = defaultState, action: Action) {

	switch (action.type) {
		case TrackerEventStateActions.UPDATE_ACTION:

			var obj = Object.assign({}, action.payload);


			obj.changeOfStage = state.stage !== obj.stage;
			obj.becameDeterminate = state.indeterminate && !obj.indeterminate;


			if (obj.enroute && state.enroute) {
				var deltaLatitude = 0;
				var deltaLongitude = 0;
				if (obj.enroute.latitudinalspeed || obj.enroute.longitudinalspeed) {
					let deltaSeconds = (obj.timeRequested - state.enroute.time) / 1000;
					deltaLatitude = deltaSeconds * obj.enroute.latitudinalspeed;
					deltaLongitude = deltaSeconds * obj.enroute.longitudinalspeed;
				}
				obj.enroute.latitudeextrapolated = obj.enroute.latitude + deltaLatitude;
				obj.enroute.longitudeextrapolated = obj.enroute.longitude + deltaLongitude;
			}

			return obj;
		default:
			return state;

	}
}

