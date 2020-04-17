const { capitalCase } = require('change-case');
module.exports = {
    createTestsIndex: (moduleName) => `import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import _ from 'lodash';
    
import ${moduleName} from '${moduleName}';
import { checkProps, renderWithReduxWithRouter } from 'utils';
import store from 'store';
// import someMockData from '${moduleName}/__tests__/__mocks__/some.json';

// describe('<${moduleName} />', () => {
//     const expectedProps = {
//         //mention all your props here with empty data. For eg, someObject: {}, someArray: []
//     };
//     describe('Testing Prop-Types', () => {
//         it('should not throw any warnings for prop types', () => {
//             const propsErr = checkProps(${moduleName}, expectedProps);
//             expect(propsErr).toBeUndefined();
//         });
//         it('should throw warnings for prop types', () => {
//             const propsErr = checkProps(${moduleName}, null);
//             expect(propsErr).toBeDefined();
//         });
//         afterEach(() => {
//             cleanup();
//         });
//     });
//     describe('Testing rendering of ${moduleName}', () => {
//         let Component;
//         beforeAll(() => {
//             const mock = new MockAdapter(axios);
//             mock.onGet('/api/v5.1/some-api/').reply(
//                 200,
//                 someMockData
//             );
//             Component = renderWithReduxWithRouter(<${moduleName} />, store);
//         });
//         it('should render without error', async (done) => {
//             const { findAllByTestId, findByTestId, getByText, getByPlaceholderText } = Component;
//             const someComponent = await waitForElement(() => findByTestId('some-component'));
//             expect(someComponent).toBeInTheDocument();
//             done();
//         }, 30000);
//         afterEach(() => {
//             cleanup();
//         });
//     });
// });
`
}