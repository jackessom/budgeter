import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, IconButton } from 'react-toolbox';
import { getYearString, getMonthString, getPreviousMonth, isBefore, getTodaysMonth } from '../../helpers/dates';
import { goToNextMonth, goToPreviousMonth } from '../../actions';
import styles from './header.css';
import baseStyles from '../../styles/base.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disablePrevious: isBefore(getPreviousMonth(this.props.date), this.props.startDate),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disablePrevious: isBefore(getPreviousMonth(nextProps.date), nextProps.startDate),
    });
  }

  render() {
    return (
      <Card>
        <CardTitle theme={styles}>
          <div className={styles.monthDisplay}>
            <IconButton
              className={this.state.disablePrevious ? styles.disabledButton : styles.buttons}
              icon="chevron_left"
              onMouseUp={() => {
                if (!this.state.disablePrevious) {
                  this.props.goToPreviousMonth(this.props.date);
                }
              }}
            />
            <h2 className={`${baseStyles.noMargin} ${styles.title}`}>
              {getMonthString(this.props.date)} <span>{getYearString(this.props.date)}</span>
            </h2>
            <IconButton
              className={styles.buttons}
              icon="chevron_right"
              onMouseUp={() => { this.props.goToNextMonth(this.props.date); }}
            />
          </div>
        </CardTitle>
      </Card>
    );
  }
}

Header.propTypes = {
  goToNextMonth: PropTypes.func.isRequired,
  goToPreviousMonth: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
};

Header.defaultProps = {
  startDate: getTodaysMonth(),
};

const mapStateToProps = state => ({
  date: state.currentDate,
  startDate: state.settings.startDate,
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
