import { IRoute } from '../../module';

import IssuersPage from './table';
import CreateIssuerPage from './create';
import ViewIssuerPage from './view';
import EditIssuerPage from './edit';

export const configureRoutes = (routes: IRoute[]) => {
    routes.push({ path: '/issuers', component: IssuersPage });
    routes.push({ path: '/issuers/new', component: CreateIssuerPage });
    routes.push({ path: '/issuers/:id', component: ViewIssuerPage });
    routes.push({ path: '/issuers/:id/edit', component: EditIssuerPage });
}
