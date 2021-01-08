import React from 'react';
import { Pagination } from '../../index';

class App extends React.Component {
  state = {
    current: 5,
  };

  handleChange = page => {
    this.setState({
      current: page,
    });
  };

  render() {
    return (
      <div>
        <Pagination
          current={this.state.current}
          onChange={this.handleChange}
          defaultCurrent={1}
          total={200}
          defaultPageSize={10}
          showQuickJumper
        />
        <Pagination
          current={this.state.current}
          defaultCurrent={1}
          total={200}
          defaultPageSize={10}
          showQuickJumper
          disabled
        />
      </div>
    );
  }
}

export default () => <App />;
