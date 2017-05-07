import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import { getISODate, getNextMonth, getPreviousMonth } from '../../helpers/dates';

const Month = (props) => {
  const date = getISODate(2017, 1);
  const nextDate = getNextMonth(date);
  const previousDate = getPreviousMonth(date);
  console.log(`
    current: ${date}
    next: ${nextDate}
    previous: ${previousDate}
    redux date: ${props.currentDate}
  `);
  return (
    <div>
      <Header />
    </div>
  );
};

Month.propTypes = {
  currentDate: PropTypes.string,
};

const mapStateToProps = state => ({
  currentDate: state.currentDate,
});

export default connect(
  mapStateToProps,
)(Month);
