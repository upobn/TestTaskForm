import * as table from './table';
import * as view from './view';
import * as logo from './logo';
import * as create from './create';
import * as edit from './edit';
import * as del from './delete';

export const ACTIONS = {
    TABLE: table.ACTIONS,
    VIEW: view.ACTIONS,
    LOGO: logo.ACTIONS,
    CREATE: create.ACTIONS,
    EDIT: edit.ACTIONS,
    DELETE: del.ACTIONS,
};

export const actions = {
    table: table.actions,
    view: view.actions,
    logo: logo.actions,
    create: create.actions,
    edit: edit.actions,
    delete: del.actions,
};
