module.exports = {
    createActions: () => `import {
    SOME_CONSTANT,
    SOME_CONSTANT_SUCCESS,
    SOME_CONSTANT_ERROR
} from './constants';

const someAction = (payload) => ({
    type: SOME_CONSTANT,
    payload
});

const someActionSuccess = (payload) => ({
    type: SOME_CONSTANT_SUCCESS,
    payload
});

const someActionError = (payload) => ({
    type: SOME_CONSTANT_ERROR,
    payload
});

export {
    someAction,
    someActionSuccess,
    someActionError
};`
}