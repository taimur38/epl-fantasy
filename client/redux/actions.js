import axios from 'axios';

export const INVALIDATE_TABLE = 'INVALIDATE_TABLE';
export const LOAD_TABLE_START = 'LOAD_TABLE_START';
export const LOAD_TABLE_SUCCESS = 'LOAD_TABLE_SUCCESS';

function loadTableStart() {
    return {
        type: LOAD_TABLE_START
    }
}

function loadTableSuccess(data) {
    return {
        type: LOAD_TABLE_SUCCESS,
        payload: data.Data
    }
}

export function loadTable() {
   return (dispatch, getState) => {
       dispatch(loadTableStart());

       axios.get('/api/table').then(res => dispatch(loadTableSuccess(res.data)))
   }
}
