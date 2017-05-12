import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input, ListSubHeader, AppBar, Dropdown } from 'react-toolbox';
import { saveSettings, toggleSidebar } from '../../actions';
import DynamicList from '../../components/dynamicList/DynamicList';
import guid from '../../helpers/guid';
import { getISODate, getTodaysMonth, getArrayOfYears } from '../../helpers/dates';
import styles from './settings.css';
import { padding } from '../../styles/base.css';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      startDate: this.props.startDate,
      startAmount: this.props.startAmount,
      years: getArrayOfYears(this.props.startDate),
    };
    this.months = [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' },
    ];

    this.handleStartAmount = this.handleStartAmount.bind(this);
    this.handleDynamicListChange = this.handleDynamicListChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.props.saveSettings(this.createSettingsObject());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ years: getArrayOfYears(nextProps.startDate) });
  }

  handleDateChange(value) {
    const valueNumber = value;
    let month = moment.utc(this.props.startDate).month() + 1;
    let year = moment.utc(this.props.startDate).year();
    if (valueNumber > 12) {
      year = valueNumber;
    } else {
      month = valueNumber;
    }
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      startDate: getISODate(year, month),
    });
    this.props.saveSettings(newSettings);
  }

  handleStartAmount(value) {
    this.setState({ startAmount: value });
  }

  handleStartAmountSave() {
    let startAmount = parseFloat(this.state.startAmount);
    if (isNaN(startAmount)) { startAmount = 0; }
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      startAmount,
    });
    this.props.saveSettings(newSettings);
  }

  handleDynamicListChange(items, listName) {
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      [listName]: items,
    });
    this.props.saveSettings(newSettings);
  }

  createSettingsObject() {
    return {
      id: this.props.id,
      startDate: this.props.startDate,
      startAmount: this.props.startAmount,
      outgoings: this.props.outgoings,
      incomings: this.props.incomings,
    };
  }

  render() {
    const listDefinitions = [
      { id: guid(), title: 'outgoings', header: 'Common outgoings', items: this.props.outgoings },
      { id: guid(), title: 'incomings', header: 'Common Incomings', items: this.props.incomings },
    ];
    const defaultListValues = {
      label: '',
      value: '',
    };
    const lists = listDefinitions.map(list => (
      <DynamicList
        key={list.id}
        name={list.title}
        header={list.header}
        items={list.items}
        defaultValues={defaultListValues}
        handleListChange={this.handleDynamicListChange}
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
      </DynamicList>
    ));
    return (
      <div>
        <AppBar
          title="Settings"
          rightIcon="close"
          onRightIconClick={() => { this.props.closeSidebar(); }}
          leftIcon="arrow_back"
          onLeftIconClick={() => { this.props.closeSidebar(); }}
          flat
          theme={styles}
        />
        <form className={padding}>
          <ListSubHeader caption="Basic" />
          <div>
            <Input
              type="number"
              label="Starting amount"
              name="startAmount"
              value={this.state.startAmount}
              onChange={(value) => { this.handleStartAmount(value); }}
              onBlur={() => { this.handleStartAmountSave(); }}
              theme={styles}
            />
            <Dropdown
              onChange={this.handleDateChange}
              source={this.months}
              value={moment.utc(this.props.startDate).month() + 1}
              label="Starting month"
              theme={styles}
            />
            <Dropdown
              onChange={this.handleDateChange}
              source={this.state.years}
              value={parseFloat(moment.utc(this.props.startDate).year())}
              label="Starting year"
              theme={styles}
            />
          </div>
          {lists}
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  id: PropTypes.string,
  startDate: PropTypes.string,
  startAmount: PropTypes.number,
  outgoings: PropTypes.object,
  incomings: PropTypes.object,
  saveSettings: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  id: guid(),
  startDate: getTodaysMonth(),
  startAmount: 0,
  outgoings: {},
  incomings: {},
};

const mapStateToProps = state => ({
  id: state.settings.id,
  startDate: state.settings.startDate,
  startAmount: state.settings.startAmount,
  outgoings: state.settings.outgoings,
  incomings: state.settings.incomings,
});

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => {
    dispatch(toggleSidebar(false));
  },
  saveSettings: (settings) => {
    dispatch(saveSettings(settings));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
