import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, RadioGroup, RadioButton } from 'react-toolbox';
import { saveMonth } from '../../actions';
import Header from '../../components/header/Header';
import Totals from '../../components/totals/Totals';
import DynamicList from '../../components/dynamicList/DynamicList';
import styles from './month.css';

class Month extends Component {

  constructor(props) {
    super(props);
    this.handleListChange = this.handleListChange.bind(this);
  }

  handleListChange(items) {
    const updatedMonth = Object.assign({}, this.props.date, { items });
    this.props.saveMonth(this.props.currentDate, updatedMonth);
  }

  render() {
    const defaultValues = {
      label: '',
      value: '',
      type: '',
    };
    return (
      <div>
        <Header />
        <Totals />
        <DynamicList
          name="monthItems"
          header="This month's specific incomings and outgoings"
          items={this.props.date.items}
          defaultValues={defaultValues}
          handleListChange={this.handleListChange}
          withChip
        >
          <Input
            type="text"
            label="Label"
            name="label"
            required
          />
          <Input
            type="number"
            label="Amount"
            name="value"
          />
          <p>Type</p>
          <RadioGroup className={styles.radioGroup} name="type">
            <RadioButton label="Incoming" value="incoming" />
            <RadioButton label="Outgoing" value="outgoing" />
          </RadioGroup>
        </DynamicList>
      </div>
    );
  }
}

Month.propTypes = {
  date: PropTypes.object,
  currentDate: PropTypes.string.isRequired,
  saveMonth: PropTypes.func.isRequired,
};

Month.defaultProps = {
  date: {
    monthTotal: 0,
    items: {},
  },
};

const mapStateToProps = state => ({
  date: state.dates[state.currentDate],
  currentDate: state.currentDate,
});

const mapDispatchToProps = dispatch => ({
  saveMonth: (date, items) => {
    dispatch(saveMonth(date, items));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Month);
