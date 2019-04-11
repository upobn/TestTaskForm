import { IErrorResponse } from '../../../api';
import { Action } from 'redux';
import { IFailAction, actionsSet } from '../../../actions';

const prefix = 'ISSUERS';

export const ACTIONS = {
    DELETE: actionsSet(prefix, 'DELETE'),
};

export interface IDeleteInitAction extends Action {
    id: number;
}

export const actions = {
    init: (id: number) => ({type: ACTIONS.DELETE.INIT, id}) as IDeleteInitAction,
    done: () => ({type: ACTIONS.DELETE.DONE}),
    fail: (error: IErrorResponse) => ({type: ACTIONS.DELETE.FAIL, error}) as IFailAction,

}
