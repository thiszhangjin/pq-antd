import React from 'react';
import { Icon } from 'antd';
import Animate from 'rc-animate';
import Mask from './mask';
import AnimateBox from './animateBox';

export type IStringOrHtmlElement = string | HTMLElement;

export interface DialogProps {
  prefixCls?: string;
  wrapStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  className?: string;
  wrapClassName?: string;
  visible?: boolean;
  title?: string | React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  keyboard?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  forceRender?: boolean;
  width?: number;
  height?: number;
  zIndex?: number;
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false;
  children?: any;
  onClose?: () => void;
  afterClose?: () => void;
}
interface DialogState {}

enum KeyCodes {
  ESC = 27,
  TAB = 9,
}

export default class Dialog extends React.Component<DialogProps, DialogState> {
  public readonly state: Readonly<DialogState> = {};

  public constructor(props: DialogProps) {
    super(props);
  }

  private mask = React.createRef<HTMLDivElement>();

  private wrapper = React.createRef<HTMLDivElement>();

  private sentinelStart = React.createRef<HTMLDivElement>();

  private sentinelEnd = React.createRef<HTMLDivElement>();

  static defaultProps = {
    prefixCls: 'pq-antd-modal',
    closable: true,
    keyboard: true,
    mask: true,
    maskClosable: true,
  };

  componentDidMount() {
    this.componentDidUpdate({});
  }

  componentDidUpdate(prevProps: DialogProps) {
    const { visible } = this.props;
    if (visible) {
      if (!prevProps.visible) {
        this.tryFocus();
      }
    }
  }

  onMaskAnimateLeave = () => {
    if (this.mask) {
      this.mask.current!.style.display = 'none';
    }
  };

  getZIndexStyle = () => {
    const style: any = {};
    const { zIndex } = this.props;
    if (zIndex !== undefined) {
      style.zIndex = zIndex;
    }
    return style;
  };

  getMaskElement = () => {
    const { mask, maskStyle, prefixCls, visible } = this.props;
    if (!mask) {
      return null;
    }
    const style: React.CSSProperties = {
      ...maskStyle,
      ...this.getZIndexStyle(),
    };
    if (visible) {
      style.display = 'block';
    }
    return (
      <Animate
        key="mask"
        showProp="visible"
        transitionName={`${prefixCls}-fade`}
        component=""
        transitionAppear
        onLeave={this.onMaskAnimateLeave}
      >
        <Mask
          visible={visible}
          maskRef={this.mask}
          prefixCls={prefixCls}
          style={style}
        />
      </Animate>
    );
  };

  tryFocus = () => {
    this.sentinelStart.current!.focus();
  };

  onDialogAnimateLeave = () => {
    const { afterClose } = this.props;
    if (this.wrapper) {
      this.wrapper.current!.style.display = 'none';
    }

    if (afterClose) {
      afterClose();
    }
  };

  getDialogElement = () => {
    const {
      className,
      prefixCls,
      bodyStyle,
      closable,
      title,
      footer,
      children,
      visible,
      width,
      height,
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

    const boxStyle: React.CSSProperties = {};
    if (width !== undefined) {
      boxStyle.width = width;
    }
    if (height !== undefined) {
      boxStyle.height = height;
    }
    return (
      <Animate
        key="dialog"
        showProp="visible"
        onLeave={this.onDialogAnimateLeave}
        transitionName={`${prefixCls}-zoom`}
        component=""
        transitionAppear
      >
        <AnimateBox
          className={`${prefixCls}  ${className || ''}`}
          style={boxStyle}
          visible={visible}
        >
          <div tabIndex={0} ref={this.sentinelStart} />
          <div className={`${prefixCls}-content`}>
            {headerNode}
            {closer}
            <div className={`${prefixCls}-body`} style={bodyStyle}>
              {children}
            </div>
            {footerNode}
          </div>
          <div tabIndex={0} ref={this.sentinelEnd} />
        </AnimateBox>
      </Animate>
    );
  };

  onKeyDown = (e: React.KeyboardEvent) => {
    const { visible, keyboard } = this.props;
    const { keyCode } = e;
    if (keyCode === KeyCodes.ESC && keyboard && visible) {
      this.handleClose();
    }

    if (visible) {
      if (keyCode === KeyCodes.TAB) {
        const { activeElement } = document;
        if (e.shiftKey) {
          if (activeElement === this.sentinelStart.current) {
            this.sentinelEnd.current!.focus();
          }
        } else if (activeElement === this.sentinelEnd.current) {
          this.sentinelStart.current!.focus();
        }
      }
    }
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
    const { prefixCls, visible, wrapStyle, wrapClassName } = this.props;
    const style: React.CSSProperties = {
      ...wrapStyle,
      ...this.getZIndexStyle(),
    };
    if (visible) {
      style.display = 'block';
    }
    return (
      <div className={`${prefixCls}-root`}>
        {this.getMaskElement()}
        <div
          tabIndex={0}
          className={`${prefixCls}-wrapper ${wrapClassName || ''}`}
          onClick={this.handleMaskClick}
          onKeyDown={this.onKeyDown}
          style={style}
          ref={this.wrapper}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
