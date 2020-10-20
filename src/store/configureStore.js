import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import apiMiddleware from '@store/apiMiddleware';

const middleWares = [thunk, apiMiddleware];

export default function configureStore() {
  const enhancer = composeWithDevTools(applyMiddleware(...middleWares));
  const store = createStore(reducer, enhancer);
  return store;
}
