import React from 'react';
import classNames from 'classnames';

export interface NoticeProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  duration?: number | null;
  children?: React.ReactNode;
  update?: boolean,
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
    if(this.props.update){
      this.resetCloseTimer();
      this.startCloseTimer();
    }
  }

  componentWillUnmount() {
    this.resetCloseTimer();
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
        {...others}
      >
        <div className={`${prefixCls}-notice-conetnt`}  onMouseMove={this.resetCloseTimer} onMouseOut={this.startCloseTimer}>{children}</div>
      </div>
    );
  }
}
