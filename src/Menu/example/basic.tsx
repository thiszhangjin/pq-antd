import React from 'react';
import { Menu } from '../../index';

class App extends React.Component {
  state = {
    a: 1,
  };

  render() {
    const { a } = this.state;
    return (
      <div>
        menu
        <Menu />
      </div>
    );
  }
}

export default () => <App />;
