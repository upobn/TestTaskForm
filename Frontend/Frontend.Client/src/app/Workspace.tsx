import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IRoute } from './routes';
import HomePage from "../modules/testObject/pages/table";

export interface IProps {
    routes: IRoute[]
}

class Workspace extends React.Component<IProps>{
    render() {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    {
                        this.props.routes.map((route, i) =>
                            (<Route key={i} exact={true} path={route.path} component={route.component} />))
                    }
                </Switch>
            </main>
        );
    }
}

export default Workspace;
