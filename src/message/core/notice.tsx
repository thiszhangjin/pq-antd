import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';

interface IProps {
  prefixCls: string;
  style?: React.CSSProperties;
  className?: string;
  duration?: number | null;
  children?: React.ReactNode;
  update?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClose?: () => void;
}
interface IState {
  prefixCls: string;
}

export default class Notice extends React.Component<IProps, IState> {
  public timer: number | null = null;
  public duration: number = this.props.duration || 3;
  public readonly state: Readonly<IState> = {
    prefixCls: 'myantd',
  };

  public constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  startCloseTimer = () => {
    this.timer = window.setTimeout(() => {
      this.closeNotice();
    }, this.duration * 1000);
  };

  resetCloseTimer = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = null;
  };

  closeNotice = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
    console.log('close');
  };

  render(): React.ReactNode {
    const childeNode = (
      <p style={{ height: '20px', lineHeight: '20px', margin: 0 }}>
        烦恼多年的头发
      </p>
    );
    const {
      prefixCls,
      style,
      className,
      children = childeNode,
      ...others
    } = this.props;
    const classes = classNames(`${prefixCls}-notice`, className);
    return (
      <div
        className={classes}
        {...others}
        onMouseMove={this.resetCloseTimer}
        onMouseOut={this.startCloseTimer}
        style={{
          width: 'max-content',
          padding: '10px 16px',
          background: '#fff',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,.15)',
        }}
      >
        <div className={`${prefixCls}-notice-conetnt`}>{children}</div>
      </div>
    );
  }
}
