import { getNextMonth, getPreviousMonth } from '../helpers/dates';
import * as types from '../constants/actionTypes';

export const toggleSidebar = sidebarVisible => ({
  type: types.TOGGLE_SIDEBAR,
  sidebarVisible,
});

export const saveSettings = (settings) => {
  const commonOutgoingTotal = Object.keys(settings.outgoings).reduce((prevTotal, key) => (
    prevTotal + parseFloat(settings.outgoings[key].value)
  ), 0);
  const commonIncomingTotal = Object.keys(settings.incomings).reduce((prevTotal, key) => (
    prevTotal + parseFloat(settings.incomings[key].value)
  ), 0);
  const newSettings = Object.assign({}, settings, {
    commonTotal: commonIncomingTotal - commonOutgoingTotal,
  });
  return {
    type: types.SAVE_SETTINGS,
    settings: newSettings,
  };
};

export const removeEmptyDates = (dates) => {
  const newDates = Object.keys(dates).reduce((currentTotalDates, date) => {
    const tempTotalDates = Object.assign({}, currentTotalDates);
    if (Object.keys(dates[date].items).length !== 0) {
      tempTotalDates[date] = dates[date];
    }
    return tempTotalDates;
  }, {});
  return {
    type: types.REMOVE_DATES,
    newDates,
  };
};

export const goToDate = date => ({
  type: types.GO_TO_DATE,
  newDate: date,
});

export const goToNextMonth = date => (
  (dispatch, getState) => {
    dispatch(goToDate(getNextMonth(date)));
    const { dates } = getState();
    dispatch(removeEmptyDates(dates));
  }
);

export const goToPreviousMonth = date => (
  (dispatch, getState) => {
    dispatch(goToDate(getPreviousMonth(date)));
    const { dates } = getState();
    dispatch(removeEmptyDates(dates));
  }
);

export const saveMonth = (date, dateObject) => {
  const monthTotal = Object.keys(dateObject.items).reduce((prevTotal, key) => {
    if (dateObject.items[key].type === 'incoming') {
      return prevTotal + parseFloat(dateObject.items[key].value);
    } else if (dateObject.items[key].type === 'outgoing') {
      return prevTotal - parseFloat(dateObject.items[key].value);
    }
    return prevTotal;
  }, 0);
  const newDateObject = Object.assign({}, dateObject, {
    monthTotal,
  });
  return {
    type: types.SAVE_DATE,
    date,
    dateObject: newDateObject,
  };
};
