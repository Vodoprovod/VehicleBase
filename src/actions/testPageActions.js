export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SHOW_ELEMENTS = 'SHOW_ELEMENTS';

export const TOGGLE_LIST_LOADING = 'TOGGLE_LIST_LOADING';
export const TOGGLE_ERROR_LIST_LOADING = 'TOGGLE_ERROR_LIST_LOADING';

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

export const showElements = (stateArray) => {
    return {
        type: SHOW_ELEMENTS,
        stateArray
    }
};

export const toggleListLoading = () => {
    return {
        type: TOGGLE_LIST_LOADING
    }
};

export const toggleErrorListLoading = () => {
    return {
        type: TOGGLE_ERROR_LIST_LOADING
    }
};

export const fetchItems = (url) => {
    return async (dispatch) => {
        dispatch(toggleListLoading());

        try {

            const response = await fetch(url);

            if(response.ok) {
                dispatch(toggleErrorListLoading());
                throw Error(response.statusText);
            }

            dispatch(toggleListLoading());

            const stateArray = await response.json();

            dispatch(showElements(stateArray));

        } catch (err) {
            dispatch(toggleListLoading());
            dispatch(toggleErrorListLoading());
            console.log('Catched error: ' + err);
        }
    }
};