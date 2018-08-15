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

export const addRecordAction = (newRecord) => {
    return {
        type: ADD_RECORD,
        newRecord
    }
};

export const editRecordAction = (changedRecordObject) => {
    return {
        type: EDIT_RECORD,
        changedRecordObject
    }
};

export const setModalPropsAction = (modalProps) => {
    return {
        type: SET_MODAL_PROPS,
        modalProps
    }
};