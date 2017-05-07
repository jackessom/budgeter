import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardActions, IconButton } from 'react-toolbox';
import { getYearString, getMonthString } from '../../helpers/dates';
import { toggleSidebar, goToNextMonth, goToPreviousMonth } from '../../actions';
import styles from './header.css';

const Header = props => (
  <Card style={{ width: '100%' }}>
    <CardTitle
      title={getMonthString(props.date)}
      subtitle={getYearString(props.date)}
      className={styles.title}
    >
      <IconButton
        icon="chevron_left"
        className={styles.navLeft}
        onMouseUp={() => { props.goToPreviousMonth(props.date); }}
      />
      <IconButton
        icon="chevron_right"
        className={styles.navRight}
        onMouseUp={() => { props.goToNextMonth(props.date); }}
      />
    </CardTitle>
    <CardActions className={styles.actions} >
      <IconButton
        icon="settings"
        onMouseUp={() => { props.openSidebar(); }}
      />
    </CardActions>
  </Card>
);

Header.propTypes = {
  openSidebar: PropTypes.func,
  goToNextMonth: PropTypes.func,
  goToPreviousMonth: PropTypes.func,
  date: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  date: state.currentDate,
});

const mapDispatchToProps = dispatch => ({
  openSidebar: () => {
    dispatch(toggleSidebar(true));
  },
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
