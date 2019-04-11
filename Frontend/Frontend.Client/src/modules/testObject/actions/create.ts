import { IIssuer, IErrorResponse } from '../../../api';
import { Action } from 'redux';
import { IFailAction, actionsSet } from '../../../api/base/actions';

const prefix = 'ISSUERS_CREATE';

export const ACTIONS = {
    SAVE: actionsSet(prefix, 'SAVE')
};


export interface ISaveInitAction extends Action {
    item: IIssuer;
}

export interface ISaveDoneAction extends Action {
    item: IIssuer;
}

export const actions = {
    save: {
        init: (item: IIssuer) => ({type: ACTIONS.SAVE.INIT, item}) as ISaveInitAction,
        done: (item: IIssuer) => ({type: ACTIONS.SAVE.DONE, item}) as ISaveDoneAction,
        fail: (error: IErrorResponse) => ({type: ACTIONS.SAVE.FAIL, error}) as IFailAction,
    }
}
