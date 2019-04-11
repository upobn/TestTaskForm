
import { IState, initial as initialState } from "../reducers";
import {IStore} from "./configureStore";

const APP_STATE = 'TEST_TASK_APP_STATE';

interface IPersistedState {
  
}

export const saveState = (store: IStore) => {
    const state: IState = store.getState();
    const storedState: IPersistedState = {
       
    };

    localStorage.setItem(APP_STATE, JSON.stringify(storedState));
};

export const loadState = (): IState => {
    const stateJson = localStorage.getItem(APP_STATE);
    if (!stateJson) {
        return initialState;
    }

    try {
        const state = JSON.parse(stateJson) as IPersistedState;
        return {
           
        };
    } catch {
        return initialState;
    }
}
