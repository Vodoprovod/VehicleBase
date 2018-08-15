export const FETCH_ITEM = 'FETCH_ITEM';

export const fetchItemAction = (item) => {
    return {
        type: FETCH_ITEM,
        item
    }
};