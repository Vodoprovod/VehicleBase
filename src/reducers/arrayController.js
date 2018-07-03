import { ADD_ELEMENT } from '../actions/testPageActions';

const stateArr = [1, 'ddd', 34, 'aaa'];


function stateArray(state = stateArr, action ) {
    switch (action.type) {
        case ADD_ELEMENT:
            return [...state, action.element];
        default:
            return state;
    }
};

export default stateArray;
