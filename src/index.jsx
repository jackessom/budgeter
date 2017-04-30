import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import 'normalize.css';
import reducers from './reducers';
import App from './containers/app/App';

const store = createStore(
  reducers,
  applyMiddleware(logger),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
