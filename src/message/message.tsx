import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import Notification from '../notification/core/notification';

const prefixCls: string = 'pq-antd-message';

let messageInstance: any = null;
Notification.newInstance(
  (instance: any) => {
    messageInstance = instance;
  },
  {
    prefixCls: prefixCls,
  },
);

export interface ArgsProps {
  content: React.ReactNode;
  duration?: number | null;
  type?: NoticeType;
  icon?: React.ReactNode;
  key?: string | number;
  onClose?: () => void;
}

export type jsonContent = string | ArgsProps;

export interface messageProps {
  open: (args: ArgsProps) => void;
  success: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  error: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  info: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  warning: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  loading: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  [index: string]: any;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

enum messageIcons {
  info = 'info-circle',
  success = 'check-circle',
  error = 'close-circle',
  warning = 'exclamation-circle',
  loading = 'loading',
}

const messageApi: any = {
  open: (args: ArgsProps): void => {
    const { content, duration, type, icon, key, onClose } = args;
    const classes = classNames(`${prefixCls}-${type}`);
    let iconNode = icon;
    if (type) {
      iconNode = (
        <Icon
          type={messageIcons[type]}
          theme={type === 'loading' ? 'outlined' : 'filled'}
        />
      );
    }
    messageInstance.add({
      content: (
        <div
          className={classes}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {iconNode}
          {content}
        </div>
      ),
      duration,
      key,
      onClose: onClose,
    });
  },
};

['info', 'success', 'error', 'warning', 'loading'].forEach(type => {
  messageApi[type] = (
    content: jsonContent,
    duration: number = 3,
    onClose: () => {},
  ) => {
    if (typeof content === 'object') {
      messageApi.open({ ...content, type });
    } else {
      messageApi.open({ content, duration, type: type as NoticeType, onClose });
    }
  };
});

const message: messageProps = messageApi;
export default message;
