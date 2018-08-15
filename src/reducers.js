import { combineReducers } from 'redux';
import stateArray from './reducers/arrayController';
import stateUpdateStatus  from './reducers/updateController';
import selectedItemId, { setModalProps } from './pages/main/reducersViewMainPage';
import pushTableData from './pages/main/reducersDataMainPage';
import fetchDetailsItem from './pages/details/reducersDetailsItem';

const allReducers = combineReducers({ stateArray, stateUpdateStatus, selectedItemId, setModalProps, pushTableData, fetchDetailsItem });

export default allReducers;
