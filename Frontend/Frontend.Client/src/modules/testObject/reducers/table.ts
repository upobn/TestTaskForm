import { ACTIONS, IFetchInitAction, IFetchDoneAction } from '../actions/table';
import { Action } from 'redux';
import { IIssuer, printErrorResponse } from '../../../api';
import { IFailAction } from '../../../api/base/actions';

export interface IState {
    inProgress: boolean;
    error: string | null;
    items: IIssuer[];
    page: number;
    pageSize: number;
    totalCount: number;
}

export const initial: IState = {
    inProgress: false,
    error: null,
    items: [],
    page: 0,
    pageSize: 0,
    totalCount: 0
}

export const reducer = (state: IState = initial, action: Action): IState => {
    switch (action.type) {
        case ACTIONS.FETCH.INIT:
            let { page = 0, pageSize = 0 } = action as IFetchInitAction;

            return {
                ...state,
                page,
                pageSize,
                inProgress: true,
                error: null
            };

        case ACTIONS.FETCH.DONE:
            const { items, totalCount = 0 } = action as IFetchDoneAction;
            return {
                ...state,
                items,
                totalCount,
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
}
