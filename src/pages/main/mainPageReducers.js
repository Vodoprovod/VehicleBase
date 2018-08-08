import { SELECT_RECORD } from './actions';

const selectedId = 0;

function selectedItemId(state = selectedId, action) {
    switch (action.type) {
        case SELECT_RECORD:
            //console.log('reduceeeeeer');
            return state = action.id;
        default:
            return state;
    }
};

export default selectedItemId;