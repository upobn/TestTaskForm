import { ACTIONS, IFetchDoneAction } from '../actions/edit';
import { Action } from 'redux';
import { ITestObject, printErrorResponse } from '../../../api';
import { IFailAction } from '../../../api/base/actions';

export interface IState {
    inProgress: boolean;
    saveError: string | null;
    fetchError: string | null;
    item: ITestObject | null;
}

export const initial: IState = {
    inProgress: false,
    fetchError: null,
    saveError: null,
    item: null
}

export const reducer = (state: IState = initial, action: Action): IState => {
    switch (action.type) {
        case ACTIONS.FETCH.INIT:
            return {
                ...state,
                item: null,
                inProgress: true,
                fetchError: null,
                saveError: null
            };

        case ACTIONS.FETCH.DONE:
            {
                const { item = null } = action as IFetchDoneAction;
                return {
                    ...state,
                    item,
                    inProgress: false,
                    fetchError: null,
                    saveError: null
                };
            }

        case ACTIONS.FETCH.FAIL:
            {
                const { error } = action as IFailAction;
                return {
                    ...state,
                    inProgress: false,
                    fetchError: printErrorResponse(error)
                };
            }

        case ACTIONS.SAVE.INIT:
            return {
                ...state,
                inProgress: true,
                fetchError: null,
                saveError: null
            };

        case ACTIONS.SAVE.DONE:
            {
                return {
                    ...state,
                    inProgress: false,
                    fetchError: null,
                    saveError: null
                };
            }

        case ACTIONS.SAVE.FAIL:
            {
                const { error } = action as IFailAction;
                return {
                    ...state,
                    inProgress: false,
                    saveError: printErrorResponse(error)
                };
            }

        default:
            return state;
    }
}
