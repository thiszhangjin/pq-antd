import React from 'react';
import classNames from 'classnames';
import Notice from './core/notice';

interface IProps {}
interface IState {
  prefixCls: string;
}

export default class Message extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    prefixCls: 'myantd',
  };

  public constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <Notice />
      </div>
    );
  }
}
