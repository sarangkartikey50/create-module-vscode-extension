module.exports = {
    createActions: () => `import * as constants from './constants';
import { keys, camelCase } from 'lodash';

const actions = {};
    
keys(constants).forEach(constant => {
    const typeName = constant;
    actions[camelCase(typeName)] = payload => ({
        type: typeName,
        payload
    });
});

export default actions;`
}