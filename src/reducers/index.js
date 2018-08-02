import { combineReducers } from 'redux';
import stateArray from './arrayController';
import stateUpdateStatus  from './updateController';

const allReducers = combineReducers({ stateArray, stateUpdateStatus });

export default allReducers;
