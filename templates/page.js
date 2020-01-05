module.exports = {
  createPage: name => `import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { buildUrl } from 'utils';
import { routesPath } from 'routes';
import { updateLayoutProps, showBackButton } from '${name}/actions';
import styles from './index.scss';

const ${name} = ({ history, match, updateLayoutProps, showBackButton }) => {
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
    showBackButton: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateLayoutProps: payload => dispatch(updateLayoutProps(payload)),
    showBackButton: payload => dispatch(showBackButton(payload))
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
