import React from 'react';
import { Icon } from 'antd';
import { Input } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Input />
        <Input
          style={{ marginTop: 20 }}
          addonBefore="http://"
          addonAfter=".com"
        />
        <div />
        <Input
          style={{ marginTop: 20 }}
          prefix={<Icon type="user" />}
          suffix={<Icon type="info-circle" />}
          onPressEnter={() => {
            console.log('pressEnter');
          }}
          allowClear
          maxLength={5}
        />
      </React.Fragment>
    );
  }
}

export default () => <App />;
