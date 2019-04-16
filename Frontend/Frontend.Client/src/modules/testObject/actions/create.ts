import { ITestObject, IErrorResponse } from '../../../api';
import { Action } from 'redux';
import { IFailAction, actionsSet } from '../../../api/base/actions';

const prefix = 'TEST_OBJECT_CREATE';

export const ACTIONS = {
    SAVE: actionsSet(prefix, 'SAVE')
};


export interface ISaveInitAction extends Action {
    item: ITestObject;
}

export interface ISaveDoneAction extends Action {
    item: ITestObject;
}

export const actions = {
    save: {
        init: (item: ITestObject) => ({type: ACTIONS.SAVE.INIT, item}) as ISaveInitAction,
        done: (item: ITestObject) => ({type: ACTIONS.SAVE.DONE, item}) as ISaveDoneAction,
        fail: (error: IErrorResponse) => ({type: ACTIONS.SAVE.FAIL, error}) as IFailAction,
    }
}
