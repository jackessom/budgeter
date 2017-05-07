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
