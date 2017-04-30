import { SAVE_SETTINGS } from '../constants/actionTypes';

const settings = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SETTINGS:
      return Object.assign({}, state, action.settings);
    default:
      return state;
  }
};

export default settings;
