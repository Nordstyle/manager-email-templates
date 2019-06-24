import { combineReducers } from 'redux';
import { categories } from "./categories";
import { messages } from "./messages";

export const reducers = combineReducers({ categories, messages });