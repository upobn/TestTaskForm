import { IIssuer, IErrorResponse } from '../../../api';
import { Action } from 'redux';
import { IFailAction, actionsSet } from '../../../actions';

const prefix = 'ISSUERS_VIEW';

export const ACTIONS = {
    FETCH: actionsSet(prefix, 'FETCH'),
};

export interface IFetchInitAction extends Action {
    id: string;
}

export interface IFetchDoneAction extends Action {
    item: IIssuer;
}

export const actions = {
    fetch: {
        init: (id: string) => ({ type: ACTIONS.FETCH.INIT, id }) as IFetchInitAction,
        done: (item: IIssuer) => ({ type: ACTIONS.FETCH.DONE, item }) as IFetchDoneAction,
        fail: (error: IErrorResponse) => ({ type: ACTIONS.FETCH.FAIL, error }) as IFailAction,
    },
};
