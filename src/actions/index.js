import { getNextMonth, getPreviousMonth } from '../helpers/dates';
import * as types from '../constants/actionTypes';

export const toggleSidebar = sidebarVisible => ({
  type: types.TOGGLE_SIDEBAR,
  sidebarVisible,
});

export const saveSettings = settings => ({
  type: types.SAVE_SETTINGS,
  settings,
});

export const goToNextMonth = date => ({
  type: types.GO_TO_NEXT_MONTH,
  newDate: getNextMonth(date),
});

export const goToPreviousMonth = date => ({
  type: types.GO_TO_PREVIOUS_MONTH,
  newDate: getPreviousMonth(date),
});
