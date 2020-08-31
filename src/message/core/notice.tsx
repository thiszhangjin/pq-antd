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
interface IState {}

export default class Notice extends React.Component<NoticeProps, IState> {
  public timer: number | null = null;
  public duration: number = this.props.duration || 3;
  public readonly state: Readonly<IState> = {};

  public constructor(props: NoticeProps) {
    super(props);
  }

  static defaultProps = {
    style: {
      width: 'max-content',
      padding: '10px 16px',
      margin: '10px 0',
      background: '#fff',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0,0,0,.15)',
    }
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
  };

  render(): React.ReactNode {
    const { prefixCls, style, className, children, ...others } = this.props;
    const classes = classNames(`${prefixCls}-notice`, className);
    return (
      <div
        className={classes}
        onMouseMove={this.resetCloseTimer}
        onMouseOut={this.startCloseTimer}
        style={style}
        {...others}
      >
        <div className={`${prefixCls}-notice-conetnt`}>{children}</div>
      </div>
    );
  }
}
