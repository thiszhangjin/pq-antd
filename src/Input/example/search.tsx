import React from 'react';
import { Input, message } from 'pq-antd';

class App extends React.Component {
  state = {};

  onSearch = (value: string) => {
    message.info(value);
  };

  render() {
    return (
      <React.Fragment>
        <Input.Search onSearch={this.onSearch} />
        <Input.Search enterButton style={{ marginTop: 20 }} loading />
        <Input.Search enterButton="search" style={{ marginTop: 20 }} />
      </React.Fragment>
    );
  }
}

export default () => <App />;
