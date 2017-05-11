import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'normalize.css';
import './styles/fonts.css';
import reducers from './reducers';
import App from './containers/app/App';

OfflinePluginRuntime.install();

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger'); // eslint-disable-line global-require
  middleware = [...middleware, logger];
}

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
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
