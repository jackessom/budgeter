import { SAVE_DATE, REMOVE_DATES } from '../constants/actionTypes';

const dates = (state = {}, action) => {
  switch (action.type) {
    case SAVE_DATE:
      return Object.assign({}, state, {
        [action.date]: action.dateObject,
      });
    case REMOVE_DATES: {
      return action.newDates;
    }
    default:
      return state;
  }
};

export default dates;
