export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';

export const addElement = (element) => {
    return {
        type: ADD_ELEMENT,
        element
    }
};

export const deleteElement = (index) => {
    return {
        type: DELETE_ELEMENT,
        index
    }
};