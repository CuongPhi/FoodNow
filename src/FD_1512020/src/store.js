import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootEpic from './epic';

import rootReducers from './reducers';

// const client = axios.create({
//   baseURL: 'https://food-delivery-server.herokuapp.com',
//   responseType: 'json',
// });

// The transformer
const mapTransformer = config =>
  createTransform(
    map => JSON.stringify(Array.from(map)),
    arrayString => new Map(JSON.parse(arrayString)),
    config
  );

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signIn', 'notifs', 'order'],
  transforms: [mapTransformer({ whitelist: 'order.data' })],
};

const epicMiddleware = createEpicMiddleware();
const pReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(pReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
export const persistor = persistStore(store);
export default store;
