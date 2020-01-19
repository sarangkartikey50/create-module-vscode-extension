module.exports = {
    createReducer: () => `import {
    SOME_CONSTANT,
    SOME_CONSTANT_SUCCESS,
    SOME_CONSTANT_ERROR,
    CLEAR_STATE
} from './constants';

const initState = {
    data: {},
    loading: false,
    error: {}
};

export default function(state = initState, { type, payload }) {
    switch(type){
        case SOME_CONSTANT:
            return { ...state, loading: true, error: {} };
        case SOME_CONSTANT_SUCCESS:
            return { ...state, loading: false, data: payload };
        case SOME_CONSTANT_ERROR:
            return { ...state, loading: false, error: payload };
        case CLEAR_STATE:
            return initState;
        default:
            return state;
    }
}`
}