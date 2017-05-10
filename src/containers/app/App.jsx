import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Panel, Sidebar, AppBar } from 'react-toolbox';
import Settings from '../../containers/settings/Settings';
import Month from '../../containers/month/Month';
import { toggleSidebar } from '../../actions';
import styles from './app.css';
import { padding } from '../../styles/base.css';
import { appBar } from '../../styles/global.css';
import logo from './logo.png';

const App = props => (
  <div>
    <Layout>
      <AppBar
        rightIcon="settings"
        onRightIconClick={() => { props.openSidebar(); }}
        leftIcon={<img src={logo} alt="Budgeter" style={{ width: '100%' }} />}
        fixed
        flat
        className={appBar}
      />
      <Panel theme={styles} className={padding}>
        <Month />
      </Panel>
      <Sidebar
        pinned={props.sidebarVisibility}
        width={5}
        theme={styles}
      >
        <Settings />
      </Sidebar>
    </Layout>
  </div>
);

App.propTypes = {
  sidebarVisibility: PropTypes.bool.isRequired,
  openSidebar: PropTypes.func,
};

App.defaultProps = {
  sidebarVisibility: false,
};

const mapStateToProps = state => ({
  sidebarVisibility: state.sidebarVisibility,
});

const mapDispatchToProps = dispatch => ({
  openSidebar: () => {
    dispatch(toggleSidebar(true));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
