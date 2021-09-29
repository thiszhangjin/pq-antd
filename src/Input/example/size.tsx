import React from 'react';
import { Input } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Input size="small" />
        <Input style={{ marginTop: 20 }} />
        <Input size="large" style={{ marginTop: 20 }} />
      </React.Fragment>
    );
  }
}

export default () => <App />;
