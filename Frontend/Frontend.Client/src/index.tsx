import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history'
import configureStore from './store/configureStore';

const history = createHistory({
    basename: "/"
});
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);