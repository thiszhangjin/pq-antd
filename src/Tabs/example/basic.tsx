import React from 'react';
import { Icon } from 'antd';
import { Tabs } from '../../index';
import { TabPane } from '../index';

class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="3">
          <TabPane tab="Tab 1" key="1" forceRender>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="apple" />
                Tab 3
              </span>
            }
            key="3"
          >
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Tab 4" key="4" disabled>
            Content of Tab Pane disabled
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default () => <App />;
