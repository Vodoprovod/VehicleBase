import { ADD_ELEMENT, DELETE_ELEMENT, SHOW_ELEMENTS } from '../actions/testPageActions';

const stateArr = {
    tempArr: [
        { id: 1, value: '1' },
        { id: 2, value: 'ddd' },
        { id: 3, value: '34' },
        { id: 4, value: 'aaa' },
        { id: 5, value: 'ggggg' }
    ]
};


function stateArray(state = stateArr.tempArr, action ) {
    switch (action.type) {
        case ADD_ELEMENT:
            return [...state, action.element];
        case DELETE_ELEMENT:
            return state.filter((elt, idx) => idx != action.index);
        case SHOW_ELEMENTS:
            return state = action.stateArray;
        default:
            return state;
    }
};

export default stateArray;
