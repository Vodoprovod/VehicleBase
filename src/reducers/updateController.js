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
            return { ...state, isErrorListLoading: !state.isErrorListLoading };
        default:
            return state;
    }
};

export default stateUpdateStatus;