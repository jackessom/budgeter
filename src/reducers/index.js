import { combineReducers } from 'redux';
import sidebarVisibility from './sidebarVisibility';
import currentDate from './currentDate';
import settings from './settings';

const reducers = combineReducers({
  sidebarVisibility,
  currentDate,
  dates: settings,
  settings,
});

export default reducers;
