import React from 'react';
import ReactNode from 'react-dom';
import { Icon } from 'antd';
import Dialog from './core/dialogWrap';
import { Button } from '../index';

export interface ConfirmProps {
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  centered?: boolean;
  confirmLoading?: boolean;
  cancelText?: string;
  okText?: string | React.ReactNode;
  okType?: 'primary' | 'default' | 'dashed' | 'danger';
  icon?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

export type ConfirmFun = (props: ConfirmProps) => void;

export interface ConfirmDialogProps extends ConfirmProps {
  visible: boolean;
  getContainer: HTMLElement;
  afterClose: () => void;
  close: () => void;
}

function handleBtnAction(action: any[]) {
  if (Array.isArray(action)) {
    action.forEach(actionItem => actionItem());
  }
}

function ConfirmDialog(props: ConfirmDialogProps): React.ReactElement {
  const prefixCls = 'pq-antd-modal-confirm';
  const {
    title,
    content,
    cancelText = '取消',
    okText = '确定',
    okType = 'primary',
    visible,
    getContainer,
    close,
    onOk,
    onCancel,
    afterClose,
  } = props;
  const icon = props.icon || <Icon type="info-circle" />;
  return (
    <Dialog
      title={null}
      footer={null}
      closable={false}
      visible={visible}
      getContainer={getContainer}
      className={prefixCls}
      onClose={onCancel}
      afterClose={afterClose}
    >
      <div className={`${prefixCls}-body`}>
        {icon}
        <p className={`${prefixCls}-title`}>{title}</p>
        <div className={`${prefixCls}-content`}>{content}</div>
        <div className={`${prefixCls}-btns`}>
          <Button onClick={() => handleBtnAction([onCancel, close])}>
            {cancelText}
          </Button>
          <Button onClick={() => handleBtnAction([onOk, close])} type={okType}>
            {okText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

function confirm(props: ConfirmProps): void {
  const div = document.createElement('div');
  document.body.appendChild(div);

  let confirmDialogProps = {
    ...props,
    visible: true,
    getContainer: div,
    close,
    afterClose: destroy,
  };

  function close(): void {
    confirmDialogProps = {
      ...confirmDialogProps,
      visible: false,
    };
    render();
  }

  function destroy(): void {
    document.body.removeChild(div);
  }

  function render() {
    ReactNode.render(<ConfirmDialog {...confirmDialogProps} />, div);
  }

  render();
}

export default confirm;
