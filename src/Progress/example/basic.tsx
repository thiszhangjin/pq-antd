import React from 'react';
import { Progress, Button } from '../../index';

class App extends React.Component {
  state = {
    percent: 10,
  };

  handleChangePercent = (changeValue: number) => {
    let { percent } = this.state;
    percent += changeValue;
    if (percent < 0) {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }
    this.setState({
      percent,
    });
  };

  render() {
    return (
      <div>
        <Progress type="circle" percent={this.state.percent} />
        <Button.Group>
          <Button icon="minus" onClick={() => this.handleChangePercent(-30)} />
          <Button icon="plus" onClick={() => this.handleChangePercent(30)} />
        </Button.Group>
      </div>
    );
  }
}

export default () => <App />;
