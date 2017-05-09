import { SAVE_MONTH, REMOVE_MONTH } from '../constants/actionTypes';

const dates = (state = {}, action) => {
  switch (action.type) {
    case SAVE_MONTH:
      return Object.assign({}, state, {
        [action.date]: action.dateObject,
      });
    case REMOVE_MONTH: {
      const copy = Object.assign({}, state);
      delete copy[action.date];
      return copy;
    }
    default:
      return state;
  }
};

export default dates;
