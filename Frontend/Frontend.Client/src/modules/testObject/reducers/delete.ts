import { ACTIONS } from '../actions/delete';
import { Action } from 'redux';
import { printErrorResponse } from '../../../api';
import { IFailAction } from '../../../api/base/actions';

export interface IState {
    inProgress: boolean;
    error: string | null;
    deleted: boolean;
}

const initial: IState = {
    inProgress: false,
    error: null,
    deleted: false
}

export const reducer = (state: IState = initial, action: Action): IState => {
    switch (action.type) {

        case ACTIONS.DELETE.INIT:
            return {
                ...state,
                inProgress: true,
                error: null,
                deleted: false
            };

        case ACTIONS.DELETE.DONE:
            return {
                ...state,
                inProgress: false,
                error: null,
                deleted: true
            };

        case ACTIONS.DELETE.FAIL:
            const { error } = action as IFailAction;
            return {
                ...state,
                inProgress: false,
                error: printErrorResponse(error),
                deleted: false
            };

        default:
            return state;
    }
}
