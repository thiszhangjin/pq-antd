import React, { ReactNode } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import Notification from './core/Notification';

let messageInstance: any = null;
Notification.newInstance((instance: any) => {
  messageInstance = instance;
});

// type types = "success" | "error" | "info" | "warning" | "loading"
interface messageType {
  type: string;
  icon: string;
}

const messageTypes: messageType[] = [
  {
    type: 'success',
    icon: 'check-circle',
  },
  {
    type: 'error',
    icon: 'close-circle',
  },
  {
    type: 'info',
    icon: 'info-circle',
  },
  {
    type: 'warning',
    icon: 'exclamation-circle',
  },
  {
    type: 'loading',
    icon: 'loading',
  },
];

const message: any = {};

messageTypes.forEach(item => {
  message[item.type] = (
    content: string,
    duration: number = 3,
    onClose: () => {},
  ) => {
    const classes = classNames(`myantd-message-${item.type}`);
    messageInstance.add({
      content: (
        <span
          className={classes}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Icon type={item.icon} theme="filled" />
          {content}
        </span>
      ),
      duration,
      onClose: onClose,
    });
  };
});

console.log(message);

export default message;
