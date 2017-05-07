import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import 'normalize.css';
import reducers from './reducers';
import App from './containers/app/App';
import guid from './helpers/guid';

const initialState = {
  sidebarVisibility: true,
  currentDate: '2017-05-01T00:00:00.000Z',
  dates: {
    '2017-05-01T00:00:00.000Z': {
      monthTotal: 0,
      items: [],
    },
    '2017-04-01T00:00:00.000Z': {
      monthTotal: 0,
      items: [],
    },
  },
  settings: {
    id: guid(),
    name: 'Jack',
    startDate: new Date(),
    startAmount: 0,
    outgoings: {},
    incomings: {},
  },
};

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(logger),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
