import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListSubHeader, ListItem, ListDivider, Dialog, Input } from 'react-toolbox';
import guid from '../../helpers/guid';
import capitaliseFirstLetter from '../../helpers/capitaliseFirstLetter';
import styles from './dynamicInputList.css';

class DynamicInputList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogLabel: '',
      dialogValue: 0,
      dialogIsActive: false,
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addNewListItem = this.addNewListItem.bind(this);
    this.saveListItem = this.saveListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.dialogActions = [
      { label: 'Delete', onClick: this.deleteListItem },
      { label: 'Save', onClick: this.saveListItem },
      { label: 'Cancel', onClick: this.closeDialog },
    ];
  }

  openDialog(itemId) {
    if (this.props.items[itemId]) {
      this.setState({
        dialogIsActive: true,
        dialogLabel: this.props.items[itemId].label,
        dialogValue: this.props.items[itemId].value,
        dialogId: itemId,
      });
    } else {
      this.setState({
        dialogIsActive: true,
        dialogLabel: '',
        dialogValue: 0,
        dialogId: itemId,
      });
    }
  }

  closeDialog() {
    this.setState({ dialogIsActive: false });
  }

  saveListItem() {
    const newItemList = Object.assign({}, this.props.items, {
      [this.state.dialogId]: {
        label: this.state.dialogLabel,
        value: this.state.dialogValue,
      },
    });
    this.props.handleListChange(this.props.name, newItemList);
    this.closeDialog();
  }

  deleteListItem() {
    const newItemList = Object.assign({}, this.props.items);
    delete newItemList[this.state.dialogId];
    this.props.handleListChange(this.props.name, newItemList);
    this.closeDialog();
  }

  addNewListItem() {
    this.openDialog(guid());
  }

  handleInputChange(value, event) {
    this.setState({ [event.target.name]: value });
  }

  render() {
    const items = Object.keys(this.props.items).map((key) => {
      const item = this.props.items[key];
      return (
        <ListItem
          key={key}
          caption={item.value.toString()}
          legend={item.label}
          rightIcon="mode_edit"
          onClick={() => { this.openDialog(key); }}
          selectable
        />
      );
    });
    return (
      <div>
        <List selectable>
          <ListSubHeader caption={capitaliseFirstLetter(this.props.name)} />
          {items}
          <ListDivider />
          <ListItem
            caption="Add an item"
            leftIcon="add"
            onClick={() => { this.addNewListItem(); }}
          />
        </List>
        <Dialog
          active={this.state.dialogIsActive}
          actions={this.dialogActions}
          theme={styles}
          onOverlayClick={() => { this.closeDialog(); }}
        >
          <Input
            type="text"
            label="Label"
            name="dialogLabel"
            value={this.state.dialogLabel}
            required
            error={this.state.error ? errorText : false}
            onChange={(value, event) => { this.handleInputChange(value, event); }}
          />
          <Input
            type="number"
            label="Amount"
            name="dialogValue"
            value={this.state.dialogValue}
            onChange={(value, event) => { this.handleInputChange(value, event); }}
          />
        </Dialog>
      </div>
    );
  }
}

DynamicInputList.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  handleListChange: PropTypes.func.isRequired,
};

export default DynamicInputList;
