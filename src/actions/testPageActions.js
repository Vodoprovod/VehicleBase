export const ADD_ELEMENT = 'ADD_ELEMENT';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const SHOW_ELEMENTS = 'SHOW_ELEMENTS';

export const TOGGLE_LIST_LOADING = 'TOGGLE_LIST_LOADING';
export const TOGGLE_ERROR_LIST_LOADING = 'TOGGLE_ERROR_LIST_LOADING';


export const addElement = (newRecord, url) => {
    return async (dispatch) => {

        const request = new Request(
            'http://localhost:3000/api/additem',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(newRecord)
            }
        );

        try {
            const response = await fetch(request);
            const data = await response.json();
            dispatch(fetchItems(url));
            return true;
        } catch (err) {
            console.log('addRecord response error: ', err);
            return false;
        }
    }
};

export const deleteElement = (index, url) => {
    return async (dispatch) => {

        const request = new Request('http://localhost:3000/api/deleteitem/' + index, {
            method: 'DELETE'
        });

        try {
            const response = await fetch(request);
            dispatch(fetchItems(url));
            return true;
        } catch (err) {
            console.log('deleteRecord response error: ', err);
            return false;
        }
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

            if(!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(toggleListLoading());

            const stateArray = await response.json();

            //console.log('stateArray ---> ' + stateArray);

            dispatch(showElements(stateArray));

        } catch (err) {
            dispatch(toggleListLoading());
            dispatch(toggleErrorListLoading());
            console.log('Catched error: ' + err);
        }
    }
};


// export const addElement = (element) => {
//     return {
//         type: ADD_ELEMENT,
//         element
//     }
// };