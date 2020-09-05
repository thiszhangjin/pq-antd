import React, { ReactNode } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import Notification from './core/Notification';

let messageInstance: any = null;
Notification.newInstance((instance: any) => {
  messageInstance = instance;
});

export interface messageProps {
  open: (args: ArgsProps) => void,
  success: (content: string, duration?: number, onClose?: () => {}) => {},
  error: (content: string, duration?: number, onClose?: () => {}) => {},
  info: (content: string, duration?: number, onClose?: () => {}) => {},
  warning: (content: string, duration?: number, onClose?: () => {}) => {},
  loading: (content: string, duration?: number, onClose?: () => {}) => {},
  [index: string]: any;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface ArgsProps {
  content: React.ReactNode;
  duration: number | null;
  type: NoticeType;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
}

enum messageIcons {
  info = 'info-circle',
  success = 'check-circle',
  error = 'close-circle',
  warning = 'exclamation-circle',
  loading = 'loading',
}

const messageApi:any = {
  open: (args: ArgsProps):void => {
    const {content, duration, type, onClose} = args;
    const classes = classNames(`myantd-message-${type}`);
    messageInstance.add({
      content: (
        <span
          className={classes}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Icon type={messageIcons[type]} theme={type === 'loading' ? 'outlined' : 'filled'} />
          {content}
        </span>
      ),
      duration,
      onClose: onClose,
    });
  }
};

['info', 'success', 'error', 'warning', 'loading'].forEach(type => {
  messageApi[type] = (
    content: string,
    duration: number = 3,
    onClose: () => {},
  ) => {
    messageApi.open({content, duration, type: type as NoticeType , onClose})
  };
});


const message: messageProps = messageApi;
export default message;
