import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Input, DatePicker, ListSubHeader, AppBar } from 'react-toolbox';
import { saveSettings, toggleSidebar } from '../../actions';
import DynamicInputList from '../../components/dynamicInputList/DynamicInputList';
import guid from '../../helpers/guid';
import styles from './settings.css';
import { padding } from '../../styles/base.css';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      startDate: this.props.startDate,
      startAmount: this.props.startAmount,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDatepickerChange = this.handleDatepickerChange.bind(this);
    this.handleDynamicListChange = this.handleDynamicListChange.bind(this);
  }

  handleChange(value, event) {
    this.setState({ [event.target.name]: value });
  }

  handleDatepickerChange(value, event) {
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      [event.target.name]: value,
    });
    this.props.saveSettings(newSettings);
  }

  handleBasicSettings() {
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      name: this.state.name,
      startAmount: parseFloat(this.state.startAmount),
    });
    this.props.saveSettings(newSettings);
  }

  handleDynamicListChange(listName, items) {
    const newSettings = Object.assign({}, this.createSettingsObject(), {
      [listName]: items,
    });
    this.props.saveSettings(newSettings);
  }

  createSettingsObject() {
    return {
      id: this.props.id,
      name: this.props.name,
      startDate: this.props.startDate,
      startAmount: this.props.startAmount,
      outgoings: this.props.outgoings,
      incomings: this.props.incomings,
    };
  }

  render() {
    return (
      <div>
        <AppBar
          title="Settings"
          rightIcon="close"
          onRightIconClick={() => { this.props.closeSidebar(); }}
        />
        <form className={padding}>
          <ListSubHeader caption="Basic" />
          <div>
            <Input
              type="text"
              label="Name"
              name="name"
              value={this.state.name}
              onChange={(value, event) => { this.handleChange(value, event); }}
              onBlur={() => { this.handleBasicSettings(); }}
              maxLength={16}
              theme={styles}
            />
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
              minDate={moment.utc().subtract(1, 'day').toDate()}
              onChange={(value, event) => { this.handleDatepickerChange(value, event); }}
              value={this.props.startDate}
              inputFormat={value => moment(value).format('MMMM Do YYYY')}
              theme={styles}
            />
          </div>
          <DynamicInputList
            name="outgoings"
            items={this.props.outgoings}
            handleListChange={this.handleDynamicListChange}
          />
          <DynamicInputList
            name="incomings"
            items={this.props.incomings}
            handleListChange={this.handleDynamicListChange}
          />
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  startAmount: PropTypes.number.isRequired,
  outgoings: PropTypes.object.isRequired,
  incomings: PropTypes.object.isRequired,
  saveSettings: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  id: guid(),
  name: '',
  startDate: new Date(),
  startAmount: 0.00,
  outgoings: {},
  incomings: {},
};

const mapStateToProps = state => ({
  id: state.settings.id,
  name: state.settings.name,
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
