import * as types from '../constants/actionTypes';

export const saveSettings = settings => ({
  type: types.SAVE_SETTINGS,
  settings,
});

export const toggleSidebar = sidebarVisible => ({
  type: types.TOGGLE_SIDEBAR,
  sidebarVisible,
});
