module.exports = {
    createSaga: () => `import { call, put, takeLatest } from 'redux-saga/effects';
import { SOME_CONSTANT } from './constants';
import { someActionSuccess, someActionError } from './actions'
import { someApi } from 'apis';

function* someSaga({ payload }){
    try{
        const { data } = yield call(someApi, payload);
        yield put(someActionSuccess(data));
    } catch(err) {
        yield put(someActionError(data));
    }
}

export default [
    takeLatest(SOME_CONSTANT, someSaga)
];`
}