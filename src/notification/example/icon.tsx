import React from 'react';
import { Button, notification } from 'pq-antd';

function notificationExaple(type: string) {
  notification[type]({
    message: type,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
}

export default () => (
  <div>
    <Button onClick={() => notificationExaple('info')}>info</Button>
    <Button onClick={() => notificationExaple('error')}>error</Button>
    <Button onClick={() => notificationExaple('success')}>success</Button>
    <Button onClick={() => notificationExaple('warning')}>warning</Button>
    <Button onClick={() => notificationExaple('loading')}>loading</Button>
  </div>
);
