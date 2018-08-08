import { combineReducers } from 'redux';
import stateArray from './reducers/arrayController';
import stateUpdateStatus  from './reducers/updateController';
import selectedItemId from './pages/main/mainPageReducers';

const allReducers = combineReducers({ stateArray, stateUpdateStatus, selectedItemId });

export default allReducers;
