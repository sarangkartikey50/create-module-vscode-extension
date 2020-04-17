module.exports = {
    createReducer: () => `import {
    CLEAR_STATE
} from './constants';

const initState = {
    data: {},
    loading: false,
    error: {}
};

export default function(state = initState, { type, payload }) {
    switch(type){
        case CLEAR_STATE:
            return initState;
        default:
            return state;
    }
}`
}