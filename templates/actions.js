module.exports = {
    createActions: () => `import {
    UPDATE_LAYOUT_PROPS,
    SHOW_BACK_BUTTON,
    CLEAR_STATE
} from './constants';

const updateLayoutProps = payload => ({
    type: UPDATE_LAYOUT_PROPS,
    payload
});

const showBackButton = payload => ({
    type: SHOW_BACK_BUTTON,
    payload
});

const clearState = () => ({
    type: CLEAR_STATE
});

export {
    someAction,
    someActionSuccess,
    someActionError,
    showBackButton,
    clearState
};`
}