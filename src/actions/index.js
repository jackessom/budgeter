import { SAVE_SETTINGS } from '../constants/actionTypes';

export const saveSettings = settings => ({
  type: SAVE_SETTINGS,
  settings,
});

export const savanothereSettings = settings => ({
  type: SAVE_SETTINGS,
  settings,
});
