export const SELECT_RECORD = 'SELECT_RECORD';

export const DELETE_RECORD = 'DELETE_RECORD';
export const ADD_RECORD = 'ADD_RECORD';
export const EDIT_RECORD = 'EDIT_RECORD';

export const PUSH_TABLE_DATA = 'PUSH_TABLE_DATA';

export const SET_MODAL_PROPS = 'SET_MODAL_PROPS';

export const selectRecordAction = (id) => {
    return {
        type: SELECT_RECORD,
        id
    }
};

export const pushTableDataAction = (data) => {
    return {
        type: PUSH_TABLE_DATA,
        data
    }
};

export const deleteRecordAction = (index) => {
    return {
        type: DELETE_RECORD,
        index
    }
};

export const deleteRecordActionBase = (index, id) => {
    return async (dispatch) => {
        const request = new Request('http://localhost:3000/api/deletevehicle/' + id, {
            method: 'DELETE'
        });

        try {
            const response = await fetch(request);

            dispatch(deleteRecordAction(index));

            dispatch(fetchData());

            return true;
        } catch (err) {
            console.log('deleteRecord response error: ', err);
            return false;
        }
    };
};

export const addRecordAction = (newRecord) => {
    return {
        type: ADD_RECORD,
        newRecord
    }
};

export const addRecordActionBase = (newRecord) => {
    return async (dispatch) => {
        const request = new Request('http://localhost:3000/api/addvehicle', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(newRecord)
        });

        try {
            const response = await fetch(request);

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const data = await response.json();

            dispatch(addRecordAction(newRecord));

            dispatch(fetchData());  //----- может так?

            return true;
        } catch (err) {
            console.log('addRecord response error: ', err);
            return false;
        }
    };
};

export const editRecordAction = (changedRecordObject) => {
    return {
        type: EDIT_RECORD,
        changedRecordObject
    }
};

export const editRecordActionBase = (id, record, changedData) => {
    return async (dispatch) => {
        const request = new Request('http://localhost:3000/api/editvehicle/' + id, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(changedData)
        });

        try {
            const response = await fetch(request);

            console.log('JSON.stringify(changedData) ---> ' + JSON.stringify(changedData));

            const data = await response.json();

            dispatch(editRecordAction({...record, ...changedData}));
            dispatch(fetchData());

            return true;
        } catch (err) {
            console.log('editRecord response error: ', err);
            return false;
        }
    }
};

export const setModalPropsAction = (modalProps) => {
    return {
        type: SET_MODAL_PROPS,
        modalProps
    }
};

export const fetchData = () => {
    return async (dispatch) => {
        try {

            const response = await fetch('http://localhost:3000/api/vehiclelist');

            if(!response.ok) {
                throw Error(response.statusText);
            }

            const data = await response.json();

            dispatch(pushTableDataAction(data));

            console.log('fetchData ---> DONE');

        } catch (err) {
            console.log(err)
        }
    }
};

