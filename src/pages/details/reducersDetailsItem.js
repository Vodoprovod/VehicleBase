import { FETCH_ITEM } from './actions';

const initialItem = {
    id: 0,
    regNum: '---',
    cczIn: '---',
    notification: '---',
    cis: '---',
    inspection: '---',
    custClearance: '---',
    cczOut: '---'
};

function fetchDetailsItem(state = initialItem, action) {
    switch (action.type) {
        case FETCH_ITEM:
            return state = action.item;
        default:
            return state;
    }
}

export default fetchDetailsItem;