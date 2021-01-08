import React from 'react';
import { Pagination } from 'pq-antd';

class App extends React.Component {
  state = {};

  onSizeChange = (current: number, size: number) => {
    console.log(current, size);
  };

  render() {
    return (
      <Pagination
        defaultCurrent={1}
        total={200}
        defaultPageSize={20}
        onShowSizeChange={this.onSizeChange}
        onChange={this.onSizeChange}
        showSizeChanger
      />
    );
  }
}

export default () => <App />;
