import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import firebase from 'react-native-firebase';

import rootSaga from '../sagas';
import reducers from '../reducers';

const middleware = createSagaMiddleware();
export const store = createStore(reducers, {}, applyMiddleware(middleware));

middleware.run(rootSaga);

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
