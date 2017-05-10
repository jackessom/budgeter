import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import logger from 'redux-logger';
import 'normalize.css';
import 'material-design-icons';
import reducers from './reducers';
import App from './containers/app/App';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(logger),
    autoRehydrate(),
  ),
);

persistStore(store, { storage: localForage, keyPrefix: 'budgeter' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
