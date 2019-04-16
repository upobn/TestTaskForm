import { ITestObject, IErrorResponse } from '../../../api';

import { Action } from 'redux';
import { IFailAction, actionsSet } from '../../../actions';

const prefix = 'TEST_OBJECTS_TABLE';

export const ACTIONS = {
    FETCH: actionsSet(prefix, 'FETCH'),
};

export interface IFetchInitAction extends Action {
    page: number;
    pageSize: number;
}

export interface IFetchDoneAction extends Action {
    items: ITestObject[];
    totalCount: number;
}

export const actions = {
    fetch: {
        init: (page: number, pageSize: number) => ({ type: ACTIONS.FETCH.INIT, page, pageSize }) as IFetchInitAction,
        done: (items: ITestObject[], totalCount: number) => ({ type: ACTIONS.FETCH.DONE, items, totalCount }) as IFetchDoneAction,
        fail: (error: IErrorResponse) => ({ type: ACTIONS.FETCH.FAIL, error }) as IFailAction,
    }
}
