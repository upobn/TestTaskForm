import { ACTIONS } from '../actions/create';
import { Action } from 'redux';
import { IIssuer, printErrorResponse } from '../../../api';
import { IFailAction } from '../../../api/base/actions';

export interface IState {
    inProgress: boolean;
    error: string | null;
    item: IIssuer | null;
}

export const initial: IState = {
    inProgress: false,
    error: null,
    item: null
}

export const reducer = (state: IState = initial, action: Action): IState => {
    switch (action.type) {
        case ACTIONS.SAVE.INIT:
            return {
                ...state,
                inProgress: true,
                error: null
            };

        case ACTIONS.SAVE.DONE:
            {
                return {
                    ...state,
                    inProgress: false,
                    error: null
                };
            }

        case ACTIONS.SAVE.FAIL:
            {
                const { error } = action as IFailAction;
                return {
                    ...state,
                    inProgress: false,
                    error: printErrorResponse(error)
                };
            }

        default:
            return state;
    }
}
