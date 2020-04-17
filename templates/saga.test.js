const { capitalCase } = require('change-case');
module.exports = {
    createTestsSaga: (moduleName) => `import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';

import actions from '${moduleName}/actions';
// import {
//     some as someApi
// } from 'apis';
// import { someSaga } from '${moduleName}/saga';
import reducer, { initState } from '${moduleName}/reducer';

// const {
//     someActionSuccess,
//     someActionError,
// } = actions;
// const error = 'something went wrong';

// describe('${capitalCase(moduleName)} saga', () => {
//     describe('someSaga', () => {
//         const someData = {};
//         const apiPayload = {};
//         it('should fetch mock someData', async () => {
//             return expectSaga(someSaga, { payload: apiPayload })
//                 .provide([[call(someApi, apiPayload), { data: someData }]])
//                 .put(someActionSuccess(someData))
//                 .run();
//         });
//         it('should update reducer with mock someData', async () => {
//             return expectSaga(someSaga, { payload: apiPayload })
//                 .provide([[call(someApi, apiPayload), { data: someData }]])
//                 .withReducer(reducer)
//                 .hasFinalState({
//                     ...initState,
//                     someData
//                 });
//         });
//         it('should throw error while fetching mock someData', () => {
//             return expectSaga(someSaga, { payload: apiPayload })
//                 .provide([[call(someApi, apiPayload), throwError(error)]])
//                 .put(someActionError(error))
//                 .run();
//         });
//         afterEach(() => {
//             cleanup();
//         });
//     });
// });
`
}