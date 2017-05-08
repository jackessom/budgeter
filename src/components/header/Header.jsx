import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, IconButton } from 'react-toolbox';
import { getYearString, getMonthString } from '../../helpers/dates';
import { goToNextMonth, goToPreviousMonth } from '../../actions';
import styles from './header.css';
import baseStyles from '../../styles/base.css';

const Header = props => (
  <Card style={{ width: '100%' }}>
    <CardTitle theme={styles}>
      <div className={styles.monthDisplay}>
        <IconButton
          className={styles.buttons}
          icon="chevron_left"
          onMouseUp={() => { props.goToPreviousMonth(props.date); }}
        />
        <h2 className={`${baseStyles.noMargin} ${styles.title}`}>
          {getMonthString(props.date)} <span>{getYearString(props.date)}</span>
        </h2>
        <IconButton
          className={styles.buttons}
          icon="chevron_right"
          onMouseUp={() => { props.goToNextMonth(props.date); }}
        />
      </div>
    </CardTitle>
  </Card>
);

Header.propTypes = {
  goToNextMonth: PropTypes.func,
  goToPreviousMonth: PropTypes.func,
  date: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  date: state.currentDate,
});

const mapDispatchToProps = dispatch => ({
  goToNextMonth: (date) => {
    dispatch(goToNextMonth(date));
  },
  goToPreviousMonth: (date) => {
    dispatch(goToPreviousMonth(date));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
