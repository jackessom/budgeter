import { combineReducers } from 'redux';
import sidebarVisibility from './sidebarVisibility';
import currentDate from './currentDate';
import dates from './dates';
import settings from './settings';

const reducers = combineReducers({
  sidebarVisibility,
  currentDate,
  dates,
  settings,
});

export default reducers;
