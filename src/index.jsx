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
  sidebarVisibility: false,
  currentDate: '2017-05-01T00:00:00.000Z',
  dates: {
    '2017-05-01T00:00:00.000Z': {
      monthTotal: -360,
      items: {
        1: {
          label: 'Holiday',
          value: 400,
          type: 'outgoing',
        },
        2: {
          label: 'Cinema',
          value: 10,
          type: 'outgoing',
        },

        3: {
          label: 'Birthday',
          value: 50,
          type: 'incoming',
        },
      },
    },
    '2017-04-01T00:00:00.000Z': {
      monthTotal: -10,
      items: {
        2: {
          label: 'Cinema',
          value: 10,
          type: 'outgoing',
        },
      },
    },
  },
  settings: {
    id: guid(),
    startDate: '2017-04-01T00:00:00.000Z',
    startAmount: 0,
    outgoings: {
      cfsuab8oron: {
        label: 'rent',
        value: 430,
      },
    },
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
