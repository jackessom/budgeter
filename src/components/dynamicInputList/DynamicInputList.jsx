import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-toolbox';
import DynamicInputListItem from '../../components/dynamicInputListItem/DynamicInputListItem';
import guid from '../../helpers/guid';

class DynamicInputList extends Component {

  constructor(props) {
    super(props);
    this.itemTemplate = {
      label: '',
      value: 0.00,
    };
    this.state = {
      allowNew: true,
    };

    this.submitItems = this.submitItems.bind(this);
    this.editListItem = this.editListItem.bind(this);
    this.addNewListItem = this.addNewListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
  }

  submitItems(changeType, itemKey, item) {
    const newItemList = this.props.items;
    switch (changeType) {
      case 'new':
        newItemList[guid()] = this.itemTemplate;
        break;
      case 'edit':
      case 'remove':
        Object.keys(this.props.items).forEach((key) => {
          if (key === itemKey) {
            if (changeType === 'edit') {
              newItemList[itemKey] = item[itemKey];
            } else if (changeType === 'remove') {
              delete newItemList[itemKey];
            }
          }
        });
        break;
      default:
        return;
    }
    this.allowNewItemsValidator();
    this.props.handleListChange(this.props.name, newItemList);
  }

  allowNewItemsValidator() {
    let allowNew = true;
    Object.keys(this.props.items).forEach((key) => {
      if (this.props.items[key].label.length < 1) {
        allowNew = false;
      }
    });
    this.setState({ allowNew });
  }

  editListItem(itemKey, item) {
    this.submitItems('edit', itemKey, item);
  }

  addNewListItem() {
    this.submitItems('new');
  }

  removeListItem(itemKey) {
    this.submitItems('remove', itemKey);
  }

  render() {
    const items = Object.keys(this.props.items).map((key) => {
      const item = this.props.items[key];
      return (
        <DynamicInputListItem
          key={key}
          id={key}
          label={item.label}
          value={item.value}
          submitItem={this.editListItem}
          deleteItem={this.removeListItem}
        />
      );
    });
    return (
      <div>
        {items}
        <Button
          icon="add"
          label="Add new"
          primary
          onMouseUp={() => { this.addNewListItem(); }}
          style={{ float: 'right' }}
          disabled={!this.state.allowNew}
        />
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
