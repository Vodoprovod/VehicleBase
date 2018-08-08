export const SELECT_RECORD = 'SELECT_RECORD';

export const selectRecordAction = (id) => {
    console.log('selectRecordAction action');
    return {
        type: SELECT_RECORD,
        id
    }
};