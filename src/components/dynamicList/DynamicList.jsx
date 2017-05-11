import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListSubHeader, ListDivider, Chip, Dialog } from 'react-toolbox';
import guid from '../../helpers/guid';
import styles from './dynamicList.css';

class DynamicList extends Component {

  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addNewListItem = this.addNewListItem.bind(this);
    this.saveListItem = this.saveListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.dialogActions = [
      { label: 'Save', onClick: this.saveListItem },
      { label: 'Cancel', onClick: this.closeDialog },
    ];
    this.state = {
      dialogValues: this.props.defaultValues,
      dialogIsActive: false,
      dialogActions: this.dialogActions,
      newItem: false,
      actionClicked: false,
      errorMessage: null,
    };
  }

  componentDidUpdate() {
    if (this.state.actionClicked) {
      this.closeDialog();
    }
  }

  getPlainItem(item, key) {
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
  }

  getItemWithChip(item, key) {
    let chipStyle = styles.chip;
    if (item.type === 'incoming') {
      chipStyle = styles.chipIncoming;
    } else if (item.type === 'outgoing') {
      chipStyle = styles.chipOutgoing;
    }
    const chip = (
      <Chip key={key} className={chipStyle}>
        <span>{item.value}</span>
      </Chip>
    );
    return (
      <ListItem
        key={key}
        leftActions={[chip]}
        caption={item.label}
        rightIcon="mode_edit"
        onClick={() => { this.openDialog(key); }}
        selectable
      />
    );
  }

  setErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  openDialog(itemId) {
    let tempState;
    if (this.props.items[itemId]) {
      tempState = Object.assign({}, this.state, {
        dialogValues: this.props.items[itemId],
        dialogActions: [
          { label: 'Delete', onClick: this.deleteListItem, className: styles.deleteButton },
          ...this.dialogActions,
        ],
        dialogTitle: 'Edit item',
      });
    } else {
      tempState = Object.assign({}, this.state, {
        dialogValues: this.props.defaultValues,
        dialogActions: this.dialogActions,
        newItem: true,
        dialogTitle: 'Add a new item',
      });
    }
    this.setState({
      ...tempState,
      errorMessage: null,
      currentItemId: itemId,
      dialogIsActive: true,
    });
  }

  closeDialog() {
    this.setState({ dialogIsActive: false, actionClicked: false });
  }

  addNewListItem() {
    this.openDialog(guid());
  }

  validateAllFields() {
    let allFieldsFilled = true;
    for (let i = 0; i < Object.values(this.state.dialogValues).length; i += 1) {
      if (Object.values(this.state.dialogValues)[i].length < 1) {
        allFieldsFilled = false;
        break;
      }
    }
    return allFieldsFilled;
  }

  saveListItem() {
    if (this.validateAllFields()) {
      const newItemList = Object.assign({}, this.props.items, {
        [this.state.currentItemId]: this.state.dialogValues,
      });
      this.props.handleListChange(newItemList, this.props.name);
      this.setState({ actionClicked: true, errorMessage: null });
    } else {
      this.setErrorMessage('Please make sure all fields are entered before saving');
    }
  }

  deleteListItem() {
    const newItemList = Object.assign({}, this.props.items);
    delete newItemList[this.state.currentItemId];
    this.props.handleListChange(newItemList, this.props.name);
    this.setState({ actionClicked: true });
  }

  handleInputChange(name, event) {
    const newValues = Object.assign({}, this.state.dialogValues, {
      [name]: event,
    });
    this.setState({ dialogValues: newValues });
  }

  render() {
    const dialogItems = React.Children.map(this.props.children, child => (
      React.cloneElement(child, {
        onChange: (event) => { this.handleInputChange(child.props.name, event); },
        value: this.state.dialogValues[child.props.name],
      })
    ));
    const listItems = Object.keys(this.props.items).map((key) => {
      const item = this.props.items[key];
      if (this.props.withChip) {
        return this.getItemWithChip(item, key);
      }
      return this.getPlainItem(item, key);
    });
    return (
      <div>
        <List selectable>
          <ListSubHeader caption={this.props.header} />
          {listItems.length < 1 &&
            <p className={styles.noticeMessage}>No items</p>
          }
          {listItems}
          <ListDivider />
          <ListItem
            caption="Add an item"
            leftIcon="add"
            onClick={() => { this.addNewListItem(); }}
          />
        </List>
        <Dialog
          title={this.state.dialogTitle}
          active={this.state.dialogIsActive}
          actions={this.state.dialogActions}
          onOverlayClick={() => { this.closeDialog(); }}
          theme={styles}
        >
          {dialogItems}
          {this.state.errorMessage &&
            <p className={styles.error}>{this.state.errorMessage}</p>
          }
        </Dialog>
      </div>
    );
  }
}

DynamicList.propTypes = {
  header: PropTypes.string,
  items: PropTypes.object.isRequired,
  withChip: PropTypes.bool,
  defaultValues: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  handleListChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

DynamicList.defaultProps = {
  withChip: false,
};

export default DynamicList;
