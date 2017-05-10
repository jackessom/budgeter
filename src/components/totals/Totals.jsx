import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';
import { isBefore, countMonths, getTodaysMonth } from '../../helpers/dates';
import styles from './totals.css';

const bgColorSelect = (amount) => {
  if (amount < 0) {
    return styles.negativeBg;
  } else if (amount > 0) {
    return styles.positiveBg;
  }
  return null;
};

const getTotalUpToThisMonth = (startAmount, common, allDates, currentDate, startDate) => {
  const allMonthTotals = Object.keys(allDates).reduce((prevTotal, date) => {
    if (isBefore(date, currentDate)) {
      return prevTotal + allDates[date].monthTotal;
    }
    return prevTotal;
  }, startAmount);
  const commonTotals = common * countMonths(startDate, currentDate);
  return allMonthTotals + commonTotals;
};

const Totals = (props) => {
  const monthTotal = props.monthTotal + props.commonTotal;
  const totalToDate = getTotalUpToThisMonth(
    props.startAmount,
    props.commonTotal,
    props.allDates,
    props.currentDate,
    props.startDate,
  ) + monthTotal;
  return (
    <Table selectable={false} theme={styles}>
      <TableHead>
        <TableCell theme={styles}>Month total</TableCell>
        <TableCell theme={styles}>Total to date (inc. this month)</TableCell>
      </TableHead>
      <TableRow theme={styles}>
        <TableCell
          numeric
          theme={styles}
          className={bgColorSelect(monthTotal)}
        >
          {monthTotal}
        </TableCell>
        <TableCell
          numeric
          theme={styles}
          className={bgColorSelect(totalToDate)}
        >
          {totalToDate}
        </TableCell>
      </TableRow>
    </Table>
  );
};

Totals.propTypes = {
  monthTotal: PropTypes.number.isRequired,
  commonTotal: PropTypes.number.isRequired,
  startAmount: PropTypes.number.isRequired,
  currentDate: PropTypes.string.isRequired,
  allDates: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
};

Totals.defaultProps = {
  commonTotal: 0,
  startAmount: 0,
  startDate: getTodaysMonth(),
};

const mapStateToProps = (state) => {
  let monthTotal = 0;
  if (state.dates[state.currentDate]) {
    monthTotal = state.dates[state.currentDate].monthTotal;
  }
  return {
    monthTotal,
    commonTotal: state.settings.commonTotal,
    startAmount: state.settings.startAmount,
    currentDate: state.currentDate,
    allDates: state.dates,
    startDate: state.settings.startDate,
  };
};

export default connect(
  mapStateToProps,
)(Totals);
