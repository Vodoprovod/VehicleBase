import { combineReducers } from 'redux';

import { SELECT_RECORD, SET_MODAL_PROPS } from './actions';

const selectedId = '0';

const modalProps = {
    modalTitle: null,
    modalContent: null,
    modalFooter: null,
    modalAction: null
};

function selectedItemId(state = selectedId, action) {
    switch (action.type) {
        case SELECT_RECORD:
            return state = action.id;
        default:
            return state;
    }
};

export function setModalProps(state = modalProps, action) {
    switch (action.type) {
        case SET_MODAL_PROPS:
            console.log('modal props ---> ' + action.modalProps.modalContent);
            return state = action.modalProps;
        default:
            return state;
    }
};

export default selectedItemId;