import React from 'react';
import { Progress } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Progress type="line" status="active" percent={60} />
        <Progress type="line" percent={40} />
        <Progress type="line" status="success" percent={70} />
        <Progress type="line" status="exception" percent={50} />
      </div>
    );
  }
}

export default () => <App />;
