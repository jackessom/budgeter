import React, { Component } from 'react';
import moment from 'moment';
import { Input, DatePicker } from 'react-toolbox';
import guid from '../../helpers/guid';
import { fieldset, legend } from './settings.css';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: guid(),
      name: '',
      startDate: new Date(),
      startAmount: 0.00,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, event) {
    this.setState({ ...this.state, [event.target.name]: value });
  }

  render() {
    return (
      <form>
        <fieldset className={fieldset}>
          <legend className={legend}>Settings</legend>
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
        </fieldset>
      </form>
    );
  }
}

export default Settings;
