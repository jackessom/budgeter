import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Panel, Sidebar } from 'react-toolbox';
import Settings from '../../containers/settings/Settings';
import Header from '../../containers/header/Header';
import { padding, background } from '../../styles/base.css';

const App = props => (
  <Layout className={background}>
    <Panel className={padding}>
      <Header />
    </Panel>
    <Sidebar
      className={padding}
      pinned={props.sidebarVisibility}
      width={5}
    >
      <Settings />
    </Sidebar>
  </Layout>
);

App.propTypes = {
  sidebarVisibility: PropTypes.bool.isRequired,
};

App.defaultProps = {
  sidebarVisibility: false,
};

const mapStateToProps = state => ({
  sidebarVisibility: state.sidebarVisibility,
});

export default connect(
  mapStateToProps,
)(App);
