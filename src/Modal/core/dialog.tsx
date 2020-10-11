import React from 'react';
import { Icon } from 'antd';
import Mask from './mask';

export type IStringOrHtmlElement = string | HTMLElement;

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
  forceRender?: boolean;
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false;
  children?: any;
  onClose?: () => void;
}
interface DialogState {}

export default class Dialog extends React.Component<DialogProps, DialogState> {
  public readonly state: Readonly<DialogState> = {};

  public constructor(props: DialogProps) {
    super(props);
  }

  static defaultProps = {
    prefixCls: 'pq-antd-modal',
    closable: true,
    mask: true,
    maskClosable: true,
  };

  getDialogElement = () => {
    const {
      prefixCls,
      bodyStyle,
      closable,
      title,
      footer,
      children,
    } = this.props;
    let headerNode = null;
    let closer = null;
    let footerNode = null;
    if (title) {
      headerNode = <div className={`${prefixCls}-header`}>{title}</div>;
    }

    if (closable) {
      closer = (
        <button
          type="button"
          className={`${prefixCls}-closer`}
          onClick={this.handleClose}
        >
          <Icon type="close" />
        </button>
      );
    }

    if (footer) {
      footerNode = <div className={`${prefixCls}-footer`}>{footer}</div>;
    }

    return (
      <div className={`${prefixCls}`} style={bodyStyle}>
        {headerNode}
        {closer}
        <div className={`${prefixCls}-body`}>{children}</div>
        {footerNode}
      </div>
    );
  };

  handleMaskClick = (e: React.MouseEvent) => {
    const { maskClosable } = this.props;
    if (maskClosable && e.target === e.currentTarget) {
      this.handleClose();
    }
  };

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  render(): React.ReactNode {
    const { prefixCls, visible, mask } = this.props;
    return (
      <div
        className={`${prefixCls}-root`}
        style={{ display: visible ? 'block' : 'none' }}
      >
        {mask && <Mask prefixCls={prefixCls} />}
        <div className={`${prefixCls}-wapper`} onClick={this.handleMaskClick}>
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
