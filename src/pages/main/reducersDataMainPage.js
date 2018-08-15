import { PUSH_TABLE_DATA, DELETE_RECORD, ADD_RECORD, EDIT_RECORD } from './actions';

const tableData = [];

function tableDataTool(state = tableData, action) {
    switch (action.type) {
        case PUSH_TABLE_DATA:
            return state = action.data;
        case DELETE_RECORD:
            console.log('reducer DELETE_RECORD');
            state.splice(action.index, 1);
            return state;
        case ADD_RECORD:
            console.log('reducer ADD_RECORD');
            state.push(action.newRecord);
            return state;
        case EDIT_RECORD:
            console.log('reducer EDIT_RECORD');
            return [...state, ...action.changedRecordObject];
        default:
            return state;
    }
};

export default tableDataTool;