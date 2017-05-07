import { getCurrentDate } from '../helpers/dates';
import {
  GO_TO_NEXT_MONTH,
  GO_TO_PREVIOUS_MONTH,
} from '../constants/actionTypes';

const currentDate = (state = getCurrentDate(), action) => {
  switch (action.type) {
    case GO_TO_NEXT_MONTH:
    case GO_TO_PREVIOUS_MONTH:
      return action.newDate;
    default:
      return state;
  }
};

export default currentDate;
