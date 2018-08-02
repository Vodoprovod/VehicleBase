import { TOGGLE_LIST_LOADING, TOGGLE_ERROR_LIST_LOADING } from '../actions/testPageActions';

const stateUpdate = {
    isListLoading: false,
    isErrorListLoading: false
};

function stateUpdateStatus(state = stateUpdate, action) {
    switch (action.type) {
        case TOGGLE_LIST_LOADING:
            return {...state, isListLoading: !state.isListLoading };
        case TOGGLE_ERROR_LIST_LOADING:
            console.log('Error from reducer ' + state.isErrorListLoading);
            return { ...state, isErrorListLoading: !state.isErrorListLoading };
            //return { ...state, isErrorListLoading: true };
        default:
            return state;
    }
};

export default stateUpdateStatus;