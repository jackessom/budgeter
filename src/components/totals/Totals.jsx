import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox';
import styles from './totals.css';

const bgColorSelect = (amount) => {
  if (amount < 0) {
    return styles.negativeBg;
  } else if (amount > 0) {
    return styles.positiveBg;
  }
  return null;
};

const Totals = props => (
  <Table selectable={false} theme={styles}>
    <TableHead>
      <TableCell theme={styles}>Month total</TableCell>
      <TableCell theme={styles}>Total to date (inc. this month)</TableCell>
    </TableHead>
    <TableRow theme={styles}>
      <TableCell
        numeric
        theme={styles}
        className={bgColorSelect(props.monthTotal)}
      >{
        props.monthTotal}
      </TableCell>
      <TableCell
        numeric
        theme={styles}
        className={bgColorSelect(4300)}
      >{
        4300}
      </TableCell>
    </TableRow>
  </Table>
);

Totals.propTypes = {
  monthTotal: PropTypes.number,
};

Totals.defaultProps = {
  monthTotal: 0,
};

const mapStateToProps = (state) => {
  if (state.dates[state.currentDate]) {
    return ({
      monthTotal: state.dates[state.currentDate].monthTotal,
    });
  }
  return {};
};

export default connect(
  mapStateToProps,
)(Totals);
