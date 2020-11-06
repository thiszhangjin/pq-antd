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
    prefixCls,
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

export type JsonContent = string | ArgsProps;

export interface MessageApi {
  open: (args: ArgsProps) => void;
  success: (content: JsonContent, duration?: number, onClose?: () => {}) => {};
  error: (content: JsonContent, duration?: number, onClose?: () => {}) => {};
  info: (content: JsonContent, duration?: number, onClose?: () => {}) => {};
  warning: (content: JsonContent, duration?: number, onClose?: () => {}) => {};
  loading: (content: JsonContent, duration?: number, onClose?: () => {}) => {};
  [index: string]: any;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export enum MessageIcons {
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
          type={MessageIcons[type]}
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
      onClose,
    });
  },
};

['info', 'success', 'error', 'warning', 'loading'].forEach(type => {
  api[type] = (
    content: JsonContent,
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

export default api as MessageApi;
