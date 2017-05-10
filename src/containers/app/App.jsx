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

const App = props => (
  <div>
    <Layout>
      <AppBar
        title="Budgeter"
        rightIcon="settings"
        onRightIconClick={() => { props.openSidebar(); }}
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
