import { ITestObject, IErrorResponse } from '../../../api';
import { Action } from 'redux';
import { IFailAction, actionsSet } from '../../../api/base/actions';

const prefix = 'ISSUERS_EDIT';

export const ACTIONS = {
    FETCH: actionsSet(prefix, 'FETCH'),
    SAVE: actionsSet(prefix, 'SAVE')
};

export interface IFetchInitAction extends Action {
    id: string;
}

export interface IFetchDoneAction extends Action {
    item: ITestObject;
}

export interface ISaveInitAction extends Action {
    id: string;
    item: ITestObject;
}

export const actions = {
    fetch: {
        init: (id: string) => ({ type: ACTIONS.FETCH.INIT, id }) as IFetchInitAction,
        done: (item: ITestObject) => ({ type: ACTIONS.FETCH.DONE, item }) as IFetchDoneAction,
        fail: (error: IErrorResponse) => ({ type: ACTIONS.FETCH.FAIL, error }) as IFailAction,
    },
    save: {
        init: (id: string, item: ITestObject) => ({ type: ACTIONS.SAVE.INIT, id, item }) as ISaveInitAction,
        done: () => ({ type: ACTIONS.SAVE.DONE }),
        fail: (error: IErrorResponse) => ({ type: ACTIONS.SAVE.FAIL, error }) as IFailAction,
    }
}
