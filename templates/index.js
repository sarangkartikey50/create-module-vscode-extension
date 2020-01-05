const { createComponent, createComponentScss } = require('./component');
const { createPage, createPageScss } = require('./page');
const { createSaga } = require('./saga');
const { createConstants } = require('./constants');
const { createActions } = require('./actions');
const { createReducer } = require('./reducer');
module.exports = {
    createComponent,
    createComponentScss,
    createPage,
    createPageScss,
    createSaga,
    createActions,
    createConstants,
    createReducer
};