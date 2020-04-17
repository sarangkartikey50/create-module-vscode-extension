const { createComponent, createComponentScss } = require('./component');
const { createPage, createPageScss } = require('./page');
const { createSaga } = require('./saga');
const { createConstants } = require('./constants');
const { createActions } = require('./actions');
const { createReducer } = require('./reducer');
const { createTestsActions } = require('./actions.test');
const { createTestsReducer } = require('./reducer.test');
const { createTestsSaga } = require('./saga.test');
const { createTestsPage } = require('./page.test');
const { createTestsComponent } = require('./component.test');
const { createTestsIndex } = require('./index.test');
module.exports = {
    createComponent,
    createComponentScss,
    createPage,
    createPageScss,
    createSaga,
    createActions,
    createConstants,
    createReducer,
    createTestsActions,
    createTestsComponent,
    createTestsPage,
    createTestsReducer,
    createTestsSaga,
    createTestsIndex,
};