import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListSubHeader, Chip } from 'react-toolbox';
import styles from './itemList.css';

const ItemList = (props) => {
  const items = Object.keys(props.items).map((key) => {
    const item = props.items[key];
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
        caption={item.title}
        rightIcon="mode_edit"
      />
    );
  });
  let noticeMessage;
  if (items.length < 1) {
    noticeMessage = (
      <p className={styles.noticeMessage}>No items</p>
    );
  }
  return (
    <List selectable ripple>
      <ListSubHeader caption="This month's incomings and outgoings" />
      {noticeMessage}
      {items}
    </List>
  );
};

ItemList.propTypes = {
  items: PropTypes.object.isRequired,
};

export default ItemList;
