import { createStore, applyMiddleware, Store } from "redux";
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import * as saga from "../sagas"
import * as root from "../reducers";
import { History } from 'history';
import { saveState, loadState } from "./persistedStore";

const sagaMiddleware = createSagaMiddleware();

export interface IStore extends Store<root.IState> { }

export default function configureStore(history: History){
    const routersMiddleware = routerMiddleware(history)
    
    const initialState = loadState();
    
    const store: IStore = createStore(
        root.reducer,
        initialState,
        applyMiddleware(sagaMiddleware,routersMiddleware)
    );
    sagaMiddleware.run(saga.default);

    store.subscribe(() => saveState(store));

    return store;
};
