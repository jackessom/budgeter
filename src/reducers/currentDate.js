import { getCurrentDate } from '../helpers/dates';
import { GO_TO_DATE } from '../constants/actionTypes';

const currentDate = (state = getCurrentDate(), action) => {
  switch (action.type) {
    case GO_TO_DATE:
      return action.newDate;
    default:
      return state;
  }
};

export default currentDate;
