import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

export interface NoticeProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  duration?: number | null;
  children?: React.ReactNode;
  update?: boolean;
  closable?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClose?: () => void;
}
interface NoticeState {
  duration: number;
}

export default class Notice extends React.Component<NoticeProps, NoticeState> {
  public timer: number | null = null;
  public readonly state: Readonly<NoticeState> = {
    duration: 0,
  };

  public constructor(props: NoticeProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: NoticeProps, state: NoticeState) {
    return {
      duration: props.duration,
    };
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate() {
    if (this.props.update) {
      this.resetCloseTimer();
      this.startCloseTimer();
    }
  }

  componentWillUnmount() {
    this.resetCloseTimer();
  }

  startCloseTimer = () => {
    const { duration } = this.state;
    if (duration) {
      this.timer = window.setTimeout(() => {
        this.closeNotice();
      }, duration * 1000);
    }
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
    this.resetCloseTimer();
  };

  render(): React.ReactNode {
    const { prefixCls, className, children, closable, ...others } = this.props;
    const classes = classNames(`${prefixCls}-notice`, className);
    return (
      <div className={classes} {...others}>
        <div
          className={`${prefixCls}-notice-content`}
          onMouseMove={this.resetCloseTimer}
          onMouseOut={this.startCloseTimer}
        >
          {children}
        </div>
        {closable && (
          <div
            className={`${prefixCls}-notice-close`}
            onClick={this.closeNotice}
          >
            <Icon type="close" />
          </div>
        )}
      </div>
    );
  }
}
