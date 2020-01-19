module.exports = {
  createPage: (name, moduleName) => `import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { buildUrl } from 'utils';
import { routesPath } from 'Routes';
import { updateLayoutProps, showBackButton, clearState } from '${moduleName}/actions';
import styles from './index.scss';

const ${name} = ({ history, match, updateLayoutProps, showBackButton, clearState }) => {
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
    const handleBackButtonClick = () => ({});
    return (
        <div className={styles.container}>
            ${name} page.
        </div>
    );
};

${name}.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    updateLayoutProps: PropTypes.func.isRequired,
    showBackButton: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateLayoutProps: payload => dispatch(updateLayoutProps(payload)),
    showBackButton: payload => dispatch(showBackButton(payload)),
    clearState: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(${name});`,
  createPageScss: () => `.rhsContent {
    max-width: 100% !important;
    padding: 20px 0px 40px 0px !important;
}

.container{

}

.loaderContainer{

}`
};
