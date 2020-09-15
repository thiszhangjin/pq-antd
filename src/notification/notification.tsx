import React, { ReactNode } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import Notification, {
  NotificationProps,
  placementType,
} from './core/notification';

const prefixCls: string = 'pq-antd-notification';

export interface ArgsProps {
  message: string | React.ReactNode;
  description: string | React.ReactNode;
  duration?: number | null;
  type?: NoticeType;
  icon?: React.ReactNode;
  btn?: React.ReactNode;
  placement?: placementType;
  key?: string | number;
  onClose?: () => void;
}

export interface notificationApi {
  open: (args: ArgsProps) => void;
  success: (args: ArgsProps) => {};
  error: (args: ArgsProps) => {};
  info: (args: ArgsProps) => {};
  warning: (args: ArgsProps) => {};
  loading: (args: ArgsProps) => {};
  [index: string]: any;
}

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export enum notificationIcons {
  info = 'info-circle',
  success = 'check-circle',
  error = 'close-circle',
  warning = 'exclamation-circle',
  loading = 'loading',
}

function checkDuration(duration: any) {
  return typeof duration === 'number' && duration >= 0;
}

const NotificationInstances = new Map();
function getNotificationInstance(
  args: NotificationProps,
  callback: (instance: any) => void,
) {
  const { placement = 'topRight' } = args;
  if (NotificationInstances.get(placement)) {
    callback(NotificationInstances.get(placement));
  } else {
    Notification.newInstance(
      (instance: any) => {
        NotificationInstances.set(placement, instance);
        callback(instance);
      },
      {
        ...args,
        placement,
      },
    );
  }
}

const api: any = {
  open: (args: ArgsProps): void => {
    const {
      message,
      description,
      type,
      icon,
      btn,
      placement,
      key,
      onClose,
    } = args;
    let { duration } = args;
    if (!checkDuration(duration)) {
      duration = 4.5;
    }
    const classes = classNames(`${prefixCls}-${type}`);
    let iconNode = icon;
    if (type) {
      iconNode = <Icon type={notificationIcons[type]} />;
    }
    getNotificationInstance(
      {
        prefixCls,
        placement,
      },
      (instance: any): void => {
        instance.add({
          content: (
            <div
              className={classes}
              style={{ display: 'flex', width: '350px' }}
            >
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
    );
  },
};

['info', 'success', 'error', 'warning', 'loading'].forEach(type => {
  api[type] = (content: ArgsProps) => {
    api.open({ ...content, type });
  };
});

export default api as notificationApi;
