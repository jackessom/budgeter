import React, { Component } from 'react';
import moment from 'moment';
import { Input, DatePicker, Tab, Tabs } from 'react-toolbox';
import DynamicInputList from '../../components/dynamicInputList/DynamicInputList';
import guid from '../../helpers/guid';
import styles from './settings.css';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.itemTemplate = {
      label: '',
      value: 0.00,
    };
    this.state = {
      id: guid(),
      name: '',
      startDate: new Date(),
      startAmount: 0.00,
      outgoings: {},
      incomings: {},
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
      </form>
    );
  }
}

export default Settings;
