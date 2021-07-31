import React from 'react';
import { Card } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return (
      <Card title="Default size card" style={{ width: 300 }} loading>
        <p style={{ margin: 0 }}>Card content</p>
        <p style={{ margin: 0 }}>Card content</p>
        <p style={{ margin: 0 }}>Card content</p>
      </Card>
    );
  }
}

export default () => <App />;
