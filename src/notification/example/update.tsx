import React from 'react';
import { Button, notification } from 'pq-antd';

function notificationExample() {
  notification.loading({
    message: '寒江孤影',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    key: 'updateNotification',
  });
  setTimeout(() => {
    notification.success({
      message: '江湖故人',
      description:
        'This is the content of the notification. This is the content of the notification.',
      key: 'updateNotification',
      duration: 3,
    });
  }, 1000);
}

export default () => (
  <div>
    <Button onClick={notificationExample}>更新消息内容</Button>
  </div>
);
