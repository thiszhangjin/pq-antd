import React from 'react';
import classNames from 'classnames';

export interface NoticeProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  duration?: number | null;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClose?: () => void;
}
interface NoticeState {
  duration: number;
}

export default class Notice extends React.Component<NoticeProps, NoticeState> {
  public timer: number | null = null;
  public readonly state: Readonly<NoticeState> = {
    duration: 3,
  };

  public constructor(props: NoticeProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: NoticeProps, state: NoticeState) {
    return {
      duration: props.duration || 3,
    };
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate() {
    this.resetCloseTimer();
    this.startCloseTimer();
  }

  startCloseTimer = () => {
    const { duration } = this.state;
    this.timer = window.setTimeout(() => {
      this.closeNotice();
    }, duration * 1000);
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
  };

  render(): React.ReactNode {
    const { prefixCls, className, children, ...others } = this.props;
    const classes = classNames(`${prefixCls}-notice`, className);
    return (
      <div
        className={classes}
        onMouseMove={this.resetCloseTimer}
        onMouseOut={this.startCloseTimer}
        {...others}
      >
        <div className={`${prefixCls}-notice-conetnt`}>{children}</div>
      </div>
    );
  }
}
