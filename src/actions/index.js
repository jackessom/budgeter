import { getNextMonth, getPreviousMonth } from '../helpers/dates';
import * as types from '../constants/actionTypes';

export const toggleSidebar = sidebarVisible => ({
  type: types.TOGGLE_SIDEBAR,
  sidebarVisible,
});

export const saveSettings = (settings) => {
  const commonOutgoingTotal = Object.keys(settings.outgoings).reduce((prevTotal, key) => (
    prevTotal + settings.outgoings[key].value
  ), 0);
  const commonIncomingTotal = Object.keys(settings.incomings).reduce((prevTotal, key) => (
    prevTotal + settings.incomings[key].value
  ), 0);
  const newSettings = Object.assign({}, settings, {
    commonTotal: commonIncomingTotal - commonOutgoingTotal,
  });
  return {
    type: types.SAVE_SETTINGS,
    settings: newSettings,
  };
};

export const goToNextMonth = date => ({
  type: types.GO_TO_NEXT_MONTH,
  newDate: getNextMonth(date),
});

export const goToPreviousMonth = date => ({
  type: types.GO_TO_PREVIOUS_MONTH,
  newDate: getPreviousMonth(date),
});

export const saveMonth = (date, dateObject) => {
  const monthTotal = Object.keys(dateObject.items).reduce((prevTotal, key) => {
    if (dateObject.items[key].type === 'incoming') {
      return prevTotal + dateObject.items[key].value;
    } else if (dateObject.items[key].type === 'outgoing') {
      return prevTotal - dateObject.items[key].value;
    }
    return prevTotal;
  }, 0);
  const newDateObject = Object.assign({}, dateObject, {
    monthTotal,
  });
  return {
    type: types.SAVE_MONTH,
    date,
    dateObject: newDateObject,
  };
};

export const removeMonth = date => ({
  type: types.REMOVE_MONTH,
  date,
});
