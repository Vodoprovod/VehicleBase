import { combineReducers } from 'redux';
import stateArray from './arrayController';
import stateUpdateStatus  from './updateController';
import setSelectedId from '../pages/main/mainPageReducers';

const allReducers = combineReducers({ stateArray, stateUpdateStatus, setSelectedId });

export default allReducers;
