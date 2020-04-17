const { capitalCase } = require('change-case');
module.exports = {
	createTestsActions: (
		moduleName
	) => `import actions from '${moduleName}/actions';
//import { SOME_CONSTANT, } from '${moduleName}/constants';

//const { someAction } = actions;

// describe('${capitalCase(moduleName)} actions', () => {
//     test('someAction', () => {
//         const payload = {} // update payload
//         expect(someAction(payload)).toStrictEqual({
//             type: SOME_CONSTANT,
//             payload
//         });
//     });
//     afterEach(() => {
//         cleanup();
//     });
// });
`,
};
