import picks from 'userPicks.json';
import { INVALIDATE_TABLE, LOAD_TABLE_START, LOAD_TABLE_SUCCESS } from 'actions';

const initialState = {
    users: picks,
    eplPositions: {
        loading: false,
        positions: []
    }
};

export default function reducer(state = initialState, action) {
    console.log(action);
    switch(action.type) {
        case LOAD_TABLE_START:
            return {
                ...state,
                eplPositions: {
                    ...state.eplPositions,
                    loading: true,
                }
            }
        case LOAD_TABLE_SUCCESS:
            return {
                ...state,
                eplPositions: {
                    loading: false,
                    positions: action.payload
                }
            }
        default:
            return state
    }
}
