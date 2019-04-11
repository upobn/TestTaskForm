import * as React from 'react';
import { LocationDescriptor } from 'history';

export interface IRoute {
    path: string;
    component: React.ReactNode;
}

export interface IModule {
    moduleName: string;
    ACTIONS: any;
    actions: any;
    reducer: any;
    initial: any;
    configureRoutes: (routes: IRoute[]) => void;
    saga: () => IterableIterator<any>;
}
