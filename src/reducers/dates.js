import { SAVE_DATE, REMOVE_DATES, REMOVE_DATES_BEFORE_START } from '../constants/actionTypes';

const dates = (state = {}, action) => {
  switch (action.type) {
    case SAVE_DATE:
      return Object.assign({}, state, {
        [action.date]: action.dateObject,
      });
    case REMOVE_DATES:
    case REMOVE_DATES_BEFORE_START: {
      return action.newDates;
    }
    default:
      return state;
  }
};

export default dates;
