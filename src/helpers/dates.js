import moment from 'moment';

export function getISODate(year, month) {
  return moment.utc([year, month - 1]).toISOString();
}

export function getCurrentDate() {
  const currentDate = moment.utc();
  const currentYear = moment.utc(currentDate).year();
  const currentMonth = moment.utc(currentDate).month() + 1;
  return getISODate(currentYear, currentMonth);
}

export function getNextMonth(ISODate) {
  let year = moment.utc(ISODate).year();
  let month = moment.utc(ISODate).month() + 1;
  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }
  return moment.utc([year, month - 1]).toISOString();
}

export function getPreviousMonth(ISODate) {
  let year = moment.utc(ISODate).year();
  let month = moment.utc(ISODate).month() + 1;
  month -= 1;
  if (month < 1) {
    month = 12;
    year -= 1;
  }
  return moment.utc([year, month - 1]).toISOString();
}

export function getYearString(ISODate) {
  return moment.utc(ISODate).format('YYYY');
}

export function getMonthString(ISODate) {
  return moment.utc(ISODate).format('MMMM');
}

export function countMonths(startDate, endDate) {
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  let months;
  months = (endDateObject.getFullYear() - startDateObject.getFullYear()) * 12;
  months -= startDateObject.getMonth() + 1;
  months += endDateObject.getMonth() + 1;
  return months <= 0 ? 0 : months;
}

export function isBefore(dateToCheck, baseDate) {
  if ((moment.utc(dateToCheck).valueOf() - moment.utc(baseDate).valueOf()) < 0) {
    return true;
  }
  return false;
}

export function getTodaysMonth() {
  return getISODate(moment.utc(new Date()).year(), moment.utc(new Date()).month() + 1);
}

export function getArrayOfYears(currentStartDate) {
  const years = [];
  const todaysYear = moment.utc().year();
  const currentStartYear = moment.utc(currentStartDate).year();
  const diff = Math.abs(currentStartYear - todaysYear);
  const ammountOfYears = 2 + diff + 5;
  let startYear;
  if (currentStartYear < todaysYear) {
    startYear = currentStartYear - 2;
  } else {
    startYear = todaysYear - 2;
  }
  for (let i = 0; i < ammountOfYears; i += 1) {
    years.push({ value: startYear + i, label: startYear + i });
  }
  console.log(diff);
  return years;
}
