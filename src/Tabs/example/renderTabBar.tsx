import React from 'react';
import { Dropdown } from 'antd';
import { Tabs, Menu } from 'pq-antd';

const { TabPane } = Tabs;

const menu = (
  <Menu>
    <Menu.Item>1st menu</Menu.Item>
    <Menu.Item>1st menu</Menu.Item>
    <Menu.Item>1st menu</Menu.Item>
  </Menu>
);

class App extends React.Component {
  state = {};

  renderTabBar = (props: any, DefaultTabBar: any) => {
    return (
      <DefaultTabBar {...props}>
        {(node: any) => {
          return (
            <Dropdown overlay={menu} trigger={['contextMenu']}>
              <div style={{ display: 'inline-block' }}>{node}</div>
            </Dropdown>
          );
        }}
      </DefaultTabBar>
    );
  };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" renderTabBar={this.renderTabBar}>
          <TabPane tab="Tab 1" key="1" forceRender>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default () => <App />;
