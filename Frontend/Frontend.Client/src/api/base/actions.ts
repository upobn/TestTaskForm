import { Action } from 'redux';
import { IErrorResponse } from '../../api';

type ActionId = string;

export interface IFailAction extends Action {
    error: IErrorResponse;
}

export interface IActionIds {
    INIT: string;
    DONE: string;
    FAIL: string;
}

export const actionId = (prefix: string, id: string): ActionId => {
    if (id) {
        return `${prefix}_${id}`;
    }

    return prefix;
}

export const actionsSet = (prefix: string, id: string): IActionIds => {
    prefix = actionId(prefix, id);
    return {
        INIT: actionId(prefix, 'INIT'),
        DONE: actionId(prefix, 'DONE'),
        FAIL: actionId(prefix, 'FAIL')
    };
}