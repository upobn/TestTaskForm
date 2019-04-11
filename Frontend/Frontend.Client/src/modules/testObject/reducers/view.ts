import { ACTIONS, IFetchDoneAction } from '../actions/view';
import { Action } from 'redux';
import { IIssuer, printErrorResponse } from '../../../api';
import { IFailAction } from '../../../actions';

export interface IState {
    inProgress: boolean;
    error: string | null;
    item: IIssuer | null;
}

export const initial: IState = {
    inProgress: false,
    error: null,
    item: null
};

export const reducer = (state: IState = initial, action: Action): IState => {
    switch (action.type) {
        case ACTIONS.FETCH.INIT:
            return {
                ...state,
                inProgress: true,
                error: null
            };
        case ACTIONS.FETCH.DONE:
            const { item } = action as IFetchDoneAction;
            return {
                ...state,
                item,
                inProgress: false,
                error: null
            };
        case ACTIONS.FETCH.FAIL:
            const { error } = action as IFailAction;
            return {
                ...state,
                inProgress: false,
                error: printErrorResponse(error)
            };
        default:
            return state;
    }
};
