import React from 'react';
import { Select } from 'antd';
import { Tabs } from '../../index';
import { TabPane } from '../index';

const { Option } = Select;

class App extends React.Component {
  state = {
    tabPosition: 'top',
  };

  handleChange = value => {
    this.setState({
      tabPosition: value,
    });
  };

  render() {
    return (
      <div>
        <Select
          defaultValue="top"
          style={{ width: 80, marginBottom: 10 }}
          size="small"
          onChange={this.handleChange}
        >
          <Option value="top">top</Option>
          <Option value="right">right</Option>
          <Option value="bottom">bottom</Option>
          <Option value="left">left</Option>
        </Select>
        <Tabs tabPosition={this.state.tabPosition} style={{ maxHeight: 300 }}>
          {[...Array(30).keys()].map(i => (
            <TabPane tab={`Tab-${i}`} key={i}>
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default () => <App />;
