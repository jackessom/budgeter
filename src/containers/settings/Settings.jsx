import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input, DatePicker, ListSubHeader, AppBar } from 'react-toolbox';
import { saveSettings, toggleSidebar } from '../../actions';
import DynamicList from '../../components/dynamicList/DynamicList';
import guid from '../../helpers/guid';
import { getISODate, getTodaysMonth } from '../../helpers/dates';
import styles from './settings.css';
import { padding } from '../../styles/base.css';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      startDate: this.props.startDate,
      startAmount: this.props.startAmount,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDatepickerChange = this.handleDatepickerChange.bind(this);
    this.handleDynamicListChange = this.handleDynamicListChange.bind(this);
  }

  componentDidMount() {
    this.props.saveSettings(this.createSettingsObject());
  }

  handleChange(value, event) {
    this.setState({ [event.target.name]: value });
  }

  handleDatepickerChange(value, event) {
    const month = moment.utc(value).month() + 1;
    const year = moment.utc(value).year();
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      [event.target.name]: getISODate(year, month),
    });
    this.props.saveSettings(newSettings);
  }

  handleBasicSettings() {
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
              onChange={(value, event) => { this.handleChange(value, event); }}
              onBlur={() => { this.handleBasicSettings(); }}
              theme={styles}
            />
            <DatePicker
              label="Start date"
              name="startDate"
              onChange={(value, event) => { this.handleDatepickerChange(value, event); }}
              value={moment.utc(this.props.startDate).add(1, 'days').toDate()}
              inputFormat={value => moment.utc(value).format('MMMM YYYY')}
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
