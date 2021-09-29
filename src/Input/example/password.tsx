import React from 'react';
import { Input } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return <Input.Password allowClear maxLength={20} />;
  }
}

export default () => <App />;
