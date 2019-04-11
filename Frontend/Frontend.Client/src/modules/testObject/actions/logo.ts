import { IErrorResponse } from '../../../api';
import { Action } from 'redux';
import { IFailAction, actionsSet, actionId } from '../../../actions';

const prefix = 'ISSUERS_LOGO';

export const ACTIONS = {
    UPLOAD: actionsSet(prefix, 'UPLOAD'),
    CLEAR_STATE: actionId(prefix, 'CLEAR_STATE')
};

export interface IUploadInitAction extends Action {
    id: number;
    file: Blob;
}

export const actions = {
    upload: {
        init: (id: number, file: Blob) => ({type: ACTIONS.UPLOAD.INIT, id, file }) as IUploadInitAction,
        done: () => ({type: ACTIONS.UPLOAD.DONE}),
        fail: (error: IErrorResponse) => ({type: ACTIONS.UPLOAD.FAIL, error }) as IFailAction,
    },
    clearState: () =>  ({type: ACTIONS.CLEAR_STATE})
}
