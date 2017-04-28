import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, IconButton, Card, CardText, CardActions } from 'react-toolbox';
import styles from './dynamicInputListItem.css';

class DynamicInputListItem extends Component {

  constructor(props) {
    super(props);
    let editable = false;
    if (this.props.label === 'null' || this.props.label === '') {
      editable = true;
    }
    this.state = {
      editable,
      error: false,
      label: this.props.label,
      value: this.props.value,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      label: nextProps.label,
      value: nextProps.value,
    });
  }

  handleChange(value, event) {
    this.setState({ [event.target.name]: value });
  }

  handleClick() {
    if (this.state.label === 'null' || this.state.label === '') {
      this.setState({ error: true });
    } else {
      this.setState({ editable: !this.state.editable, error: false });
      this.props.submitItem(this.props.id, {
        [this.props.id]: {
          label: this.state.label,
          value: parseFloat(this.state.value),
        },
      });
    }
  }

  deleteItem() {
    this.props.deleteItem(this.props.id);
  }

  render() {
    const errorText = 'You must fill in this field to continue';
    let content = (
      <CardText className={styles.content}>
        <Input
          type="number"
          label={this.props.label}
          value={this.props.value}
          disabled
        />
      </CardText>
    );
    if (this.state.editable) {
      content = (
        <CardText className={styles.content}>
          <Input
            type="text"
            label="Label"
            name="label"
            value={this.state.label}
            required
            error={this.state.error ? errorText : false}
            onChange={(value, event) => { this.handleChange(value, event); }}
          />
          <Input
            type="number"
            label="Amount"
            name="value"
            value={this.state.value}
            onChange={(value, event) => { this.handleChange(value, event); }}
          />
        </CardText>
      );
    }
    return (
      <Card className={styles.card}>
        {content}
        <CardActions className={styles.actions}>
          <IconButton
            icon={this.state.editable ? 'done' : 'mode_edit'}
            onClick={this.handleClick}
          />
          { this.state.editable &&
            <IconButton
              icon="delete"
              onClick={this.deleteItem}
            />
          }
        </CardActions>
      </Card>
    );
  }
}

DynamicInputListItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  submitItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default DynamicInputListItem;
