import React, { Component } from 'react';
import { Layout, Panel, Sidebar } from 'react-toolbox';
import Settings from '../../containers/settings/Settings';
import Header from '../../containers/header/Header';
import { padding } from '../../styles/base.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarPinned: true,
    };
  }

  render() {
    return (
      <Layout>
        <Panel className={padding}>
          <Header />
        </Panel>
        <Sidebar className={padding} pinned={this.state.sidebarPinned} width={5}>
          <Settings />
        </Sidebar>
      </Layout>
    );
  }
}

export default App;
