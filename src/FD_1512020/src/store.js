import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import rootEpic from './epic';

import rootReducers from './reducers';

// const client = axios.create({
//   baseURL: 'https://food-delivery-server.herokuapp.com',
//   responseType: 'json',
// });
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signIn', 'notifs'],
};

const epicMiddleware = createEpicMiddleware();
const pReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(pReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
export const persistor = persistStore(store);
export default store;
