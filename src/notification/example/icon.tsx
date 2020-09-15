import React from 'react';
import { Button, notification } from 'pq-antd';

function notificationExample(type: string) {
  notification[type]({
    message: type,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
}

export default () => (
  <div>
    <Button onClick={() => notificationExample('info')}>info</Button>
    <Button onClick={() => notificationExample('error')}>error</Button>
    <Button onClick={() => notificationExample('success')}>success</Button>
    <Button onClick={() => notificationExample('warning')}>warning</Button>
    <Button onClick={() => notificationExample('loading')}>loading</Button>
  </div>
);
