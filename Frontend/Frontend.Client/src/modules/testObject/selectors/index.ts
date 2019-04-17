import { IState } from "../reducers";
import { moduleName } from "..";

function moduleState(state: any): IState {
    return state[moduleName];
}

export function table(state: any) {
    return moduleState(state).table;
}

export function view(state: any) {
    return moduleState(state).view;
}

export function create(state: any) {
    return moduleState(state).create;
}

export function edit(state: any) {
    return moduleState(state).edit;
}

export function del(state: any) {
    return moduleState(state).delete;
}
