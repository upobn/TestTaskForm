import { combineReducers } from 'redux';
import * as table from './table';
import * as view from './view';
import * as logo from './logo';
import * as create from './create';
import * as edit from './edit';
import * as del from './delete';

export interface IState {
    table: table.IState,
    view: view.IState,
    logo: logo.IState,
    create: create.IState,
    edit: edit.IState,
    delete: del.IState,
}

export const reducer = combineReducers({
    table: table.reducer,
    view: view.reducer,
    logo: logo.reducer,
    create: create.reducer,
    edit: edit.reducer,
    delete: del.reducer,
});