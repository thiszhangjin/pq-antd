import React from 'react';
import { Icon } from 'antd';
import Modal from './modal';
import confirm, { ConfirmProps } from './confirm';
import './style/index.less';

export enum ConfirmIcons {
  info = 'info-circle',
  success = 'check-circle',
  error = 'close-circle',
  warning = 'exclamation-circle',
}

type ModalType = 'info' | 'success' | 'error' | 'warning';

Modal.confirm = confirm;

['info', 'success', 'error', 'warning'].forEach(item => {
  Modal[item as ModalType] = (props: ConfirmProps) => {
    confirm({
      icon: <Icon type={ConfirmIcons[item as ModalType]} />,
      ...props,
    });
  };
});

export default Modal;
