import React from 'react';
import { Pagination } from 'pq-antd';

class App extends React.Component {
  state = {};

  render() {
    return <Pagination total={200} />;
  }
}

export default () => <App />;
