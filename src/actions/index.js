import { getNextMonth, getPreviousMonth, datesBeforeStart, isBefore } from '../helpers/dates';
import { calculateCommonTotal } from '../helpers/calculateTotals';
import * as types from '../constants/actionTypes';

export const toggleSidebar = sidebarVisible => ({
  type: types.TOGGLE_SIDEBAR,
  sidebarVisible,
});

export const removeDatesBeforeStart = (dateKeysArray, allDates) => {
  const newDates = Object.keys(allDates).reduce((prevObj, item) => {
    if (dateKeysArray.indexOf(item) === -1) {
      const newObj = Object.assign({}, prevObj, {
        [item]: allDates[item],
      });
      return newObj;
    }
    return prevObj;
  }, {});
  return {
    type: types.REMOVE_DATES_BEFORE_START,
    newDates,
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

export const saveSettings = settings => (
  (dispatch, getState) => {
    const newSettings = Object.assign({}, settings, {
      commonTotal: calculateCommonTotal(settings.outgoings, settings.incomings),
    });
    dispatch({
      type: types.SAVE_SETTINGS,
      settings: newSettings,
    });
    const { dates, currentDate } = getState();
    const dateKeysArray = datesBeforeStart(settings.startDate, dates);
    if (dateKeysArray.length > 0) {
      dispatch(removeDatesBeforeStart(dateKeysArray, dates));
    }
    if (isBefore(currentDate, settings.startDate)) {
      dispatch(goToDate(settings.startDate));
    }
  }
);
