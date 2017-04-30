import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Input,
  DatePicker,
  Tab,
  Tabs,
  Button,
  ListDivider,
 } from 'react-toolbox';
import { saveSettings } from '../../actions';
import DynamicInputList from '../../components/dynamicInputList/DynamicInputList';
import guid from '../../helpers/guid';
import styles from './settings.css';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      startDate: this.props.startDate,
      startAmount: this.props.startAmount,
      outgoings: this.props.outgoings,
      incomings: this.props.incomings,
      tabIndex: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDynamicListChange = this.handleDynamicListChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleChange(value, event) {
    this.setState({ [event.target.name]: value });
  }

  handleDynamicListChange(listName, items) {
    this.setState({ [listName]: items });
  }

  handleTabChange(tabIndex) {
    this.setState({ tabIndex });
  }

  render() {
    const settings = {
      id: this.state.id,
      name: this.state.name,
      startDate: this.state.startDate,
      startAmount: parseFloat(this.state.startAmount),
      outgoings: this.state.outgoings,
      incomings: this.state.incomings,
    };
    return (
      <form>
        <h1>Settings</h1>
        <Tabs
          className={styles.tabs}
          index={this.state.tabIndex}
          onChange={this.handleTabChange}
        >
          <Tab label="Basic">
            <Input
              type="text"
              label="Name"
              name="name"
              value={this.state.name}
              onChange={(value, event) => { this.handleChange(value, event); }}
              maxLength={16}
            />
            <Input
              type="number"
              label="Starting amount"
              name="startAmount"
              value={this.state.startAmount}
              onChange={(value, event) => { this.handleChange(value, event); }}
            />
            <DatePicker
              label="Start date"
              name="startDate"
              minDate={new Date()}
              onChange={(value, event) => { this.handleChange(value, event); }}
              value={this.state.startDate}
              inputFormat={value => moment(value).format('MMMM Do YYYY')}
            />
          </Tab>
          <Tab label="Outgoings">
            <DynamicInputList
              name="outgoings"
              items={this.state.outgoings}
              handleListChange={this.handleDynamicListChange}
            />
          </Tab>
          <Tab label="Incomings">
            <DynamicInputList
              name="incomings"
              items={this.state.incomings}
              handleListChange={this.handleDynamicListChange}
            />
          </Tab>
        </Tabs>
        <ListDivider />
        <Button
          icon="save"
          label="Save settings"
          primary
          onMouseUp={() => { this.props.saveSettings(settings); }}
          className={styles.button}
        />
      </form>
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
  saveSettings: (settings) => {
    dispatch(saveSettings(settings));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
