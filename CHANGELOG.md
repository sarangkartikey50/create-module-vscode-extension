# Change Log

## v1.0.1

```Actions.js```

1. Removed someActions from export.
2. Removed updateLayoutProps. 

```javascript import { camelCase, keys } from 'lodash';
import * as constants from './constants';

const actions = {};

keys(constants).forEach(constant => {
    const typeName = constant;
    actions[camelCase(typeName)] = payload => ({
        type: typeName,
        payload
    });
});

export default actions;
```

```RoutePaths.js```

1. Path value '-' seperated.

```Constants.js```

1. Remove some constants.

```Index.js```

1. import { updateLayoutProps, showBackButton } from 'helpers/dispatchAction'
2. remove updateLayoutProps, showBackButton from props, propTypes, mapDispatchToProps.
3. Add useCallback for showBackButton.

```Routes.js```

1. Add comment before import module statement.
2. Move route before errorpage.

```Reducer.js```

1. Remove someActions.

```Saga.js```

1. Added comments

```javascript
import { call, put, takeLatest } from 'redux-saga/effects';
// import { SOME_CONSTANT } from './constants';
// import { someActionSuccess, someActionError } from './actions'
// import { someApi } from 'apis';

function* someSaga({ payload }){
    yield 'Remove this line';
    try{
        // const { data } = yield call(someApi, payload);
        // yield put(someActionSuccess(data));
    } catch(err) {
        // yield put(someActionError(err));
    }
}

export default [
    // takeLatest(SOME_CONSTANT, someSaga)
];
```

#New Releases

1. Added tests. 
```
/__tests__
    /Components
        /<component>.test.js
    /mockData
        /<data>.js
    /actions.test.js
    /reducer.test.js
    /saga.test.js
    /index.test.js /* Integration */
```