const { capitalCase } = require('change-case');
module.exports = {
    createTestsReducer: (moduleName) => `import { get } from 'lodash';
import reducer, { initState } from '${moduleName}/reducer';
// import {
//     SOME_CONSTANT,
//     SOME_CONSTANT_SUCCESS,
//     SOME_CONSTANT_ERROR,
// } from 'WeeklyReports/constants';

// describe('${capitalCase(moduleName)} reducer', () => {
//     const message = 'Something went wrong';
//     test('initState', () => {
//         const newState = reducer(undefined, {});
//         expect(newState).toStrictEqual(initState);
//     });
//     test('SOME_CONSTANT', () => {
//         const updatedState = {
//             ...initState,
//             someError: {},
//             someLoading: true
//         };
//         expect(updatedState).toStrictEqual(
//             reducer(undefined, {
//                 type: SOME_CONSTANT
//             })
//         );
//     });
//     test('SOME_CONSTANT_SUCCESS', () => {
//         const payload = {
//             someData: {
//                 some: 'data'
//             }
//         };
//         const updatedState = {
//             ...initState,
//             some: get(payload, 'someData', {}),
//             someLoading: false
//         };
//         expect(updatedState).toStrictEqual(
//             reducer(undefined, {
//                 type: SOME_CONSTANT_SUCCESS,
//                 payload
//             })
//         );
//     });
//     test('SOME_CONSTANT_ERROR', () => {
//         const payload = {
//             message
//         };
//         const updatedState = {
//             ...initState,
//             someError: payload
//         };
//         expect(updatedState).toStrictEqual(
//             reducer(undefined, {
//                 type: SOME_CONSTANT_ERROR,
//                 payload
//             })
//         );
//     });
//     afterEach(() => {
//         cleanup();
//     });
// });
`
}