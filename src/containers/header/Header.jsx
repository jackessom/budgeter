import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardActions, IconButton } from 'react-toolbox';
import { toggleSidebar } from '../../actions';
import styles from './header.css';

const Header = props => (
  <Card style={{ width: '100%' }}>
    <CardTitle
      title="January"
      subtitle="2017"
      className={styles.title}
    >
      <IconButton icon="chevron_left" className={styles.navLeft} />
      <IconButton icon="chevron_right" className={styles.navRight} />
    </CardTitle>
    <CardActions>
      <IconButton
        icon="settings"
        onMouseUp={() => { props.openSidebar(); }}
        style={{ float: 'right' }}
      />
    </CardActions>
  </Card>
);

Header.propTypes = {
  openSidebar: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  openSidebar: () => {
    dispatch(toggleSidebar(true));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Header);
