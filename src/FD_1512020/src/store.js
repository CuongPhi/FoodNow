import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducers from './reducers';

const client = axios.create({
  baseURL: 'https://food-delivery-server.herokuapp.com',
  responseType: 'json',
});

const store = createStore(rootReducers, applyMiddleware(axiosMiddleware(client)));

export default store;
