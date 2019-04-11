import * as module from '../modules';

export interface IRoute {
    path: string;
    component: any;
}

function configureRoutes() {
    const routes: IRoute[] = [];
    module.configureRoutes(routes);
    return routes;
}

export const pageRoutes: IRoute[] = configureRoutes();
