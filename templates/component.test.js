const { capitalCase } = require('change-case');
module.exports = {
    createTestsComponent: (moduleName, componentName) => `import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ${componentName} from '${moduleName}/Components/${componentName}';
import { checkProps } from 'utils';

// describe('${capitalCase(componentName)} Component', () => {
//     const expectedProps = {
//     };
//     describe('Testing Prop-types', () => {
//         it('should not throw any warnings', () => {
//             const propsErr = checkProps(${componentName}, expectedProps);
//             expect(propsErr).toBeUndefined();
//         });
//         it('should throw warnings for invalid prop-types', () => {
//             const propsErr = checkProps(${componentName}, null);
//             expect(propsErr).toBeDefined();
//         });
//     });
//     describe('Testing rendering of component', () => {
//         let component;
//         beforeEach(() => {
//             component = render(<${componentName} {...expectedProps} />);
//         });
//         it('should render ${componentName} component', async () => {
//             const { findByTestId } = component;
//             const someElement = await waitForElement(() =>
//                 findByTestId('some-element')
//             );
//             expect(someElement).toBeInTheDocument();
//             expect(someElement.textContent).toBe('some text');
//         });
//         it('should test snapshot without any errors', () => {
//             const { asFragment } = component;
//             expect(asFragment()).toMatchSnapshot();
//         });
//         afterEach(() => {
//             cleanup();
//         });
//     });
// });    
`
}