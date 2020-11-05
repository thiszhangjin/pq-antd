import React from 'react';
import Dialog from './core/dialogWrap';
import { DialogProps } from './core/dialog';
import { ConfirmFun } from './confirm';
import { Button } from '../index';

export interface ModalProps extends DialogProps {
  confirmLoading?: boolean;
  destroyOnClose?: boolean;
  cancelText?: string;
  okText?: string | React.ReactNode;
  okType?: 'primary' | 'default' | 'dashed' | 'danger';
  onOk?: () => void;
  onCancel?: () => void;
}

interface ModalState {}

export default class Modal extends React.Component<ModalProps, ModalState> {
  static confirm: ConfirmFun;

  static info: ConfirmFun;

  static success: ConfirmFun;

  static warning: ConfirmFun;

  static error: ConfirmFun;

  public readonly state: Readonly<ModalState> = {};

  public constructor(props: ModalProps) {
    super(props);
  }

  static defaultProps = {
    cancelText: '取消',
    okText: '确定',
    okType: 'primary',
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  handleOk = () => {
    const { onOk } = this.props;
    if (onOk) {
      onOk();
    }
  };

  renderFooter = (): React.ReactNode => {
    const { cancelText, okText, okType, confirmLoading } = this.props;
    return (
      <div>
        <Button onClick={this.handleCancel}>{cancelText}</Button>
        <Button type={okType} onClick={this.handleOk} loading={confirmLoading}>
          {okText}
        </Button>
      </div>
    );
  };

  render() {
    const { visible, forceRender, destroyOnClose, ...others } = this.props;
    return (
      (visible || !destroyOnClose) && (
        <Dialog
          footer={this.renderFooter()}
          onClose={this.handleCancel}
          visible={visible}
          {...others}
        />
      )
    );
  }
}
