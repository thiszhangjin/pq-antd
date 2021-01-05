import React from 'react';
import { Pagination } from '../../index';

class App extends React.Component {
  state = {};

  onShowSizeChange = (current: number, size: number) => {
    console.log(current, size);
  };

  render() {
    return (
      <Pagination
        defaultCurrent={1}
        total={200}
        defaultPageSize={20}
        onShowSizeChange={this.onShowSizeChange}
        showSizeChanger
      />
    );
  }
}

export default () => <App />;
