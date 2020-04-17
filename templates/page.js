const { camelCase } = require('change-case');
module.exports = {
  createPage: (name, moduleName) => `import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buildUrl } from 'utils';
import { routesPath } from 'Routes';
import { updateLayoutProps, showBackButton } from 'helpers/dispatchAction'
import { clearState } from '${moduleName}/actions';
import styles from './index.scss';

const ${name} = ({ history, match, clearState }) => {
    useEffect(() => {
        updateLayoutProps({
            whiteHeader: true,
            whiteBackground: true,
            rhsContentClassName: styles.rhsContent,
            showHeaderShadow: true
        });
        showBackButton({
            showBackButton: true,
            onBackButtonClick: handleBackButtonClick
        });
        return () => clearState();
    }, []);
    const handleBackButtonClick = useCallback(() => ({}), []);
    return (
        <div className={styles.container}>
            ${name} page.
        </div>
    );
};

${name}.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    clearState: PropTypes.func.isRequired
};

const mapStateToProps = ({ ${camelCase(name)} }) => ({
});

const mapDispatchToProps = dispatch => ({
    clearState: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(${name});`,
  createPageScss: () => `.rhsContent {
    max-width: 100% !important;
    padding: 20px 0px 40px 0px !important;
}`
};
