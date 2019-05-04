import { Action } from '@ngrx/store';

export const UPDATE_ACTION: string = '[State] update';

export class Update implements Action {
    readonly type = UPDATE_ACTION;

    constructor(public payload: any) {

    }
}

export type All = Update; 