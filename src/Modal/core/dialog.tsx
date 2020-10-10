import React from 'react';
import classNames from 'classnames';

export interface DialogProps {
  prefixCls?: string;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  className?: string;
  visible?: boolean;
  title: string | React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
}
interface DialogState {}

export default class Dialog extends React.Component<DialogProps, DialogState> {
  public readonly state: Readonly<DialogState> = {};

  public constructor(props: DialogProps) {
    super(props);
  }

  getDialogElement = () => {
    const { bodyStyle, closable, title, footer, children } = this.props;
    let headerNode;
    let closer;
    let footerNode = null;
    if (title) {
      headerNode = <div>aaa</div>;
    }

    if (closable) {
      closer = <div>dsmas</div>;
    }

    if (footer) {
      footerNode = <div>adsadsasd</div>;
    }

    return (
      <div>
        {headerNode}
        {closer}
        {footerNode}
      </div>
    );
  };

  render(): React.ReactNode {
    const {
      prefixCls = 'pq-antd',
      className,
      closable,
      ...others
    } = this.props;
    const classes = classNames(`${prefixCls}-dialog`, className);
    return (
      <div className={`${prefixCls}-dialog-root`}>
        <div className={`${prefixCls}-dialog-mask`} />
        <div className={`${prefixCls}-dialog-wapper`}>
          <div className={classes}>{this.getDialogElement}</div>
        </div>
      </div>
    );
  }
}
