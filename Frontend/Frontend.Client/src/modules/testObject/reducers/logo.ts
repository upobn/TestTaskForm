import { ACTIONS } from '../actions/logo';
import { Action } from 'redux';
import { printErrorResponse } from '../../../api';
import { IFailAction } from '../../../api/base/actions';

export interface IState {
    inProgress: boolean;
    error: string | null;
    completed: boolean;
}

const initial: IState = {
    inProgress: false,
    error: null,
    completed: false,
}

export const reducer = (state: IState = initial, action: Action): IState => {
    switch (action.type) {
        case ACTIONS.UPLOAD.INIT:
            return {
                ...state,
                inProgress: true,
                error: null,
                completed: false
            };

        case ACTIONS.UPLOAD.DONE:
            return {
                ...state,
                inProgress: false,
                error: null,
                completed: true
            };

        case ACTIONS.UPLOAD.FAIL:
            const { error } = action as IFailAction;
            return {
                ...state,
                completed: false,
                inProgress: false,
                error: printErrorResponse(error)
            };

        case ACTIONS.CLEAR_STATE:
            return {
                ...state,
                inProgress: false,
                error: null,
                completed: false
            };


        default:
            return state;
    }
}
