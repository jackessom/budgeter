import { combineReducers } from 'redux';
import settings from './settings';
import sidebarVisibility from './sidebarVisibility';

const reducers = combineReducers({
  sidebarVisibility,
  settings,
});

export default reducers;
