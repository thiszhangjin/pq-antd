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

export interface messageApi {
  open: (args: ArgsProps) => void;
  success: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  error: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  info: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  warning: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  loading: (content: jsonContent, duration?: number, onClose?: () => {}) => {};
  [index: string]: any;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export enum messageIcons {
  info = 'info-circle',
  success = 'check-circle',
  error = 'close-circle',
  warning = 'exclamation-circle',
  loading = 'loading',
}

const api: any = {
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
  api[type] = (
    content: jsonContent,
    duration: number = 3,
    onClose: () => {},
  ) => {
    if (typeof content === 'object') {
      api.open({ ...content, type });
    } else {
      api.open({ content, duration, type: type as NoticeType, onClose });
    }
  };
});

export default api as messageApi;
