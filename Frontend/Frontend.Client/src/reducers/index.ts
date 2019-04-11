import { combineReducers } from "redux";
import * as modules from '../modules'
 
export interface IState extends modules.IState {
 }

export const initial: IState = {
 }

export const reducer = combineReducers({
     ...modules.reducers,
 });
