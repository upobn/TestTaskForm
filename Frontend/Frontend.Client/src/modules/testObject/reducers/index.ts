import { combineReducers } from 'redux';
import * as table from './table';
import * as view from './view';
import * as create from './create';
import * as edit from './edit';

export interface IState {
    table: table.IState,
    view: view.IState,
    create: create.IState,
    edit: edit.IState,
}

export const reducer = combineReducers({
    table: table.reducer,
    view: view.reducer,
    create: create.reducer,
    edit: edit.reducer,
});