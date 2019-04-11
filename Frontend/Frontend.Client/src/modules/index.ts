import { fork, all } from 'redux-saga/effects'
import { IModule } from './module';
import { IRoute } from '../app/routes';

const modules: IModule[] = [
    require('./testObject'),
];

export const ACTIONS: any = {};
export const actions: any = {};
export interface IState { }
export const reducers: any = {};

export function* saga() {
    yield all(modules.map((m) => fork(m.saga)));
}

export const configureRoutes = (routes: IRoute[]) => {
    modules.forEach((m) => {
        m.configureRoutes(routes);
    });
};

const modulesMap: { [key: string]: IModule } = {};
modules.forEach((m) => {
    if (modulesMap[m.moduleName]) {
        console.error(`Module "${m.moduleName}" is defined more than once`);
    }
    modulesMap[m.moduleName] = m;

    ACTIONS[m.moduleName] = m.ACTIONS;
    actions[m.moduleName] = m.actions;
    reducers[m.moduleName] = m.reducer;

});
