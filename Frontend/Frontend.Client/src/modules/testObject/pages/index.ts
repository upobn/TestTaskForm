import { IRoute } from '../../module';
import TestObjectsPage from './table';
import CreateTestObjectPage from './create';
import ViewTestObjectPage from './view';
import EditTestObjectPage from './edit';

export const configureRoutes = (routes: IRoute[]) => {
    routes.push({ path: '/testObjects', component: TestObjectsPage });
    routes.push({ path: '/testObjects/new', component: CreateTestObjectPage });
    routes.push({ path: '/testObjects/:id', component: ViewTestObjectPage });
    routes.push({ path: '/testObjects/:id/edit', component: EditTestObjectPage });
}
