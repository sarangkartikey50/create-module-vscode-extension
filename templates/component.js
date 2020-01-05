module.exports = {
	createComponent: name => `import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

const ${name} = props => {
    return (
        <div className={styles.container}>
            ${name} component.
        </div>
    );
}

${name}.propTypes = {};

export default ${name};`,
createComponentScss: () => `.container{

}`
};
