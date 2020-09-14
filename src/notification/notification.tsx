import React, { ReactNode } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import Notification from './core/notification';

const prefixCls: string = 'pq-antd-notification';

let notificationInstance: any = null;
Notification.newInstance(
  (instance: any) => {
    notificationInstance = instance;
  },
  {
    prefixCls: prefixCls,
  },
);

export interface ArgsProps {
  message: string | React.ReactNode;
  description: string | React.ReactNode;
  duration?: number | null;
  type?: NoticeType;
  icon?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string | number;
  onClose?: () => void;
}

export interface notificationProps {
  open: (args: ArgsProps) => void;
  success: (args: ArgsProps) => {};
  error: (args: ArgsProps) => {};
  info: (args: ArgsProps) => {};
  warning: (args: ArgsProps) => {};
  loading: (args: ArgsProps) => {};
  [index: string]: any;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

enum notificationIcons {
  info = 'info-circle',
  success = 'check-circle',
  error = 'close-circle',
  warning = 'exclamation-circle',
  loading = 'loading',
}

function checkDuration(duration: any) {
  return typeof duration === 'number' && duration >= 0;
}

const notificationApi: any = {
  open: (args: ArgsProps): void => {
    const { message, description, type, icon, btn, key, onClose } = args;
    let { duration } = args;
    if (!checkDuration(duration)) {
      duration = 4.5;
    }
    const classes = classNames(`${prefixCls}-${type}`);
    let iconNode = icon;
    if (type) {
      iconNode = <Icon type={notificationIcons[type]} />;
    }
    notificationInstance.add({
      content: (
        <div className={classes} style={{ display: 'flex', width: '350px' }}>
          {iconNode}
          <div>
            <div className={`${prefixCls}-notice-message`}>{message}</div>
            <div className={`${prefixCls}-notice-description`}>
              {description}
            </div>
            <div className={`${prefixCls}-notice-btn`}>{btn}</div>
          </div>
        </div>
      ),
      duration,
      key,
      closable: true,
      onClose: onClose,
    });
  },
};

['info', 'success', 'error', 'warning', 'loading'].forEach(type => {
  notificationApi[type] = (content: ArgsProps) => {
    notificationApi.open({ ...content, type });
  };
});

const notification: notificationProps = notificationApi;
export default notification;
