import React from 'react';
import { Card } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ background: '#f1f1f1', padding: '10px' }}>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          bordered={false}
          style={{ width: 300 }}
        >
          <p style={{ margin: 0 }}>Card content</p>
          <p style={{ margin: 0 }}>Card content</p>
        </Card>
      </div>
    );
  }
}

export default () => <App />;
