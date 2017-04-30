import { TOGGLE_SIDEBAR } from '../constants/actionTypes';

const sidebarVisibility = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return action.sidebarVisible;
    default:
      return state;
  }
};

export default sidebarVisibility;
