import React from 'react';
import { Pagination } from '../../index';

class App extends React.Component {
  state = {};

  render() {
    return (
      <Pagination
        defaultCurrent={1}
        total={200}
        defaultPageSize={20}
        showQuickJumper
      />
    );
  }
}

export default () => <App />;
